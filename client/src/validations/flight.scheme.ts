import { z } from "zod";

export const flightSearchSchema = z.object({
  from: z.object({ name: z.string(), iataCode: z.string() }),
  to: z.object({ name: z.string(), iataCode: z.string() }),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z
    .object({
      adults: z.number().min(1).max(9),
      children: z.number().max(8),
      infants: z.number().max(4),
    })
    .refine(({ adults, infants }) => infants <= adults, {
      message: "Infants cannot exceed adults",
    }),
  travelClass: z.enum(["economy", "premium-economy", "business", "first"]),
  tripType: z.enum(["roundtrip", "oneway"]),
});

export type FlightSearchFormData = z.infer<typeof flightSearchSchema>;
