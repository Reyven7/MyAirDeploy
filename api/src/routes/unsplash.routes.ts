import { fetchCountryImage } from "../controllers/unsplash.controller";
import { Router } from "express";

export const createUnsplashRoutes = () => {
  const router = Router();

  router.get("/country-name/:countryName", fetchCountryImage);

  return router;
};
