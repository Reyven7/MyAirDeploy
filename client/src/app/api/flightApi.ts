import type { FlightOffersResponse } from "@/types/flight/flight.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL;

export const flightApi = createApi({
  reducerPath: "flightApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/flight/" }),
  endpoints: (build) => ({
    getFlightOffers: build.query<
      FlightOffersResponse,
      {
        originLocationCode: string;
        destinationLocationCode: string;
        departureDate: string;
        returnDate?: string;
        adults: number;
        children?: number;
        infants?: number;
        travelClass: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
        currencyCode?: string;
        max?: number;
      }
    >({
      query: ({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        children,
        infants,
        travelClass,
        currencyCode = "USD",
        max = 10,
      }) => {
        const params = new URLSearchParams({
          originLocationCode,
          destinationLocationCode,
          departureDate,
          adults: adults.toString(),
          travelClass,
          currencyCode,
          max: max.toString(),
        });

        if (returnDate) params.append("returnDate", returnDate);
        if (children !== undefined)
          params.append("children", children.toString());
        if (infants !== undefined) params.append("infants", infants.toString());

        return `offers?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetFlightOffersQuery } = flightApi;
