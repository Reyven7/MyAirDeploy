import { useMemo, useState } from "react";
import { CalendarDays, Users, Search, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { default as SearchButton } from "@/components/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
import { FlightSearchBox } from "@/components/flight-search-box";
import type {
  PassengerCounts,
  TravelClass,
  TripType,
} from "@/types/flight/flight-search.type";
import {
  formatPassengers,
  formatTravelClass,
} from "@/lib/flight-search.format";
import {
  flightSearchSchema,
  type FlightSearchFormData,
} from "@/validations/flight.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

type FlightSearchFormProps = {
  data?: FlightSearchFormData;
};

export const FlightSearchForm = ({ data }: FlightSearchFormProps) => {
  const defaultValues = useMemo<FlightSearchFormData>(() => {
    return (
      data ?? {
        from: { name: "", iataCode: "" },
        to: { name: "", iataCode: "" },
        departureDate: new Date().toISOString().split("T")[0],
        returnDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        passengers: { adults: 1, children: 0, infants: 0 },
        travelClass: "economy",
        tripType: "roundtrip",
      }
    );
  }, [data]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FlightSearchFormData>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();
  const [isPassengerPopoverOpen, setIsPassengerPopoverOpen] = useState(false);

  const passengers = watch("passengers");
  const tripType = watch("tripType");
  const travelClass = watch("travelClass");
  const departureDate = watch("departureDate");

  const updatePassengerCount = (
    type: keyof PassengerCounts,
    increment: boolean
  ) => {
    const current = passengers;
    const newCount = increment
      ? current[type] + 1
      : Math.max(0, current[type] - 1);

    if (type === "adults" && newCount < 1) return;
    const maxLimits = { adults: 9, children: 8, infants: 4 };
    if (newCount > maxLimits[type]) return;

    if (type === "infants" && newCount > current.adults) return;

    setValue("passengers", { ...current, [type]: newCount });
  };

  const onSubmit = (values: FlightSearchFormData) => {
    if (!values.from || !values.to || !values.departureDate) return;

    const params = new URLSearchParams({
      origin: values.from.iataCode,
      destination: values.to.iataCode,
      departureDate: values.departureDate,
      adults: values.passengers.adults.toString(),
      children: values.passengers.children.toString(),
      infants: values.passengers.infants.toString(),
      travelClass: values.travelClass.toUpperCase(),
    });

    if (values.tripType === "roundtrip" && values.returnDate) {
      params.set("returnDate", values.returnDate);
    }

    navigate(`/flight-results?${params.toString()}`);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Trip Type */}
          <div className="flex gap-6">
            {(["roundtrip", "oneway"] as TripType[]).map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id={type}
                  {...register("tripType")}
                  value={type}
                  checked={tripType === type}
                  onChange={() => setValue("tripType", type)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label
                  htmlFor={type}
                  className="text-sm font-medium cursor-pointer"
                >
                  {type === "roundtrip" ? "Round trip" : "One way"}
                </Label>
              </div>
            ))}
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Controller
                control={control}
                name="from"
                render={({ field }) => (
                  <FlightSearchBox
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.from && (
                <p className="text-red-600 text-sm mt-1">
                  Select your destination
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Controller
                control={control}
                name="to"
                render={({ field }) => (
                  <FlightSearchBox
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.to && (
                <p className="text-red-600 text-sm mt-1">
                  Select the point of departure
                </p>
              )}
            </div>
          </div>

          {/* Dates and Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Departure Date */}
            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="departureDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("departureDate")}
                  className="pl-10 h-12 items-center w-full"
                />
                {errors.departureDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.departureDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Return Date */}
            {tripType === "roundtrip" && (
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                  <Input
                    id="returnDate"
                    type="date"
                    min={departureDate}
                    {...register("returnDate")}
                    className="pl-10 h-12 w-full"
                  />
                  {errors.returnDate && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.returnDate.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Passengers & Class */}
            <div className="space-y-2">
              <Label>Passengers & Class</Label>
              <Popover
                open={isPassengerPopoverOpen}
                onOpenChange={setIsPassengerPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-start text-left font-normal"
                    type="button"
                  >
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">
                        {formatPassengers(passengers)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTravelClass(travelClass)}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <div className="p-4 space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-gray-500">12+ years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updatePassengerCount("adults", false)}
                          disabled={passengers.adults <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {passengers.adults}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updatePassengerCount("adults", true)}
                          disabled={passengers.adults >= 9}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-gray-500">2-11 years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updatePassengerCount("children", false)
                          }
                          disabled={passengers.children <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {passengers.children}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updatePassengerCount("children", true)}
                          disabled={passengers.children >= 8}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Infants</p>
                        <p className="text-sm text-gray-500">Under 2 years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updatePassengerCount("infants", false)}
                          disabled={passengers.infants <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {passengers.infants}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => updatePassengerCount("infants", true)}
                          disabled={
                            passengers.infants >= 4 ||
                            passengers.infants >= passengers.adults
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {passengers.infants > 0 &&
                      passengers.infants >= passengers.adults && (
                        <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                          Each infant must be accompanied by an adult
                        </p>
                      )}

                    <Separator />

                    {/* Class Selection */}
                    <div>
                      <p className="font-medium mb-3">Class</p>
                      {(
                        [
                          "economy",
                          "premium-economy",
                          "business",
                          "first",
                        ] as TravelClass[]
                      ).map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            type="radio"
                            id={option}
                            {...register("travelClass")}
                            value={option}
                            checked={travelClass === option}
                            onChange={() => setValue("travelClass", option)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <Label
                            htmlFor={option}
                            className="text-sm cursor-pointer"
                          >
                            {formatTravelClass(option)}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      className="w-full mt-4 bg-purple-600 hover:bg-purple-500"
                      onClick={() => setIsPassengerPopoverOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Search Button */}
          <SearchButton type="submit">
            <Search className="w-4 h-4" />
            Search flights
          </SearchButton>

          {/* Search Summary */}
          <div className="text-center text-sm text-gray-600">
            {tripType === "roundtrip" ? "Round trip" : "One way"} •{" "}
            {formatPassengers(passengers)} • {formatTravelClass(travelClass)}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
