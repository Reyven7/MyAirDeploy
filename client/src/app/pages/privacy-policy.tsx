import {
  ShieldCheck,
  FileText,
  Eye,
  Users,
  Lock,
  Cookie,
  Mail,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ShieldCheck className="mx-auto w-12 h-12 text-blue-500 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At MyAir Tickets, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and protect the data you provide to us.
          </p>
          <div className="mt-4 text-sm text-gray-500 font-semibold">
            Last updated: December 2024
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* 1. Info We Collect */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <FileText className="text-green-500 w-6 h-6 mr-2" />
              <div>
                <h2 className="text-lg font-bold">1. Information We Collect</h2>
                <p className="text-sm text-gray-500">
                  The types of data we gather to provide our services
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
              <li>Full name, email address, and contact details</li>
              <li>Passport or travel document information (if applicable)</li>
              <li>
                Payment details (processed securely through third-party
                gateways)
              </li>
              <li>IP address, browser type, and device data</li>
            </ul>
          </div>

          {/* 2. How We Use */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Eye className="text-blue-500 w-6 h-6 mr-2" />
              <div>
                <h2 className="text-lg font-bold">
                  2. How We Use Your Information
                </h2>
                <p className="text-sm text-gray-500">
                  The purposes for which we process your personal data
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
              <li>To complete your flight and hotel bookings</li>
              <li>To send you booking confirmations and updates</li>
              <li>To improve our services and customer experience</li>
              <li>To comply with legal obligations and fraud prevention</li>
            </ul>
          </div>

          {/* 3. Data Sharing */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Users className="text-purple-500 w-6 h-6 mr-2" />
              <div>
                <h2 className="text-lg font-bold">3. Data Sharing</h2>
                <p className="text-sm text-gray-500">
                  When and with whom we may share your information
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-700">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
              <li>
                Trusted travel providers and booking systems (e.g., Amadeus)
              </li>
              <li>Payment processors (e.g., SumUp, Stripe, PayPal)</li>
              <li>Law enforcement or regulatory bodies if legally required</li>
            </ul>
          </div>

          {/* 4. Data Security */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Lock className="text-rose-500 w-6 h-6 mr-2" />
              <div>
                <h2 className="text-lg font-bold">4. Data Security</h2>
                <p className="text-sm text-gray-500">
                  How we protect your personal information
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              All personal data is stored securely using encryption and
              protected infrastructure. We do not store full credit card details
              on our servers.
            </p>
          </div>

          {/* 5, 6, 7 - Grid Layout */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* 5. Cookies */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-2">
                <Cookie className="text-yellow-500 w-6 h-6 mr-2" />
                <h3 className="font-bold">5. Cookies</h3>
              </div>
              <p className="text-sm text-gray-700">
                Our website uses cookies to improve user experience. You can
                control cookie settings through your browser preferences.
              </p>
            </div>

            {/* 6. Your Rights */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-2">
                <ShieldCheck className="text-blue-500 w-6 h-6 mr-2" />
                <h3 className="font-bold">6. Your Rights</h3>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                <li>Access your personal data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent at any time</li>
                <li>Submit a complaint to a data protection authority</li>
              </ul>
            </div>

            {/* 7. Contact */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-2">
                <Mail className="text-indigo-500 w-6 h-6 mr-2" />
                <h3 className="font-bold">7. Contact Us</h3>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                If you have any questions regarding your privacy or this policy:
              </p>
              <a
                href="mailto:support@myair-tickets.com"
                className="text-sm text-blue-600 hover:underline"
              >
                support@myair-tickets.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
