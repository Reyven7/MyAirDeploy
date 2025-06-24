import {
  Plane,
  ShieldCheck,
  FileText,
  RefreshCcw,
  AlertTriangle,
  Lock,
  Mail,
} from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="bg-purple-50 text-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to MyAir Tickets. These Terms of Service govern your use of
            our website and services. By accessing or using our platform, you
            agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* 1. Services Provided */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <Plane className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">1. Services Provided</h2>
            </div>
            <p className="text-gray-700">
              MyAir Tickets provides a booking platform for flights and hotels
              through third-party providers via Amadeus API. We do not operate
              flights or hotels directly.
            </p>
          </div>

          {/* 2. User Responsibilities */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <ShieldCheck className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">2. User Responsibilities</h2>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
              <li>
                You agree to provide accurate and complete information when
                booking.
              </li>
              <li>
                You are responsible for verifying the travel details before
                making a purchase.
              </li>
              <li>
                You must not use the platform for fraudulent or illegal
                activity.
              </li>
            </ul>
          </div>

          {/* 3. Booking & Payments */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <FileText className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">3. Booking & Payments</h2>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
              <li>
                All bookings are final and subject to the provider’s terms and
                availability.
              </li>
              <li>
                Payments are processed via secure third-party gateways (e.g.
                SumUp, Stripe).
              </li>
              <li>
                We are not responsible for declined transactions by banks or
                card issuers.
              </li>
            </ul>
          </div>

          {/* 4. Cancellations & Refunds */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <RefreshCcw className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">4. Cancellations & Refunds</h2>
            </div>
            <p className="text-gray-700">
              Refunds and cancellations are governed by our Refund Policy and
              the terms of the airline or hotel provider.
            </p>
          </div>

          {/* 5. Limitation of Liability */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <AlertTriangle className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">5. Limitation of Liability</h2>
            </div>
            <p className="text-gray-700">
              We are not liable for delays, cancellations, or issues caused by
              third-party providers. Our platform is provided “as-is” without
              warranties of any kind.
            </p>
          </div>

          {/* 6. Privacy */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <Lock className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">6. Privacy</h2>
            </div>
            <p className="text-gray-700">
              Our use of your data is governed by our{" "}
              <a
                href="/privacy-policy"
                className="text-purple-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* 7. Changes to Terms */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-3">
              <FileText className="text-purple-500 w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">7. Changes to Terms</h2>
            </div>
            <p className="text-gray-700">
              We reserve the right to update these terms at any time. Continued
              use of the platform constitutes acceptance of the new terms.
            </p>
          </div>

          {/* 8. Contact */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-2">
              <Mail className="w-6 h-6 mr-2" />
              <h2 className="text-lg font-bold">8. Contact</h2>
            </div>
            <p className="text-sm">
              If you have questions about these terms, contact us at{" "}
              <a
                href="mailto:support@myair-tickets.com"
                className="underline font-medium"
              >
                support@myair-tickets.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
