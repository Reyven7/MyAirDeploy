import { getFlightOffers } from "../services/flight.service";
import { flightOffersSearchValidation } from "../validations/flight.scheme";
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";

const fetchFlightOffers = asyncHandler(async (req: Request, res: Response) => {
  const validationValues = flightOffersSearchValidation.parse(req.query);

  const flightsOffers = await getFlightOffers(validationValues);

  res.json(flightsOffers.data);
});

export { fetchFlightOffers };
