import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { hotelOffersSearchValidation } from "@src/validations/hotel.scheme";
import { getHotelOffersByCity } from "@src/services/hotel.service";

const fetchHotelOffersByCity = asyncHandler(
  async (req: Request, res: Response) => {
    const validationValues = hotelOffersSearchValidation.parse(req.query);

    const names = await getHotelOffersByCity(validationValues);

    res.json(names);
  }
);

export { fetchHotelOffersByCity };
