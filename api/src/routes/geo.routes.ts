import { Router } from "express";
import {
  fetchCountriesWithImage,
  getCities,
  getCountries,
} from "../controllers/geo.controller";

export const createGeoRoutes = () => {
  const router = Router();

  router.get("/countries", getCountries);
  router.get("/countries/images", fetchCountriesWithImage);
  router.get("/cities/:countryCode", getCities);

  return router;
};
