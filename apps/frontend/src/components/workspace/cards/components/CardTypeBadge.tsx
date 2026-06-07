import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Braces, FileText, Link, Notebook } from "lucide-react";

const cardType = {
  note: {
    colors: "bg-yellow-400/10 text-yellow-700 dark:text-yellow-400",
    icon: <Notebook />,
  },
  snippet: {
    colors: "bg-green-400/10 text-green-400 dark:text-green-400",
    icon: <Braces />,
  },
  link: {
    colors: "bg-blue-400/10 text-blue-700 dark:text-blue-400",
    icon: <Link />,
  },
  pdf: {
    colors: "bg-red-400/10 text-red-700 dark:text-red-400",
    icon: <FileText />,
  },
};

export function CardTypeBadge({ type }: { type: keyof typeof cardType }) {
  return (
    <Badge className={cn("[&>svg]:size-4! w-8 h-8 p-1", cardType[type].colors)}>
      {cardType[type].icon}
    </Badge>
  );
}
