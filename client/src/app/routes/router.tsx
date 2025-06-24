import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { HomePage } from "@/app/pages/home-page";
import SupportPage from "../pages/support-page";
import PrivacyPolicy from "../pages/privacy-policy";
import TermsOfService from "../pages/terms-of-service";
import RefundPolicy from "../pages/refund-policy";
import AboutUs from "../pages/about-us";
import PriorityBoarding from "../pages/priority-boarding";
import FlightResults from "../pages/flight-results";
import HotelResults from "../pages/hotel-results";
import CountryList from "../pages/country-list";
import CityList from "../pages/city-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "support", element: <SupportPage /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsOfService /> },
      { path: "refund-policy", element: <RefundPolicy /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "priority-boarding", element: <PriorityBoarding /> },
      { path: "flight-results", element: <FlightResults /> },
      { path: "hotel-results", element: <HotelResults /> },
      { path: "countries", element: <CountryList /> },
      { path: "cities/:countryCode", element: <CityList /> },
    ],
  },
]);
