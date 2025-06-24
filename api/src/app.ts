import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("Error: GOOGLE_API_KEY is not defined in .env file!");
  process.exit(1);
}

import { createAmadeusRoutes } from "@src/routes/amadeus.routes";
import { createFlightRoutes } from "@src/routes/flight.routes";
import { createHotelRoutes } from "@src/routes/hotel.routes";
import { errorHadler } from "@src/middleware/error.middleware";
import { createGeoRoutes } from "@src/routes/geo.routes";
import { createUnsplashRoutes } from "./routes/unsplash.routes";
export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/amadeus", createAmadeusRoutes());
app.use("/flight", createFlightRoutes());
app.use("/hotel", createHotelRoutes());
app.use("/geo", createGeoRoutes());
app.use("/unsplash", createUnsplashRoutes());

app.use(errorHadler);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
