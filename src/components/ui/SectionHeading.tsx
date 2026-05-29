export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <span className="mb-4 inline-flex items-center rounded-full border border-amber-300/80 bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-800 shadow-sm dark:border-green-800/50 dark:bg-green-950/50 dark:text-amber-300">
        {title}
      </span>
      {subtitle && (
        <p className="max-w-2xl text-base text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
