import type { LucideIcon } from "lucide-react";

export function SaveItemCapsule({
  icon: Icon,
  description,
}: {
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="border border-2 rounded-full flex items-center justify-center gap-2 px-4 py-2">
      <div className="flex">
        <Icon className="text-primary w-4 h-4" />
      </div>
      <div>{description}</div>
    </div>
  );
}
