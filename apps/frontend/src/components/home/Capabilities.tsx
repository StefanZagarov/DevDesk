import { Bookmark, Search, Tag } from "lucide-react";
import { CapabilitiesCard } from "./components/CapabilitiesCard";

export function Capabilities() {
  return (
    <>
      <p className="self-start text-border -mb-8 ml-8">WHAT IT DOES</p>
      <div className="flex gap-8">
        <CapabilitiesCard
          icon={Bookmark}
          title={"Capture anything"}
          body={
            "Links with OG preview, markdown notes, and code snippets. Three types, one place, zero friction."
          }
        />
        <CapabilitiesCard
          icon={Tag}
          title={"Tag once, filter forever"}
          body={
            "Filter by tag, type, workspace, or date — in any combination. Filter state lives in the URL, so views are shareable."
          }
        />
        <CapabilitiesCard
          icon={Search}
          title={"Discovery panel"}
          body={
            'A right-side panel that surfaces items related to your current view, scored by shared-tag overlap. This is the "find what you forgot" feature.'
          }
        />
      </div>
    </>
  );
}
