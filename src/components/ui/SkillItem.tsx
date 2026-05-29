import type { Skill } from "@/types";

export function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="group flex flex-col items-center gap-2 rounded-xl bg-white/60 p-4 shadow-sm ring-1 ring-amber-100/80 transition-all hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md hover:shadow-amber-200/50 dark:bg-gray-900/40 dark:ring-gray-800/50 dark:hover:bg-green-950/30 dark:hover:shadow-green-900/20">
      <skill.icon className="h-10 w-10 text-gray-500 transition-colors group-hover:text-amber-600 dark:text-gray-400 dark:group-hover:text-amber-400" />
      <span className="text-center text-xs font-medium text-gray-600 transition-colors group-hover:text-amber-800 dark:text-gray-400 dark:group-hover:text-amber-300">
        {skill.name}
      </span>
    </div>
  );
}
