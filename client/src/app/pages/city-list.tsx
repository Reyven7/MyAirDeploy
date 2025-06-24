import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useGetLocationsQuery } from "../api/amadeusApi";
import { useEffect, useState } from "react";
import {
  Building2,
  ChevronRight,
  MapPin,
  Search,
  Plane,
  Hotel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 20;

const CityList = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const {
    data: cities,
    isFetching,
    isError,
    isLoading,
  } = useGetLocationsQuery(
    {
      keyword: searchTerm || countryCode || "",
      subType: "CITY",
      "page[limit]": ITEMS_PER_PAGE,
      "page[offset]": offset,
      countryCode: countryCode,
    },
    {
      skip: !countryCode,
    }
  );

  const totalCount = cities?.meta?.count ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  }, [searchTerm, location.search, setSearchParams]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", totalPages.toString());
      setSearchParams(params);
    }
  }, [currentPage, totalPages, location.search, setSearchParams]);

  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleViewFlightsClick = (cityIataCode: string) => {
    const today = new Date();
    const formattedDate = getFormattedDate(today);

    const url = `/flights-results?origin=LON&destination=${cityIataCode}&departureDate=${formattedDate}&adults=1`;
    console.log("Navigating to flights with URL:", url);
    navigate(url);
  };

  const handleViewHotelsClick = (cityIataCode: string, cityName: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedToday = getFormattedDate(today);
    const formattedTomorrow = getFormattedDate(tomorrow);

    const url = `/hotel-results?cityCode=${cityIataCode}&destinationName=${encodeURIComponent(
      cityName
    )}&checkInDate=${formattedToday}&checkOutDate=${formattedTomorrow}&adults=1&roomQuantity=1`;
    console.log("Navigating to hotels with URL:", url);
    navigate(url);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 animate-pulse text-purple-500" />
            <p className="text-lg font-medium text-gray-600">
              Loading cities...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <NavLink to={"/countries"}>
            <Button variant="ghost" className="hover:bg-none">
              <span>Countries</span>
            </Button>
          </NavLink>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{countryCode}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Cities in {countryCode}
            </h1>
            <p className="text-gray-600 mt-1">
              Discover {cities?.meta?.count ?? 0} amazing cities and
              destinations
            </p>
          </div>
        </div>
      </div>

      {/* Search*/}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {isError || cities?.data == null || cities.data.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cities found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? `No cities match "${searchTerm}". Try adjusting your search.`
              : "No cities available for this country."}
          </p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => handleSearchChange("")}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Results Info */}
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Showing {offset + 1}-
              {Math.min(offset + ITEMS_PER_PAGE, totalCount)} of {totalCount}{" "}
              cities
            </p>
          </div>

          {/* Cities Grid */}
          {isFetching ? (
            <div className="mx-auto max-w-7xl p-6">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Building2 className="w-12 h-12 mx-auto mb-4 animate-pulse text-purple-500" />
                  <p className="text-lg font-medium text-gray-600">
                    Loading cities...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cities.data.map((city) => (
                <Card
                  key={city.iataCode}
                  className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-zink-200 hover:border-purple-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-700 transition-colors">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {city.iataCode}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                        {city.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {city.subType.toLowerCase().replace("_", " ")}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                      {/* Кнопка*/}
                      <Button
                        variant="outline"
                        className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        onClick={() => handleViewFlightsClick(city.iataCode)}
                      >
                        <Plane className="w-4 h-4 mr-2" />
                        View Flights
                      </Button>
                      {/* Кнопка */}
                      <Button
                        variant="outline"
                        className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() =>
                          handleViewHotelsClick(city.iataCode, city.name)
                        }
                      >
                        <Hotel className="w-4 h-4 mr-2" />
                        View Hotels
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination  */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center pt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default CityList;
