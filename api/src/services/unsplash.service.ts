import { AppError } from "../lib/app-error.class";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  // accessKey: process.env.UNSPLASH_ACCESS_KEY!,
  accessKey: "s_LKIKyYmaRc99qeEGy93IjM6DBmyJPx_rUkW7Gl0zk",
});

export const getCountryImage = async (
  countryName: string
): Promise<{ imageUrl: string }> => {
  const response = await unsplash.search.getPhotos({
    query: countryName,
    orientation: "landscape",
    perPage: 1,
    contentFilter: "low",
  });

  const photo = response.response?.results?.[0];
  if (!photo) throw new AppError("No image found for country: " + countryName);

  return { imageUrl: photo.urls.regular };
};
