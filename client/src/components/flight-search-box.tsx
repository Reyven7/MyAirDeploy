import {
  Building2Icon,
  CheckIcon,
  ChevronsUpDownIcon,
  MapPin,
  PlaneIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import type { Location } from "@/types/amadeus.type";
import { useGetLocationsQuery } from "@/app/api/amadeusApi";

interface FlightSearchBoxProps {
  value: { name: string; iataCode: string } | null;
  onChange: (value: { name: string; iataCode: string } | null) => void;
}

export function FlightSearchBox({ value, onChange }: FlightSearchBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput] = useDebounce(inputValue, 100);
  const { data } = useGetLocationsQuery(
    { keyword: debouncedInput },
    {
      skip: !debouncedInput,
    }
  );

  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setSuggestions(data.data);
    } else {
      setSuggestions([]);
    }
  }, [data]);

  useEffect(() => {
    if (open) {
      setInputValue(value?.name ?? "");
    }
  }, [open, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex gap-2 items-center">
            <MapPin className="h-4 w-4 text-gray-400" />
            {value?.name || "Departure city or airport..."}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder="Search city or airport..."
            value={inputValue}
            onValueChange={(text) => {
              setInputValue(text);
              if (!open) setOpen(true);
            }}
          />
          <CommandList>
            {suggestions.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {suggestions.map((item, index) => {
                const isSelected = value?.iataCode === item.iataCode;
                const isCity = item.subType === "CITY";

                return (
                  <CommandItem
                    key={index}
                    value={item.name}
                    onSelect={() => {
                      onChange(isSelected ? null : item);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-start gap-3",
                      isSelected && "bg-muted rounded-sm"
                    )}
                  >
                    {/* Left icon */}
                    <div className="mt-0.5 text-muted-foreground">
                      {isCity ? (
                        <Building2Icon className="h-4 w-4" />
                      ) : (
                        <PlaneIcon className="h-4 w-4" />
                      )}
                    </div>

                    {/* Text info */}
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {item.name} ({item.iataCode})
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.address.countryName} · {item.subType}
                      </span>
                    </div>

                    {/* Right checkmark */}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 text-primary",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
