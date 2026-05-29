---
title: "What double-entry actually means in production code"
excerpt: "A tour of how a balance ledger actually works in production — accounts, postings, end-of-day routines, and why the books stay trustworthy."
coverImage: "/images/blog/accounting.jpg"
author: "Khurli Jumamuratova"
publishedAt: "2026-05-17"
tags: ["Banking", "Backend", "Go", "Postgres"]
readingTime: "12 min read"
---
# Building a balance ledger — the version I wish someone had told me over tea

Most developers meet accounting the way most people meet calculus: as a fog of vocabulary that hides a small, beautiful idea. After a year of working inside a real core banking system, I want to write down that idea the way I wish someone had explained it to me — not as accounting theory, but as the shape it takes when it becomes Go structs and Postgres tables that have to hold up under audit.

## What a ledger is, before we touch any code

A ledger is a notebook. It is a notebook where the bank writes down every single change in money that happens, in order, with timestamps. The notebook does not store "Alice has $100." It stores "on Tuesday we added $50, on Wednesday we added another $50." The current balance is just what you get when you add up all the entries. The current balance is never a fact the bank stores and trusts. It is always a derived thing.

This sounds wasteful, and the first time I heard about it I wondered why we do not just keep one number per customer and update it. The answer is: because a bank cannot afford to forget how it got somewhere. If a regulator shows up next March and asks why some account had a certain balance last June, "we computed it" is not an answer anyone accepts. You need the trail. So the trail is the source of truth, and the balance is the summary.

The second thing that took me a while to internalize is that customers do not have *an* account. They have *many* accounts. A loan customer might have a separate account for principal owed, another for accrued interest, another for any penalties that have built up, another for fees, and more. Each of those accounts is its own little bucket that only knows how to track one specific kind of money. Their "total balance" is a view that is assembled on demand, not something stored anywhere.

## The pair-of-numbers trick

Here is the part that confused me longest. Every change in money is recorded as two numbers, not one. If you move $100 from one place to another, the system writes down "$100 out of account A" and "$100 into account B." Always both. Never just one.

This is called double-entry, and the entire reason for it is that a pair of numbers that must match cannot lie silently. If you write down only "$100 came in," you have no way to verify it. If you write down "$100 left X, $100 entered Y," you can sum every left-side and every right-side across the entire bank and they must be equal. The day they are not equal is the day you know something is wrong, and you know exactly which account to start looking at.

The naming around this is genuinely terrible. The two sides are called debit and credit. In normal English, "credit" sounds like money coming in and "debit" sounds like money going out, which is what most people's bank cards have taught them. In accounting, these words do not mean that. They are just labels for the left side and the right side of a posting, and whether they actually *increase* or *decrease* an account's balance depends on what kind of account it is.

An asset account — say, the account that tracks "money the bank has lent out and is owed" — goes *up* when you debit it. A liability account — say, "money a customer has deposited and the bank owes back to them" — goes *up* when you credit it. They are mirror images, because one party's asset is another party's liability. The same $100 in one place is a debit and in another is a credit.

There is one more wrinkle. Some accounts exist purely to offset other accounts. A loan-loss reserve, for example, is technically grouped with assets, but its whole job is to *reduce* the apparent value of the loans it sits next to. So it behaves backwards from a normal asset. These are called "contra" accounts, and once you have them, you have basically the full vocabulary.

In the codebase I work in, the account types are spelled out about as plainly as you could ask for:

```go
const (
    Active         AccountType = "active"
    Passive        AccountType = "passive"
    ActivePassive  AccountType = "active-passive"
    CounterActive  AccountType = "counter-active"
    CounterPassive AccountType = "counter-passive"
)
```

"Active" and "passive" are the older European names for "asset" and "liability." Same idea. And the whole "does this side increase or decrease the balance" question, lives in roughly this shape of function — about ten lines:

```go
switch accountType {
case Active:
    if op == Credit { return amount.Neg() }   // credit shrinks an asset
case Passive, ActivePassive:
    if op == Debit  { return amount.Neg() }   // debit shrinks a liability
}
return amount   // everything else: increase
```

That is the entire mystery. Once you have written it, you wrap it in a method, and from then on the rest of the system just calls that method without thinking about signs.

## The objects you keep meeting

When you start reading code in a banking system, you keep bumping into three things, and once you can name them you can read just about anything.

