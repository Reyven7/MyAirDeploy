import { useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "@/components/ui/label";
import { Bed, CalendarDays, Minus, Plus, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "@/components/ui/separator";
import { default as SearchButton } from "@/components/button";
import { HotelSearhBox } from "../hotel-search-box";
import { useNavigate } from "react-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hotelSearchSchema } from "@/validations/hotel.scheme";
import type { z } from "zod";

type HotelSearchFormData = z.infer<typeof hotelSearchSchema>;

type HotelSearchFormProps = {
  data?: HotelSearchFormData;
};

export const HotelSearchForm = ({ data }: HotelSearchFormProps) => {
  const defaultValue = useMemo<HotelSearchFormData>(() => {
    return (
      data ?? {
        keyword: { keyword: "", iataCode: "" },
        checkInDate: new Date().toISOString().split("T")[0],
        checkOutDate: new Date(Date.now() + 86400000)
          .toISOString()
          .split("T")[0],
        roomQuantity: [{ adults: 2, children: 0, childrenAges: [] }],
        radius: 5,
      }
    );
  }, [data]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<HotelSearchFormData>({
    resolver: zodResolver(hotelSearchSchema),
    defaultValues: defaultValue,
  });

  const navigate = useNavigate();

  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "roomQuantity",
  });

  const updateRoomCount = (
    index: number,
    type: "adults" | "children",
    increment: boolean
  ) => {
    const room = fields[index];
    const updated = { ...room };

    if (type === "adults") {
      const newCount = increment
        ? room.adults + 1
        : Math.max(1, room.adults - 1);
      if (newCount <= 8) updated.adults = newCount;
    } else if (type === "children") {
      const newCount = increment
        ? room.children + 1
        : Math.max(0, room.children - 1);
      if (newCount <= 6) {
        updated.children = newCount;
        updated.childrenAges = updated.childrenAges.slice(0, newCount);
        while (updated.childrenAges.length < newCount) {
          updated.childrenAges.push(5);
        }
      }
    }

    update(index, updated);
  };

  const updateChildAge = (
    roomIndex: number,
    childIndex: number,
    age: number
  ) => {
    const room = fields[roomIndex];
    const updatedAges = [...room.childrenAges];
    updatedAges[childIndex] = age;
    update(roomIndex, { ...room, childrenAges: updatedAges });
  };

  const addRoom = () => {
    if (fields.length < 8) {
      append({ adults: 2, children: 0, childrenAges: [] });
    }
  };

  const removeRoom = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const rooms = watch("roomQuantity");

  const getGuestText = () => {
    const totalAdults = rooms.reduce((s, r) => s + r.adults, 0);
    const totalChildren = rooms.reduce((s, r) => s + r.children, 0);
    const roomCount = rooms.length;

    return `${totalAdults} adult${
      totalAdults !== 1 ? "s" : ""
    }, ${totalChildren} child${
      totalChildren !== 1 ? "ren" : ""
    }, ${roomCount} room${roomCount !== 1 ? "s" : ""}`;
  };

  const getTotalGuests = () => {
    return rooms.reduce((sum, room) => sum + room.adults + room.children, 0);
  };

  const getTotalAdults = () => {
    return rooms.reduce((sum, room) => sum + room.adults, 0);
  };

  const onSubmit = (values: HotelSearchFormData) => {
    console.log("Form submitted with values:", values);

    if (!values.checkInDate || !values.checkOutDate || !values.keyword) {
      console.log("Missing required fields");
      return;
    }

    const params = new URLSearchParams({
      cityCode: values.keyword.iataCode,
      checkInDate: values.checkInDate,
      checkOutDate: values.checkOutDate,
      roomQuantity: values.roomQuantity.length.toString(),
      adults: getTotalAdults().toString(),
      radius: values.radius.toString(),
    });

    console.log("Navigating with params:", params.toString());
    navigate(`/hotel-results?${params.toString()}`);
  };

  return (
    <Card className=" border-0">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Destination Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="relative space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Controller
                control={control}
                name="keyword"
                render={({ field }) => (
                  <HotelSearhBox
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.keyword && (
                <p className="text-red-600 text-sm mt-1">
                  Select your destination
                </p>
              )}
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="radius">Raduis</Label>
              <Input
                id="radius"
                type="number"
                defaultValue={5}
                {...register("radius", { valueAsNumber: true })}
              />
              {errors.radius && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.radius.message}
                </p>
              )}
            </div>
          </div>

          {/* Date and Guest Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkin">Check-in</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="checkin"
                  type="date"
                  className="pl-10 h-12 items-center"
                  {...register("checkInDate")}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.checkInDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.checkInDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout">Check-out</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="checkout"
                  type="date"
                  className="pl-10 h-12 items-center"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("checkOutDate")}
                />
              </div>
              {errors.checkOutDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.checkOutDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Guests & Rooms</Label>
              <Popover
                open={isGuestPopoverOpen}
                onOpenChange={setIsGuestPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-start text-left font-normal"
                  >
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{getGuestText()}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0" align="start">
                  <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                    {rooms.map((room, roomIndex) => (
                      <div
                        key={roomIndex}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-blue-600" />
                            <h4 className="font-medium">
                              Room {roomIndex + 1}
                            </h4>
                          </div>
                          {rooms.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRoom(roomIndex)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Adults</p>
                            <p className="text-sm text-gray-500">18+ years</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                updateRoomCount(roomIndex, "adults", false)
                              }
                              disabled={room.adults <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {room.adults}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                updateRoomCount(roomIndex, "adults", true)
                              }
                              disabled={room.adults >= 8}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Children</p>
                            <p className="text-sm text-gray-500">0-17 years</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                updateRoomCount(roomIndex, "children", false)
                              }
                              disabled={room.children <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {room.children}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() =>
                                updateRoomCount(roomIndex, "children", true)
                              }
                              disabled={room.children >= 6}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Children Ages */}
                        {room.children > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                              Children's ages
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {room.childrenAges.map((age, childIndex) => (
                                <select
                                  key={childIndex}
                                  value={age}
                                  onChange={(e) =>
                                    updateChildAge(
                                      roomIndex,
                                      childIndex,
                                      Number.parseInt(e.target.value)
                                    )
                                  }
                                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                                >
                                  {Array.from({ length: 18 }, (_, i) => (
                                    <option key={i} value={i}>
                                      {i} year{i !== 1 ? "s" : ""} old
                                    </option>
                                  ))}
                                </select>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Room Button */}
                    {rooms.length < 8 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={addRoom}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add another room
                      </Button>
                    )}

                    <Separator />

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Total:</strong> {getTotalGuests()} guest
                        {getTotalGuests() > 1 ? "s" : ""} in {rooms.length} room
                        {rooms.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={() => setIsGuestPopoverOpen(false)}
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
            Search hotels
          </SearchButton>

          {/* Search Summary */}
          <div className="text-center text-sm text-gray-600">
            {getGuestText()}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
