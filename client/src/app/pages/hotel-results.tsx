import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useGetHotelOffersQuery } from "@/app/api/hotelApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HotelSearchForm } from "@/components/forms/hotel-search-form";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SortBox } from "@/components/sort-box";
import { HotelCard } from "@/components/hotels/HotelCard";
import { HotelMap } from "@/components/hotels/HotelMap";

const HotelResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const queryParams = useMemo(
    () => ({
      cityCode: searchParams.get("cityCode") || "",
      checkInDate: searchParams.get("checkInDate") || "",
      checkOutDate: searchParams.get("checkOutDate") || "",
      roomQuantity: Number(searchParams.get("roomQuantity") || "1"),
      adults: Number(searchParams.get("adults") || "1"),
    }),
    [location.search]
  );

  const { data, error, isFetching } = useGetHotelOffersQuery(queryParams, {
    skip:
      !queryParams.cityCode ||
      !queryParams.checkInDate ||
      !queryParams.checkOutDate,
  });

  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]); // State for selected stars
  const [sortBy, setSortBy] = useState("price");

  const sortOptions = [
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
    { value: "distance", label: "Distance" },
  ];

  const hotels = data?.data || [];

  // Filter hotels based on price range and selected stars
  const filteredHotels = useMemo(() => {
    let currentHotels = hotels.filter((hotel: any) => {
      const hotelPrice = hotel.offers[0]?.price?.total || 0; // Assuming price is in offers[0].price.total
      const passesPriceFilter =
        hotelPrice >= priceRange[0] && hotelPrice <= priceRange[1];

     
      const hotelRoundedRating = Math.floor(hotel.hotel?.rating || 0); // Используем Math.floor

      const passesStarFilter =
        selectedStars.length === 0 || selectedStars.includes(hotelRoundedRating);

      return passesPriceFilter && passesStarFilter;
    });

    // Sort hotels
    currentHotels.sort((a: any, b: any) => {
      if (sortBy === "price") {
        const priceA = a.offers[0]?.price?.total || 0;
        const priceB = b.offers[0]?.price?.total || 0;
        return priceA - priceB;
      } else if (sortBy === "rating") {
        const ratingA = a.hotel?.rating || 0;
        const ratingB = b.hotel?.rating || 0;
        return ratingB - ratingA; // Descending for rating
      }
      // "distance" sorting would require actual distance data,
      // which isn't present in the provided `hotel` object structure.
      // For now, it will not sort by distance.
      return 0;
    });

    return currentHotels;
  }, [hotels, priceRange, selectedStars, sortBy]);

  // Handler for star checkbox changes
  const handleStarChange = (star: number, isChecked: boolean) => {
    setSelectedStars((prevStars) =>
      isChecked
        ? [...prevStars, star]
        : prevStars.filter((s) => s !== star)
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-10 text-gray-800">
      {/* Search accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="bg-purple-50 border border-purple-300 rounded-lg px-6 py-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-sm sm:text-base text-purple-800">
              <div className="font-semibold">{queryParams.cityCode}</div>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0 text-gray-700">
                <div>
                  {new Date(queryParams.checkInDate).toLocaleDateString()} -{" "}
                  {new Date(queryParams.checkOutDate).toLocaleDateString()}
                </div>
                <div>
                  {queryParams.adults} adult
                  {queryParams.adults !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <HotelSearchForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
        {/* Filters */}
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
                  <h3 className="font-medium mb-3">Stars</h3>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center space-x-2">
                      <Checkbox
                        id={`star-${star}`}
                        checked={selectedStars.includes(star)}
                        onCheckedChange={(checked) =>
                          handleStarChange(star, checked as boolean)
                        }
                      />
                      <label htmlFor={`star-${star}`} className="text-sm">
                        {star} stars
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hotel results - now takes 2 columns in large screens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-900">
                {filteredHotels.length}
              </span>{" "}
              hotels found
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

          <div className="grid lg:grid-cols-1 gap-6">
            {isFetching && <p className="text-center">Loading...</p>}
            {error && (
              <p className="text-center text-red-500">
                {(error as any)?.data?.message ||
                  "Failed to load hotel data."}
              </p>
            )}
            {!isFetching && !error && filteredHotels.length === 0 && (
              <p className="text-center text-gray-500">
                No hotels found for selected filters.
              </p>
            )}
            {filteredHotels.map((hotel: any) => (
              <HotelCard key={hotel.hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        </div>

        {/* Map - now takes 2 columns in large screens */}
        <div className="lg:col-span-2 hidden lg:block">
          <div className="sticky top-24 h-[calc(100vh-100px)]">
            <HotelMap hotels={filteredHotels} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelResults;