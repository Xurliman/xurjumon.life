import type { Locale } from "@/i18n/config";

function Base({
  title,
  children,
  size = 18,
}: {
  title: string;
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      width={size}
      height={(size * 20) / 30}
      role="img"
      aria-label={title}
      className="overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

function FlagEn({ size }: { size?: number }) {
  return (
    <Base title="United Kingdom" size={size}>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
      <path
        d="M0,0 L30,20 M30,0 L0,20"
        stroke="#C8102E"
        strokeWidth="2"
        clipPath="inset(0)"
      />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="5" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3" />
    </Base>
  );
}

function FlagUz({ size }: { size?: number }) {
  return (
    <Base title="Uzbekistan" size={size}>
      <rect width="30" height="20" fill="#1EB53A" />
      <rect width="30" height="13.33" fill="#fff" />
      <rect width="30" height="6.67" fill="#0099B5" />
      <rect y="6.4" width="30" height="0.4" fill="#CE1126" />
      <rect y="13.2" width="30" height="0.4" fill="#CE1126" />
    </Base>
  );
}

function FlagRu({ size }: { size?: number }) {
  return (
    <Base title="Russia" size={size}>
      <rect width="30" height="20" fill="#fff" />
      <rect y="6.67" width="30" height="6.66" fill="#0039A6" />
      <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
    </Base>
  );
}

function FlagKaa({ size }: { size?: number }) {
  return (
    <Base title="Karakalpakstan" size={size}>
      <rect width="30" height="20" fill="#0072CE" />
      <rect y="6.67" width="30" height="6.66" fill="#FFD700" />
      <rect y="13.33" width="30" height="6.67" fill="#1EB53A" />
      <rect y="6.27" width="30" height="0.4" fill="#fff" />
      <rect y="13.13" width="30" height="0.4" fill="#fff" />
    </Base>
  );
}

const flags: Record<Locale, React.FC<{ size?: number }>> = {
  en: FlagEn,
  uz: FlagUz,
  ru: FlagRu,
  kaa: FlagKaa,
};

export function Flag({ locale, size }: { locale: Locale; size?: number }) {
  const Component = flags[locale];
  return <Component size={size} />;
}
