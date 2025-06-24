import {
  getAmadeusAccessToken,
  getLocation,
} from "../services/amadeus.service";
import { locationValidation } from "../validations/amadeus.scheme";
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";

const amadeusAuth = asyncHandler(async (req: Request, res: Response) => {
  const token = await getAmadeusAccessToken();

  res.json(token);
});

const fetchLocation = asyncHandler(async (req: Request, res: Response) => {
  const validationValues = locationValidation.parse(req.query);

  const locations = await getLocation(validationValues);

  res.json(locations);
});

export { amadeusAuth, fetchLocation };
