import { Badge } from "@/components/ui/badge";

// TODO: Pills will inherit the color of the typed tag, if that tag exists and has assigned color by the user
export function TagPill({ text }) {
  return (
    <Badge variant="secondary" className="rounded-full">
      {text}
    </Badge>
  );
}
