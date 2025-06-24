import { Plane, Building2, Globe, ShieldCheck, Mail, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-purple-50 text-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Globe className="mx-auto w-12 h-12 text-purple-500 mb-4" />
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MyAir Tickets is an innovative travel technology platform designed to simplify and enhance your booking experience.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <ShieldCheck className="text-purple-500 w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Our Mission</h2>
          </div>
          <p className="text-gray-700">
            Our mission is to make global travel more accessible, secure, and transparent for everyone.
          </p>
        </div>

        {/* Technology */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <Plane className="text-purple-500 w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Technology & Partnerships</h2>
          </div>
          <p className="text-gray-700">
            We offer real-time flight and hotel bookings through integrations with global reservation systems such as <strong>Amadeus API</strong> — a trusted tool used by major airlines and travel agencies worldwide. By leveraging this technology, we deliver accurate availability, competitive pricing, and seamless service.
          </p>
        </div>

        {/* Team */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <Users className="text-purple-500 w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Who We Are</h2>
          </div>
          <p className="text-gray-700">
            Our team is made up of travel professionals, software engineers, and support staff who are passionate about helping people travel smarter. We act as a booking intermediary — connecting customers with trusted service providers while providing 24/7 support and clear communication.
          </p>
        </div>

        {/* Services */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <Building2 className="text-purple-500 w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">What We Provide</h2>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Real-time flight search and secure booking</li>
            <li>Hotel deals and smart filtering options</li>
            <li>Multiple payment options with international support</li>
            <li>Fast customer service via email, WhatsApp, and Telegram</li>
          </ul>
        </div>

        {/* Legal */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center mb-3">
            <ShieldCheck className="text-purple-500 w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Legal & Transparency</h2>
          </div>
          <p className="text-gray-700">
            MyAir is not a carrier or hotel provider — we operate as a technology partner that facilitates travel reservations from third-party providers. All terms, conditions, and policies are clearly published for full transparency.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-2">
            <Mail className="w-6 h-6 mr-2" />
            <h2 className="text-lg font-bold">Contact Us</h2>
          </div>
          <p className="text-sm">
            If you have any questions about our company, feel free to reach out at:
          </p>
          <a
            href="mailto:support@myair-tickets.com"
            className="inline-block mt-2 underline font-medium text-white"
          >
            support@myair-tickets.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
