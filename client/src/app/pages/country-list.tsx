import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetCountriesWithImageQuery } from "@/app/api/geodbApi";
import { Input } from "@/components/ui/input";
import { Globe, MapPin, Search } from "lucide-react";
import type { Country } from "@/types/geo/geo.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CountryList = () => {
  const navigate = useNavigate();
  const {
    data: countriesResponse,
    isFetching,
    isError,
  } = useGetCountriesWithImageQuery();

  const [nameFilter, setNameFilter] = useState("");
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(
    new Set()
  );

  if (isFetching) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-500" />
            <p className="text-lg font-medium text-gray-600">
              Loading countries...
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (isError || countriesResponse?.data == null) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-lg font-medium text-red-600 mb-2">
              Error loading countries
            </p>
            <p className="text-gray-500">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const countries: Country[] = countriesResponse.data;

  const handleImageError = (countryCode: string) => {
    setImageLoadErrors((prev) => new Set(prev).add(countryCode));
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
          <Globe className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">
            Explore Destinations
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Select a Country</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing cities and destinations around the world. Choose a
          country to explore its cities and attractions.
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-colors"
            placeholder="Search for a country..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div>
        {nameFilter && (
          <div className="text-center">
            <Badge variant="secondary" className="px-3 py-1">
              {filteredCountries.length}{" "}
              {filteredCountries.length === 1 ? "country" : "countries"} found
            </Badge>
          </div>
        )}
      </div>

      {/* Countries Grid */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <Card
              key={country.code}
              onClick={() => navigate(`/cities/${country.code}/?page=1`)}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 p-0"
            >
              <CardContent className="relative h-48 w-full p-0">
                {!imageLoadErrors.has(country.code) ? (
                  <img
                    src={country.img || "/placeholder.svg"}
                    alt={country.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                    onError={() => handleImageError(country.code)}
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-purple-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-white/90 text-gray-700 hover:bg-white">
                    {country.code}
                  </Badge>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 to-transparent z-10">
                  <h3 className="font-semibold text-lg">{country.name}</h3>
                  <p className="text-sm mt-1">Explore cities & attractions</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No countries found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or browse all available countries.
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryList;
