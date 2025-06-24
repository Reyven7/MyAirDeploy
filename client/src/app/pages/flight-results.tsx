import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useGetFlightOffersQuery } from "@/app/api/flightApi";
import { FlightSearchForm } from "@/components/forms/flight-search-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FlightCard } from "@/components/flight-card";
import { SortBox } from "@/components/sort-box";

const FlightResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const queryParams = useMemo(() => {
    const adults = Number(searchParams.get("adults") || "1");
    const children = searchParams.get("children");
    const returnDate = searchParams.get("returnDate");

    return {
      originLocationCode: searchParams.get("origin") || "",
      destinationLocationCode: searchParams.get("destination") || "",
      departureDate: searchParams.get("departureDate") || "",
      returnDate: returnDate || undefined,
      adults,
      infants: searchParams.get("infants")
        ? Number(searchParams.get("infants"))
        : undefined,
      children: children ? Number(children) : undefined,
      travelClass:
        (searchParams.get("travelClass")?.toUpperCase() as
          | "ECONOMY"
          | "PREMIUM_ECONOMY"
          | "BUSINESS"
          | "FIRST") || "ECONOMY",
    };
  }, [location.search]);

  const { data, error, isFetching } = useGetFlightOffersQuery(queryParams, {
    skip:
      !queryParams.originLocationCode || !queryParams.destinationLocationCode,
  });

  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [durationRange, setDurationRange] = useState([0, 36]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price");

  const flights = data?.data || [];

  const handleCheckboxChange = (
    id: string,
    _selectedList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const parseDuration = (durationStr?: string) => {
    if (!durationStr) return Infinity;
    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match?.[1] ? parseInt(match[1], 10) : 0;
    const minutes = match?.[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
  };

  const filteredFlights = flights.filter((flight) => {
    const segment = flight.itineraries[0]?.segments[0];

    const departureHour = new Date(segment?.departure.at).getHours();
    const duration = parseDuration(flight.itineraries[0]?.duration);
    const price = Number(flight.price.total);

    if (
      price < priceRange[0] ||
      price > priceRange[1] ||
      duration / 60 < durationRange[0] ||
      duration / 60 > durationRange[1]
    ) {
      return false;
    }

    if (selectedStops.length > 0) {
      const stops = flight.itineraries[0]?.segments.length - 1;
      if (
        (selectedStops.includes("direct") && stops !== 0) ||
        (selectedStops.includes("1-stop") && stops !== 1) ||
        (selectedStops.includes("2-stops") && stops < 2)
      ) {
        return false;
      }
    }

    if (
      selectedAirlines.length > 0 &&
      !selectedAirlines.some((code) =>
        flight.validatingAirlineCodes.includes(code)
      )
    ) {
      return false;
    }

    if (selectedTimes.length > 0) {
      const hour = departureHour;
      const match = selectedTimes.some((time) => {
        switch (time) {
          case "early-morning":
            return hour >= 0 && hour < 6;
          case "morning":
            return hour >= 6 && hour < 12;
          case "afternoon":
            return hour >= 12 && hour < 18;
          case "evening":
            return hour >= 18 && hour <= 23;
          default:
            return false;
        }
      });
      if (!match) return false;
    }

    return true;
  });

  const sortedFlights = useMemo(() => {
    const sorted = [...filteredFlights];
    switch (sortBy) {
      case "price":
        return sorted.sort(
          (a, b) => Number(a.price.total) - Number(b.price.total)
        );
      case "duration":
        return sorted.sort((a, b) => {
          const durA = parseDuration(a.itineraries[0]?.duration);
          const durB = parseDuration(b.itineraries[0]?.duration);
          return durA - durB;
        });
      case "departure":
        return sorted.sort((a, b) => {
          const timeA = new Date(
            a.itineraries[0]?.segments[0]?.departure.at
          ).getTime();
          const timeB = new Date(
            b.itineraries[0]?.segments[0]?.departure.at
          ).getTime();
          return timeA - timeB;
        });
      case "arrival":
        return sorted.sort((a, b) => {
          const lastSegA = a.itineraries[0]?.segments.slice(-1)[0];
          const lastSegB = b.itineraries[0]?.segments.slice(-1)[0];
          const timeA = new Date(lastSegA?.arrival.at).getTime();
          const timeB = new Date(lastSegB?.arrival.at).getTime();
          return timeA - timeB;
        });
      default:
        return sorted;
    }
  }, [filteredFlights, sortBy]);

  const sortOptions = [
    { value: "price", label: "Price (lowest first)" },
    { value: "duration", label: "Duration (shortest first)" },
    { value: "departure", label: "Departure (earliest first)" },
    { value: "arrival", label: "Arrival (earliest first)" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="bg-purple-50 border border-purple-300 rounded-lg px-6 py-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-sm sm:text-base text-purple-800">
              <div className="font-semibold">
                {queryParams.originLocationCode} →{" "}
                {queryParams.destinationLocationCode}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0 text-gray-700">
                <div>
                  {new Date(queryParams.departureDate).toLocaleDateString()}
                  {queryParams.returnDate &&
                    ` – ${new Date(
                      queryParams.returnDate
                    ).toLocaleDateString()}`}
                </div>
                <div>
                  {queryParams.adults} adult
                  {queryParams.adults !== 1 ? "s" : ""}
                  {queryParams.children
                    ? `, ${queryParams.children} child${
                        queryParams.children !== 1 ? "ren" : ""
                      }`
                    : ""}
                  {queryParams.infants
                    ? `, ${queryParams.infants} infant${
                        queryParams.infants !== 1 ? "s" : ""
                      }`
                    : ""}
                </div>
                <div>{queryParams.travelClass}</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <FlightSearchForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
              >
                {filtersExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {filtersExpanded && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Price</h3>
                  <Slider
                    max={10000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Duration</h3>
                  <Slider
                    max={36}
                    step={1}
                    value={durationRange}
                    onValueChange={setDurationRange}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>{durationRange[0]}h</span>
                    <span>{durationRange[1]}h</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Stops</h3>
                  {["direct", "1-stop", "2-stops"].map((id) => (
                    <div key={id} className="flex items-center space-x-2">
                      <Checkbox
                        id={id}
                        checked={selectedStops.includes(id)}
                        onCheckedChange={() =>
                          handleCheckboxChange(
                            id,
                            selectedStops,
                            setSelectedStops
                          )
                        }
                      />
                      <label htmlFor={id} className="text-sm capitalize">
                        {id.replace("-", " ")}
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-medium mb-3">Airlines</h3>
                  {["ba", "af", "lh", "ezy", "kl"].map((code) => (
                    <div key={code} className="flex items-center space-x-2">
                      <Checkbox
                        id={code}
                        checked={selectedAirlines.includes(code)}
                        onCheckedChange={() =>
                          handleCheckboxChange(
                            code,
                            selectedAirlines,
                            setSelectedAirlines
                          )
                        }
                      />
                      <label htmlFor={code} className="text-sm uppercase">
                        {code}
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-medium mb-3">Departure time</h3>
                  {["early-morning", "morning", "afternoon", "evening"].map(
                    (id) => (
                      <div key={id} className="flex items-center space-x-2">
                        <Checkbox
                          id={id}
                          checked={selectedTimes.includes(id)}
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              id,
                              selectedTimes,
                              setSelectedTimes
                            )
                          }
                        />
                        <label htmlFor={id} className="text-sm capitalize">
                          {id.replace("-", " ")}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-900">
                {sortedFlights.length}
              </span>{" "}
              results found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <SortBox
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>
          </div>

          <div className="space-y-4">
            {isFetching && <p className="text-center">Loading...</p>}
            {error && (
              <p className="text-center text-red-500">
                {(error as any)?.data?.message || "Failed to load flight data"}
              </p>
            )}
            {!isFetching && !error && sortedFlights.length === 0 && (
              <p className="text-center text-gray-500">
                No flights found for selected filters.
              </p>
            )}
            {sortedFlights.map((flight, index) => (
              <FlightCard key={index} data={flight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
