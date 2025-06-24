import { z } from "zod";

const roomConfigSchema = z
  .object({
    adults: z.number().min(1).max(8),
    children: z.number().min(0).max(6),
    childrenAges: z.array(z.number().min(0).max(17)),
  })
  .refine((data) => data.childrenAges.length === data.children, {
    message: "Children ages count must match number of children",
  });

export const hotelSearchSchema = z.object({
  keyword: z.object({
    keyword: z.string().min(1, "Keyword is required"),
    iataCode: z.string().min(1, "IATA code is required"),
  }),
  checkInDate: z.string().min(1, "Check In is required"),
  checkOutDate: z.string().min(1, "Check Out is required"),
  roomQuantity: z
    .array(roomConfigSchema)
    .min(1, "At least one room must be selected")
    .max(9, "No more than 9 rooms allowed"),
  radius: z.number().min(1).max(100),
});

export type HotelSearchFormData = z.infer<typeof hotelSearchSchema>;
