import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL;

export const unsplashApi = createApi({
  reducerPath: "unsplashApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/unsplash/" }),
  endpoints: (build) => ({
    getCountryImage: build.query<{ imageUrl: string }, string>({
      query: (countryName) => `country-name/${countryName}`,
    }),
  }),
});

export const { useGetCountryImageQuery } = unsplashApi;
