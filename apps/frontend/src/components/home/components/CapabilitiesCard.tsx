import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function CapabilitiesCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <Card className="w-80 h-60 text-left p-6 gap-4">
        <CardHeader className="p-0">
          <div className="flex items-center justify-center bg-primary/20 w-10 h-10 rounded-lg">
            {<Icon className="text-primary" />}
          </div>
        </CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      <CardContent className="text-left p-0">{body}</CardContent>
    </Card>
  );
}
