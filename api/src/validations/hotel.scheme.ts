import { z } from "zod";

const hotelOffersSearchValidation = z.object({
  cityCode: z.string().min(1, "City code is required"),

  radius: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Radius is required" }).max(100).optional()
  ),
  radiusUnit: z.enum(["KM", "MILE"]).optional(),

  checkInDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Check in date is required" })
  ),

  checkOutDate: z
    .preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date()
    )
    .refine((val) => val === undefined || !isNaN(val.getTime()), {
      message: "Invalid check out date",
    }),

  adults: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "At least one adult is required" })
  ),

  roomQuantity: z.preprocess(
    (val) => (val === undefined ? undefined : Number(val)),
    z.number().min(1)
  ),

  page: z.preprocess(
    (val) => (val === undefined ? undefined : Number(val)),
    z.number().int().min(1).optional()
  ),
  pageSize: z.preprocess(
    (val) => (val === undefined ? undefined : Number(val)),
    z.number().int().min(1).max(100).optional()
  ),
});

export { hotelOffersSearchValidation };
