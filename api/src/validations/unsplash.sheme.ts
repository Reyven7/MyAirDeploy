import z from "zod";

const countryImageValidation = z.object({
  countryName: z.string().min(1, "Country name is required!"),
});

export { countryImageValidation };
