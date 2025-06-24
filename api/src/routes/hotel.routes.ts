import { fetchHotelOffersByCity } from "@src/controllers/hotel.controller";
import { Router } from "express";

export const createHotelRoutes = () => {
  const router = Router();

  router.get("/offers", fetchHotelOffersByCity);

  return router;
};
