import {
  Plane,
  FileWarning,
  CreditCard,
  AlertTriangle,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="bg-purple-50 text-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Plane className="mx-auto w-12 h-12 text-purple-500 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At MyAir Tickets, we are committed to providing a transparent and
            secure booking experience. Please read our refund policy carefully
            before making any purchase.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <Plane className="text-purple-500 w-6 h-6 mr-2" />
            <div>
              <h2 className="text-lg font-bold">1. Flight Bookings</h2>
              <p className="text-sm text-gray-500">
                Airline fare rules and refund conditions
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 w-4 h-4 mt-1" />
              Flight tickets are subject to the fare rules of the selected
              airline.
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="text-yellow-500 w-4 h-4 mt-1" />
              Most tickets are non-refundable unless explicitly stated by the
              airline.
            </li>
            <li className="flex items-start gap-2">
              <CreditCard className="text-indigo-500 w-4 h-4 mt-1" />
              Ticket changes or cancellations may result in additional charges.
            </li>
            <li className="flex items-start gap-2">
              <Clock className="text-purple-500 w-4 h-4 mt-1" />
              Refunds (if approved) are processed within{" "}
              <strong>7–14 business days</strong>.
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <FileWarning className="text-green-500 w-6 h-6 mr-2" />
            <div>
              <h2 className="text-lg font-bold">2. Hotel Reservations</h2>
              <p className="text-sm text-gray-500">
                Property-specific cancellation policies
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 w-4 h-4 mt-1" />
              Hotel bookings follow the cancellation policy of each property.
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="text-yellow-500 w-4 h-4 mt-1" />
              Non-refundable or last-minute bookings may not be eligible for
              refunds.
            </li>
            <li className="flex items-start gap-2">
              <Clock className="text-purple-500 w-4 h-4 mt-1" />
              Approved refunds are issued within{" "}
              <strong>5–7 business days</strong>.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <CreditCard className="text-orange-400 w-6 h-6 mr-2" />
            <div>
              <h2 className="text-lg font-bold">3. Service Fees</h2>
              <p className="text-sm text-gray-500">
                Processing and service fee policies
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li className="flex items-start gap-2">
              <XCircle className="text-red-500 w-4 h-4 mt-1" />
              All service and processing fees are{" "}
              <strong>non-refundable</strong>.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 w-4 h-4 mt-1" />
              Only the refundable portion of the booking, if applicable, will be
              returned.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <FileWarning className="text-purple-500 w-6 h-6 mr-2" />
            <div>
              <h2 className="text-lg font-bold">4. Requesting a Refund</h2>
              <p className="text-sm text-gray-500">
                How to submit your refund request
              </p>
            </div>
          </div>
          <div className="bg-purple-50 text-purple-800 p-4 rounded-md border border-purple-200 text-sm">
            <p>
              To request a refund, contact us at{" "}
              <a
                href="mailto:support@myair-tickets.com"
                className="text-purple-700 underline font-medium"
              >
                support@myair-tickets.com
              </a>{" "}
              within <span className="font-bold">72 hours</span> of your
              booking.
            </p>
            <p className="mt-2">
              Please include your booking reference, full name, and reason for
              the refund.
            </p>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="text-rose-500 w-6 h-6 mr-2" />
            <div>
              <h2 className="text-lg font-bold">5. Special Circumstances</h2>
              <p className="text-sm text-gray-500">
                Force majeure and exceptional situations
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 w-4 h-4 mt-1" />
              In cases of cancellations caused by force majeure (e.g. weather,
              pandemic), we will help you request a refund or voucher from the
              provider.
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="text-yellow-500 w-4 h-4 mt-1" />
              MyAir Tickets acts as a booking platform and is not responsible
              for airline or hotel policies.
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-2">
            <Mail className="w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">6. Contact Us</h2>
          </div>
          <p className="text-sm mb-2">We're here to help with any questions</p>
          <p className="text-sm">
            If you have any questions about this policy, please reach out to our
            support team:
          </p>
          <a
            href="mailto:support@myair-tickets.com"
            className="inline-block mt-2 font-medium underline text-white"
          >
            support@myair-tickets.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
