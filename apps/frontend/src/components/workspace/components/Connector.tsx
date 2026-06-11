import { AmpersandIcon, SlashIcon } from "lucide-react";

export function Connector({
  mode,
  onToggle,
}: {
  mode: "AND" | "OR";
  onToggle: () => void;
}) {
  return (
    <button onClick={onToggle}>
      {mode === "AND" ? (
        <AmpersandIcon className="size-4 cursor-pointer hover:text-primary" />
      ) : (
        <SlashIcon className="size-4 cursor-pointer hover:text-primary" />
      )}
    </button>
  );
}