There is the account, which is a row in the database. It has a chart-of-accounts code (a string that the bank's accountants assigned, something like `"12401"`, that names what kind of money this account tracks), a name, the running balance, the account type, and pointers to whoever it belongs to — a contract, a client, a branch, a currency. There can be hundreds of thousands of these. One customer's loan generates several.

There is the transaction, which is a parent record representing one logical thing that happened in the business. Something like "we ran the day-close routine for loan number 42, and as a result, these things needed to be recorded." The transaction does not hold any amounts itself. It is more like a folder.

And then there are the postings underneath that folder, which are where the real work lives. Each posting has a debit account id, a credit account id, a single amount that applies to both of them, and the date. Crucially, both sides live on the same row. You cannot construct a half-posting because there is nowhere to put one. In schema sketch form, it looks roughly like this:

```go
type Operation struct {
    Id                     uuid.UUID
    TransactionId          uuid.UUID
    DebitBalanceAccountId  uuid.UUID
    CreditBalanceAccountId uuid.UUID
    Amount                 decimal.Decimal
    DebitBalanceAfter      decimal.Decimal
    CreditBalanceAfter     decimal.Decimal
    OpenDate               time.Time
}
```

Notice that the amount field appears only once. The same number is applied to both sides — that is what double-entry actually means in terms of bytes on disk. And notice the "balance after" fields on both sides. The system also records what the resulting balance on each account was, right after the posting. You could always recompute that by summing all the operations that came before it, but if you store it, then historical queries get cheap and auditors stop waiting.

The other thing worth saying out loud: never use floats for money. Use a fixed-precision decimal type. This is the kind of mistake that does not show up the first week or the first month, but somewhere around month nine you discover that your nightly aggregates are off by a few cents and you cannot figure out where the cents are going. They are going into floating-point rounding. Use decimals.

## How rules become postings

Nobody writes postings by hand. A real bank has too many contracts, too many products, too many compliance rules, for any of that to be human-driven. So there is always a template system somewhere in the codebase, and once you understand the shape of it, half the system becomes legible.

A template is a recipe. There is a top-level transaction template that says "here is what happens during day-close for an individual loan," and underneath it there are operation templates, each of which is one rule that says "debit this category of account, credit this other category, for an amount computed by this named formula, but only if these conditions are true." Templates do not refer to specific accounts. They refer to logical groups — "the principal-receivable group" or "the accrued-interest group" — and the system resolves those to the actual per-contract accounts at the moment the posting is generated. That indirection is the trick that lets the same rule fire across every customer in the bank.

The conditions matter as much as the formulas. A penalty rule should not fire if nothing is overdue. An interest-accrual rule should not fire on a paid-off loan. So each rule carries a list of conditions that get evaluated against the contract's current state — its repayment schedule, its installment statuses, the number of days past due. All conditions have to pass for the rule to mint a posting. This is the lever the compliance team uses to change behavior without filing a code change. A new regulation about when penalty interest kicks in becomes a row edit, not a deploy.

I will not go too deep into the specific formula names this codebase uses, because they are mildly proprietary and honestly the names are not the interesting part. The interesting part is the shape: a small, declarative language for "when should we post, what should we post against, and how much." Everything domain-specific gets pushed out of code and into database rows where business analysts can edit it.

## The day-close routine, which is where it all comes together

If there is one piece of any banking system worth understanding deeply, it is the day-close routine. In retail banking, the day is the unit of accounting. Until the operational day is officially closed, nothing about it is final. Interest has not been accrued. Overdue installments have not been promoted. The regulator has not been told. The branches cannot open tomorrow morning until today is shut.

The day-close routine in this system runs as a long workflow, and the first thing it does is refuse to start if the books are not clean. If there are transactions still sitting in "pending" status, the routine produces a report listing them and waits. If contracts are missing repayment schedules, same thing. It writes a file, marks the day's close as retryable, and waits for a human operator to fix things and signal a retry. I think this is the most important thing the routine does, honestly. A worse design would barrel through and accept partial work. This one refuses. Either you start from clean books or you do not start.

Once the routine clears its pre-flight checks, it enters the calculation phase. For every active contract, it walks the templates in their declared order, evaluates the conditions, runs the formulas, and produces postings. But — and this is the clever part — it does not write any of them to the database yet. Everything stays in memory in a shared object that holds tentative balances. Why? Because postings on one contract can affect bank-wide accounts that other contracts also touch. There might be a single "accrued interest income" account that thousands of loans all credit on the same day. If each loan wrote to the database independently, you would either have lock contention or have to invent reservation gymnastics. By keeping the running totals in memory and writing once at the very end, the routine sidesteps the whole class of problem.

That in-memory state is also periodically dumped to an external cache, because the calculation can take a long time on a large bank, and you do not want a server crash partway through to mean restarting from scratch. The cache is essentially the workflow's external memory.

When the calculation is done, the commit happens in one database transaction. New accounts get inserted, the day's transactions and postings get inserted, every affected account's balance gets updated in a single bulk statement, overdue installments get promoted, and any regulatory audit records get written. Either all of this commits or none of it does. There is no state in which half the day exists in the books. That atomicity is the property that makes the system trustworthy: every published balance is the consequence of a fully-applied, atomically-committed day.

## Snapshots so you do not die reading old data

After the day commits, the routine writes one more thing: a per-account daily summary row. It contains the opening balance the account had at the start of the day, the total of debits during the day, the total of credits, and the computed closing balance. This snapshot is what makes historical queries fast. Without it, every question about what an account looked like last Tuesday would require replaying every operation that has ever touched it. With it, the answer is one row.

The closing balance formula has to respect the active-versus-passive thing, of course, because that inversion follows you everywhere. In sketch form:

```go
func computeClosingBalance(t AccountType, opening, debit, credit decimal.Decimal) decimal.Decimal {
    switch t {
    case Passive, ActivePassive, CounterActive:
        return opening.Sub(debit).Add(credit)
    default:
        return opening.Add(debit).Sub(credit)
    }
}
```

Assets close with opening plus debits minus credits. Liabilities and contra-assets close with the signs swapped. Same nine lines as the per-posting sign function, just applied to a whole day's totals.

## Telling the regulator

Most jurisdictions require banks to ship daily reports to a credit information bureau detailing every loan account — what it is, what its balance is, what postings touched it today, what its status is. The format is dictated by the regulator and tends to be unloved JSON with cryptic field names that you do not get to argue with.

The design question for an engineer is: when do you build the report? The clean answer, and the one that holds up in practice, is to build it during the day-close routine, while the data is already in memory and easy to walk over. You assemble the report, you cache it, you send it, and you store the request and response verbatim in an audit table. If the regulator's API has a bad day — and it always does, eventually — the failure does not block the day from closing. The books are correct whether the regulator has heard about them yet or not. You mark the dispatch as having failures and let an operator retry from an admin screen later.

The audit table is one of those things that does not seem worth the disk space until it is. A year from now, when somebody asks what exactly you sent the regulator on a specific date for a specific loan, the answer is one query. Store the raw bytes. Future you will thank you.

## The honest part: what gets enforced, what does not

A good way to read any banking system is to ask: what does the code structurally make impossible, and what does it only ask politely to be true?

Structurally, you cannot make a half-posting in this design, because both sides live on the same row and share one amount field. You cannot have unequal debit and credit magnitudes for the same operation, for the same reason. The sign convention for active versus passive lives in one place and is hard to get wrong. The commit is atomic. The day refuses to close on a dirty starting state. These are guarantees the code enforces without anyone having to remember them, and they are the ones that matter most.

What the code does not strictly enforce, and what banks usually catch with separate jobs, is the global invariant that the sum of all debits in the world equals the sum of all credits. It should hold by construction, because every posting pairs them. But databases are large and humans are creative, and a mature system tends to grow a scheduled trial-balance verifier that walks the whole ledger and complains loudly if the books drift. Similarly, the template system does not strictly stop a misconfigured rule from debiting the wrong category of account. The logical-group abstraction reduces the chance, but it does not eliminate it. And if templates can be edited through an admin UI, there is a versioning question lurking — historically posted entries should remain attributable to the template version that produced them, so that a later edit does not retroactively change the meaning of old records.

These are the gaps that distinguish a young ledger from a mature one. The encouraging part is that they are additions, not redesigns. The structural core — small, single-purpose accounts, paired postings on a single row, atomic daily commits, snapshotted daily balances — has to be right from the start. Once it is right, you do not have to change it. You just keep growing supporting systems around it.

## One sentence to take with you

A balance ledger is just a long sequence of paired postings, each one debiting some account and crediting another by the same amount, and everything else in the system exists either to generate those pairs correctly from business rules, to apply them atomically so the books are never caught half-updated, or to tell the right people what happened in a form they can trust.

The day that sentence stops feeling abstract and starts feeling obvious is the day banking code stops feeling intimidating. After that, it is just bookkeeping with extra steps.