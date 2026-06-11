import { Connector } from "./components/Connector";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Fragment, useEffect, useState } from "react";
import { X } from "lucide-react";

const types = ["note", "snippet", "url", "pdf"] as const;

// WARN: addFilter and removeFilter add twice to the connectors array because of the StrictMode, NEXT: IMPORVE THEIR LOGIC TO WORK IN STRICT MODE
// TODO: Continue by thinking and implementing filter popup style and how to add from type, tag and text (input field for title, description and/or content search, its chip may show as "title: React" or if multiple: "title/description/content: "React")
export function FilterBar() {
  const tags = [
    "React",
    "TypeScript",
    "React Hooks",
    "MHEEEEEEP",
    "How To Code",
    "Programming",
    "Tutorial",
    "How To",
    "For Later",
    "Testing",
  ];
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [connectors, setConnectors] = useState<("AND" | "OR")[]>([]);

  function onSelect(value: string) {
    setFilterOpen(false);
    addFilter(value);
  }

  function setOpen() {
    setFilterOpen((filterOpen) => !filterOpen);
  }

  function addFilter(newValue: string) {
    setFilters((oldFilters) => {
      // a new filter adds a new gap (except for the very first filter)
      if (oldFilters.length >= 1) {
        setConnectors((prev) => [...prev, "AND"]);
      }
      return [...oldFilters, newValue];
    });
  }

  function removeFilter(value: string) {
    setFilters((oldFilters) => {
      const valueIndex = oldFilters.findIndex((filter) => filter === value);
      if (valueIndex === -1) return oldFilters;

      // drop the connector belonging to the removed filter's gap
      setConnectors((prev) => {
        if (prev.length === 0) return prev;
        const gap =
          valueIndex === oldFilters.length - 1 ? valueIndex - 1 : valueIndex;
        const nextConnectors = [...prev];
        nextConnectors.splice(gap, 1);
        return nextConnectors;
      });

      const next = [...oldFilters];
      next.splice(valueIndex, 1);
      return next;
    });
  }

  function toggleConnector(index: number) {
    setConnectors((prev) =>
      prev.map((mode, i) =>
        i === index ? (mode === "AND" ? "OR" : "AND") : mode,
      ),
    );
  }

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    console.log(connectors);
  }, [connectors]);

  return (
    <div className="ml-4 flex items-center gap-2">
      {filters.map((filter, i) => (
        <Fragment key={`${filter}-${i}`}>
          <Badge className="cursor-default select-none">
            {filter}
            <button type="button" onClick={() => removeFilter(filter)}>
              <X className="size-3 cursor-pointer hover:text-destructive" />
            </button>
          </Badge>
          {i < filters.length - 1 && (
            <Connector
              mode={connectors[i] ?? "AND"}
              onToggle={() => toggleConnector(i)}
            />
          )}
        </Fragment>
      ))}
      <Popover open={filterOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary">
            + filter
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="gap-4 w-65">
          <PopoverHeader>
            <PopoverTitle>Card type</PopoverTitle>
          </PopoverHeader>
          <PopoverDescription className="flex gap-4 self-center">
            {types.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="cursor-pointer hover:bg-primary"
                onClick={() => onSelect(type)}
              >
                {type}
              </Badge>
            ))}
          </PopoverDescription>
          <Separator className="w-3/4! self-center" />
          <PopoverHeader>
            <PopoverTitle>Tags</PopoverTitle>
          </PopoverHeader>
          <PopoverDescription className="flex gap-2 flex-wrap">
            <Combobox items={tags}>
              <ComboboxInput placeholder="Search tag..." className="mb-2" />
              <ComboboxContent>
                <ComboboxEmpty className="mt-1 mb-1">
                  No tags found
                </ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <p className="text-xs">Recent:</p>
            {tags.slice(0, 5).map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </PopoverDescription>
          <Separator className="w-3/4! self-center" />
          <PopoverHeader>
            <PopoverTitle>Search text</PopoverTitle>
            <Input
              placeholder="Title|Description|Content"
              className="mt-2 mb-1"
            />
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      <p className="text-muted-foreground text-xs">32 results</p>
    </div>
  );
}
