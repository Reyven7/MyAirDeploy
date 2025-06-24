import { getCountryImage } from "@src/services/unsplash.service";
import { countryImageValidation } from "@src/validations/unsplash.sheme";
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";

export const fetchCountryImage = asyncHandler(
  async (req: Request, res: Response) => {
    const { countryName } = countryImageValidation.parse(req.params);
    
    const img = await getCountryImage(countryName);

    res.json(img);
  }
);
