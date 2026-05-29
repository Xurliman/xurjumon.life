import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

export function SocialLinks({
  className,
  iconSize = 20,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all hover:-translate-y-0.5 hover:text-amber-700 dark:text-gray-400 dark:hover:text-amber-400"
          aria-label={social.name}
        >
          <social.icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
