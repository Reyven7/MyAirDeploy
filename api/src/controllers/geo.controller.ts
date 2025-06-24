import {
  fecthCountries,
  getCountriesWithImage,
} from "../services/country.service";
import { Request, Response } from "express";
import citiesDataRaw from "../data/cities.json";
import asyncHandler from "express-async-handler";

const citiesData: any[] = citiesDataRaw as any[];

export const getCountries = asyncHandler(
  async (req: Request, res: Response) => {
    const countries = await fecthCountries();
    res.json({ data: countries });
  }
);
export const fetchCountriesWithImage = asyncHandler(
  async (req: Request, res: Response) => {
    const countries = await getCountriesWithImage();
    res.json({ data: countries });
  }
);

export const getCities = asyncHandler(async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  const cities = citiesData.filter(
    (city: any) => city.country_code === countryCode
  );

  res.json({ data: cities });
});
