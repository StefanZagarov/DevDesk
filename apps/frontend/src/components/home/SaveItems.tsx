import { Code, FileText, Link } from "lucide-react";
import { SaveItemCapsule } from "./components/SaveItemCapsule";

export function SaveItems() {
  return (
    <div className="flex self-start items-center gap-4 ml-8">
      <p className="text-border text-lg">What you can save</p>
      <SaveItemCapsule icon={Link} description={"Links with preview"} />
      <SaveItemCapsule icon={Code} description={"Code snippets"} />
      <SaveItemCapsule icon={FileText} description={"Markdown notes"} />
    </div>
  );
}
