import axios from "axios";
import { GOOGLE_API_KEY } from "../app";

interface GooglePlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
  html_attributions: string[];
}

interface GooglePlaceCandidate {
  place_id: string;
  rating?: number;
  photos?: GooglePlacePhoto[];
}

/**
 * @param hotelData
 * @returns
 */
export async function enrichHotelWithGoogleData(hotelData: any): Promise<any> {
  const hotelName = hotelData.hotel?.name;
  const cityName = hotelData.hotel?.address?.cityName;

  let imageUrl: string | undefined;
  let googleRating: number | undefined;

  if (!hotelName) {
    console.warn(
      `[GooglePlacesService] Hotel name missing for hotelId: ${hotelData.hotel?.hotelId}. Skipping Google Places search.`
    );
    return hotelData;
  }

  try {
    const findPlaceResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
      {
        params: {
          input: `${hotelName}, ${cityName || ""}`,
          inputtype: "textquery",
          fields: "place_id,rating,photos",
          key: GOOGLE_API_KEY,
        },
      }
    );

    const candidate: GooglePlaceCandidate | undefined =
      findPlaceResponse.data.candidates[0];

    if (candidate && candidate.place_id) {
      if (candidate.rating !== undefined) {
        googleRating = candidate.rating;
      }

      if (candidate.photos && candidate.photos.length > 0) {
        const photoReference = candidate.photos[0].photo_reference;

        imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=<span class="math-inline">\{photoReference\}&key\=</span>{GOOGLE_API_KEY}`;
      }
    }
  } catch (error: any) {
    console.error(
      `[GooglePlacesService] Error fetching Google Place data for "${hotelName}":`,
      error.response ? error.response.data : error.message
    );
  }

  return {
    ...hotelData,
    hotel: {
      ...hotelData.hotel,
      imageUrl: imageUrl,
      googleRating: googleRating,
    },
  };
}
