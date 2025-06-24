import type { FlightOffer } from "@/types/flight/flight.type";
import { FaPlaneDeparture } from "react-icons/fa";
import { Button } from "./ui/button";

export const FlightCard = ({ data }: { data: FlightOffer }) => {
  const segment = data.itineraries[0]?.segments[0];
  const arrivalSegment = data.itineraries[0]?.segments.slice(-1)[0];
  const duration = data.itineraries[0]?.duration
    .replace("PT", "")
    .replace("H", "h ")
    .replace("M", "m");

  return (
    <div className="p-6 shadow-lg rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-600 text-white rounded-full p-2 w-12 h-12 flex justify-center items-center">
            <span className="text-xl font-bold">
              {data.validatingAirlineCodes[0]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              {data.validatingAirlineCodes[0]} Airlines
            </h3>
            <p className="text-sm text-gray-500">Premium Service</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <p>{segment.departure.iataCode}</p>
          <p>{arrivalSegment.arrival.iataCode}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700">
            {new Date(segment.departure.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(segment.departure.at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-500 font-bold">{duration}</span>
          <div className="w-8 h-8 bg-purple-100 rounded-full flex justify-center items-center">
            <FaPlaneDeparture className="text-purple-500" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700">
            {new Date(arrivalSegment.arrival.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(arrivalSegment.arrival.at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Terminal {segment.departure.terminal || "-"}
        </p>
        <p className="text-sm text-gray-500">
          Terminal {arrivalSegment.arrival.terminal || "-"}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">
            Regular Price:{" "}
            <span className="text-xl font-bold text-gray-800">
              {data.price.total} {data.price.currency}
            </span>
          </p>
          {data.price.currency !== "USD" && (
            <p className="text-sm text-gray-500">
              Estimated in USD: ${(data.price.total * 1.1).toFixed(2)}{" "}
            </p>
          )}
        </div>
        <div>
          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};
