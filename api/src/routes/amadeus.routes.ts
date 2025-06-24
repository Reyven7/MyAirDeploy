import {
  amadeusAuth,
  fetchLocation,
} from "@src/controllers/amadeus.controller";
import { Router } from "express";

export const createAmadeusRoutes = () => {
  const router = Router();

  router.get("/auth", amadeusAuth);
  router.get("/locations", fetchLocation);

  return router;
};
