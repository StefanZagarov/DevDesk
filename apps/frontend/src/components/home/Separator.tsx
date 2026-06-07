import { cn } from "@/lib/utils";

export function Separator({ className }) {
  return <div className={cn("border-b-2 w-full", className)}></div>;
}
