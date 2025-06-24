import type {
  PassengerCounts,
  TravelClass,
} from "@/types/flight/flight-search.type";

export const formatPassengers = ({
  adults,
  children,
  infants,
}: PassengerCounts) => {
  const parts: string[] = [];

  if (adults > 0) parts.push(`${adults} adult${adults > 1 ? "s" : ""}`);
  if (children > 0) parts.push(`${children} child${children > 1 ? "ren" : ""}`);
  if (infants > 0) parts.push(`${infants} infant${infants > 1 ? "s" : ""}`);

  return parts.join(",");
};

export const formatTravelClass = (travelClass: TravelClass) => {
  const classNames: Record<TravelClass, string> = {
    economy: "Economy",
    "premium-economy": "Premium Economy",
    business: "Business",
    first: "First Class",
  };
  return classNames[travelClass];
};
