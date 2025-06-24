import type { citiesResponce, CountriesResponce } from "@/types/geo/geo.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL;

export const geodbApi = createApi({
  reducerPath: "geodbApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/geo/" }),
  endpoints: (build) => ({
    getCities: build.query<citiesResponce, string>({
      query: (countryCode: string) => `cities/${countryCode}`,
    }),
    getCountries: build.query<CountriesResponce, void>({
      query: () => "countries",
    }),
    getCountriesWithImage: build.query<CountriesResponce, void>({
      query: () => "countries/images",
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetCountriesWithImageQuery,
} = geodbApi;
