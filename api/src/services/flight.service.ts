import { amadeusClient } from "../lib/amadeus.client";
import { AppError } from "../lib/app-error.class";
import { flightOffersSearchValidation } from "../validations/flight.scheme";
import { z } from "zod";

const AMADEUS_FLIGHT_URL = "https://api.amadeus.com/v2/shopping/flight-offers";

export const getFlightOffers = async ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  children,
  travelClass,
  infants,
  currencyCode,
  max,
}: z.infer<typeof flightOffersSearchValidation>) => {
  const formattedDepartureDate = departureDate.toISOString().split("T")[0];
  const formattedReturnDate = returnDate?.toISOString().split("T")[0];

  const flightsOffers = await amadeusClient(AMADEUS_FLIGHT_URL, {
    params: {
      originLocationCode,
      destinationLocationCode,
      departureDate: formattedDepartureDate,
      returnDate: formattedReturnDate,
      adults,
      children,
      infants,
      travelClass,
      currencyCode,
      max,
    },
  });

  if (!flightsOffers) throw new AppError("Not found!", 404);

  return flightsOffers;
};
