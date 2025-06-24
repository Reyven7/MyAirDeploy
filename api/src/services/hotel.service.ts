

import { amadeusClient } from "../lib/amadeus.client";
import { AppError } from "../lib/app-error.class";
import { hotelOffersSearchValidation } from "../validations/hotel.scheme";
import z from "zod";


import { enrichHotelWithGoogleData } from './google-places.service';


const AMADEUS_HOTEL_LIST_URL =
  "https://api.amadeus.com/v1/reference-data/locations/hotels";

const AMADEUS_HOTEL_OFFERS_URL =
  "https://api.amadeus.com/v3/shopping/hotel-offers";

export const getHotelOffersByCity = async ({
  cityCode,
  adults,
  checkInDate,
  checkOutDate,
  roomQuantity,
  radius,
  radiusUnit,
  page = 1,
  pageSize = 10,
}: z.infer<typeof hotelOffersSearchValidation>) => {
  const hotelListResponse = await amadeusClient.get(
    AMADEUS_HOTEL_LIST_URL + "/by-city",
    { params: { cityCode, radius, radiusUnit } }
  );

  const hotelData = hotelListResponse.data?.data;
  if (!hotelData || hotelData.length === 0) {
    throw new AppError("No hotels found in this city!", 404);
  }

  const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
  const formattedCheckOutDate = checkOutDate.toISOString().split("T")[0];

  const hotelIds = hotelData.map((hotel: any) => hotel.hotelId);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedHotelIds = hotelIds.slice(start, end).join(",");

  const hotelOffersResponse = await amadeusClient.get(
    AMADEUS_HOTEL_OFFERS_URL,
    {
      params: {
        hotelIds: paginatedHotelIds,
        adults,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        roomQuantity,
      },
    }
  );

  
  const amadeusHotels = hotelOffersResponse.data.data;

  
  const enrichedHotels = await Promise.all(
      amadeusHotels.map((hotelOffer: any) => enrichHotelWithGoogleData(hotelOffer))
  );
  

  return {
    data: enrichedHotels, 
    meta: {
      currentPage: page,
      totalPages: Math.ceil(hotelIds.length / pageSize),
      totalItems: hotelIds.length,
    },
  };
};