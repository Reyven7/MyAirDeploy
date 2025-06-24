import { getAmadeusAccessToken } from "@src/services/amadeus.service";
import axios from "axios";

export const amadeusClient = axios.create({
  baseURL: "https://api.amadeus.com",
});

amadeusClient.interceptors.request.use(async (config) => {
  const token = await getAmadeusAccessToken();
  config.headers.Authorization = `Bearer ${token}`;

  amadeusClient.interceptors.request.use((config) => {
    console.log("📤 Request to Amadeus:");
    console.log("➡️ URL:", config.url);
    console.log("➡️ Params:", config.params);
    console.log("➡️ Headers:", config.headers);
    return config;
  });

  return config;
});
