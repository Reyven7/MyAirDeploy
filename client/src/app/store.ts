import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { amadeusApi } from "@/app/api/amadeusApi";
import { flightApi } from "@/app/api/flightApi";
import { hotelApi } from "./api/hotelApi";
import { geodbApi } from "./api/geodbApi";
import { unsplashApi } from "./api/unsplashApi";

export const store = configureStore({
  reducer: {
    [amadeusApi.reducerPath]: amadeusApi.reducer,
    [flightApi.reducerPath]: flightApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [geodbApi.reducerPath]: geodbApi.reducer,
    [unsplashApi.reducerPath]: unsplashApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(amadeusApi.middleware)
      .concat(flightApi.middleware)
      .concat(hotelApi.middleware)
      .concat(geodbApi.middleware)
      .concat(unsplashApi.middleware),
});

setupListeners(store.dispatch);
