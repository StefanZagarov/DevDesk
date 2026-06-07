import { NoteCard } from "./cards/NoteCard";
import { FilterBar } from "./FilterBar";

export function CardsPanel() {
  return (
    <div className="mt-4">
      <FilterBar />
      <div className="p-4">
        <NoteCard />
      </div>
    </div>
  );
}
