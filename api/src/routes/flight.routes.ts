import { fetchFlightOffers } from "@src/controllers/flight.controller";
import { Router } from "express";

export const createFlightRoutes = () => {
  const router = Router();

  router.get("/offers", fetchFlightOffers);

  return router;
};
