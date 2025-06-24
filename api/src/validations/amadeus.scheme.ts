import { z } from "zod";

const locationValidation = z.object({
  keyword: z.string().min(1, "Keyword is required"),
  subType: z.enum(["AIRPORT", "CITY", "CITY,AIRPORT"]).optional(),
  view: z.enum(["LIGHT", "FULL"]).optional(),
  countryCode: z.string().optional(),
  "page[limit]": z.preprocess(
    (val) => (val === undefined ? undefined : Number(val)),
    z.number().int().min(1).optional()
  ),
  "page[offset]": z.preprocess(
    (val) => (val === undefined ? undefined : Number(val)),
    z.number().int().min(1).optional()
  ),
});

export { locationValidation };
