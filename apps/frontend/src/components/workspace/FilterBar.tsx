import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

const types = ["note", "snippet", "url", "pdf"] as const;

export function FilterBar() {
  return (
    <div className="ml-4 flex items-center gap-2">
      <Badge variant="outline"> + filter </Badge>
      <p className="text-muted-foreground text-xs">32 results</p>
    </div>
  );
}
