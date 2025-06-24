import React, { useState } from "react";
import { Plane, Hotel } from "lucide-react";
import { FlightSearchForm } from "@/components/forms/flight-search-form";
import { HotelSearchForm } from "@/components/forms/hotel-search-form";

const FlightSearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Compare and book flights <br className="hidden md:block" /> with ease
        </h1>
        <p className="text-gray-500 mt-4 text-base sm:text-lg">
          Search hundreds of travel sites at once to find the best deals
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex mb-6 gap-2 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab("flights")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "flights"
                ? "bg-gradient-to-r from-purple-500 to-blue-400 text-white shadow"
                : "bg-gray-100 text-black"
            }`}
          >
            <Plane className="w-4 h-4" />
            Flights
          </button>
          <button
            onClick={() => setActiveTab("hotels")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "hotels"
                ? "bg-gradient-to-r from-purple-500 to-blue-400 text-white shadow"
                : "bg-gray-100 text-black"
            }`}
          >
            <Hotel className="w-4 h-4" />
            Hotels
          </button>
        </div>

        {activeTab === "flights" && <FlightSearchForm />}
        {activeTab === "hotels" && <HotelSearchForm />}
      </div>
    </div>
  );
};

export default FlightSearch;
