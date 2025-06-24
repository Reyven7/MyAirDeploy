import { amadeusClient } from "@src/lib/amadeus.client";
import { locationValidation } from "@src/validations/amadeus.scheme";
import axios from "axios";
import z from "zod";

type TokenCache = {
  token: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

const AMADEUS_AUTH_URL = "https://api.amadeus.com/v1/security/oauth2/token";
const AMADEUS_LOCATION_URL =
  "https://api.amadeus.com/v1/reference-data/locations";

function isValidTokenCache(cache: TokenCache | null): cache is TokenCache {
  return cache !== null && cache.expiresAt > Date.now();
}

export const getAmadeusAccessToken = async (): Promise<string> => {
  if (isValidTokenCache(tokenCache)) {
    return tokenCache.token;
  }

  const response = await axios.post(
    AMADEUS_AUTH_URL,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID!,
      client_secret: process.env.AMADEUS_CLIENT_SECRET!,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, expires_in } = response.data;

  tokenCache = {
    token: access_token,
    expiresAt: Date.now() + expires_in * 1000,
  };

  return tokenCache.token;
};

export const getLocation = async ({
  keyword,
  subType = "CITY,AIRPORT",
  view = "FULL",
  "page[limit]": pageLimit = 10,
  "page[offset]": pageOffset = 0,
  countryCode,
}: z.infer<typeof locationValidation>) => {
  const response = await amadeusClient.get(AMADEUS_LOCATION_URL, {
    params: {
      keyword,
      subType,
      view,
      "page[limit]": pageLimit,
      "page[offset]": pageOffset,
      countryCode,
    },
  });

  return response.data;
};
