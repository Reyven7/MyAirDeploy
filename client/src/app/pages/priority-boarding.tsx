import { BadgeCheck, Clock, CheckCircle } from "lucide-react";

const PriorityBoarding = () => {
  return (
    <div className="bg-purple-50 min-h-screen py-16 px-4 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <BadgeCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Priority Boarding</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enjoy faster, more comfortable travel with{" "}
            <span className="text-purple-700 font-medium">
              MyAir Priority Boarding
            </span>
            . This service gives you early access to board the plane before
            general passengers.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white px-6 py-4 text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Benefits
            </div>
            <ul className="p-6 space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">✔</span>
                Skip the regular boarding queue
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">✔</span>
                Be among the first to board and find space for your cabin bag
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">✔</span>
                Travel hassle-free with more time to settle in your seat
              </li>
            </ul>
          </div>

          {/* How to Add */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white px-6 py-4 text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              How to Add
            </div>
            <ol className="p-6 space-y-4 text-sm text-gray-700 list-decimal list-inside">
              <li>Select your flight on the MyAir booking page</li>
              <li>
                Choose "Priority Boarding" as an optional service before
                checkout
              </li>
              <li>Receive confirmation in your ticket and email</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityBoarding;
