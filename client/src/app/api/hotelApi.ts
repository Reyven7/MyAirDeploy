import type { HotelOffersResponse } from "@/types/hotel/hotel.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACK_END_BASE_URL;

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/hotel/" }),
  endpoints: (build) => ({
    getHotelOffers: build.query<
      HotelOffersResponse,
      {
        cityCode: string;
        radius?: number;
        radiusUnit?: "KM" | "MILE";
        adults: number;
        checkInDate: string;
        checkOutDate: string;
        roomQuantity: number;
        page?: number;
        pageSize?: number;
      }
    >({
      query: ({
        cityCode,
        radius = 5,
        radiusUnit = "KM",
        adults,
        checkInDate,
        checkOutDate,
        roomQuantity,
        page = 1,
        pageSize = 10,
      }) => ({
        url: `offers`,
        params: {
          cityCode,
          radius,
          radiusUnit,
          adults,
          checkInDate,
          checkOutDate,
          roomQuantity,
          page,
          pageSize,
        },
      }),
    }),
  }),
});

export const { useGetHotelOffersQuery } = hotelApi;
