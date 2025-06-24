import { z } from "zod";

const flightOffersSearchValidation = z
  .object({
    originLocationCode: z.string().min(1, "Origin location code is required"),

    destinationLocationCode: z
      .string()
      .min(1, "Destination location code is required"),

    departureDate: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date({ required_error: "Departure date is required" })
    ),

    returnDate: z
      .preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date().optional()
      )
      .refine((val) => val === undefined || !isNaN(val.getTime()), {
        message: "Invalid return date",
      }),

    adults: z.preprocess(
      (val) => Number(val),
      z.number().min(1, { message: "At least one adult is required" })
    ),

    children: z.preprocess(
      (val) => (val === undefined ? undefined : Number(val)),
      z.number().min(0).optional()
    ),

    infants: z.preprocess(
      (val) => (val === undefined ? undefined : Number(val)),
      z.number().min(0).optional()
    ),

    travelClass: z.enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]),

    currencyCode: z.string().min(1),

    max: z.preprocess(
      (val) => Number(val),
      z.number().min(1, { message: "Max results is required" })
    ),
  })
  .refine(
    (data) => {
      if (data.infants !== undefined) {
        return data.infants <= data.adults;
      }
      return true;
    },
    {
      message: "Number of infants cannot exceed number of adults",
      path: ["infants"],
    }
  );
export { flightOffersSearchValidation };
