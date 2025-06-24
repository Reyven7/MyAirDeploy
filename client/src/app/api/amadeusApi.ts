import type { LocationResponse } from "@/types/amadeus.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL;

export const amadeusApi = createApi({
  reducerPath: "amdeusApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/amadeus/" }),
  endpoints: (build) => ({
    getLocations: build.query<
      LocationResponse,
      {
        keyword: string;
        subType?: string;
        "page[limit]"?: number;
        "page[offset]"?: number;
        countryCode?: string;
      }
    >({
      query: ({
        keyword,
        subType,
        "page[limit]": pageLimit,
        "page[offset]": pageOffset,
        countryCode,
      }) => {
        let url = `locations?keyword=${encodeURIComponent(keyword)}`;
        if (subType) url += `&subType=${subType}`;
        if (countryCode) url += `&countryCode=${countryCode}`;
        if (pageLimit) url += `&page[limit]=${pageLimit}`;
        if (pageOffset) url += `&page[offset]=${pageOffset}`;
        return url;
      },
    }),
  }),
});

export const { useGetLocationsQuery } = amadeusApi;
