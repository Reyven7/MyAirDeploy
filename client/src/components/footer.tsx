import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-r from-purple-600 to-blue-500 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
        {/* Airports */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Airports and Tourism</h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <a href="#" className="hover:text-white transition">
                Cheap flights to Rome
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Cheap flights to Athens
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Cheap flights to Dubai
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Visit Berlin
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-lg mb-4">MyAir Services</h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <a href="#" className="hover:text-white transition">
                Discount Club
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Hotels
              </a>
            </li>
            <li>
              <Link
                to="/priority-boarding"
                className="hover:text-white transition"
              >
                Priority Boarding
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <span className="font-medium">Business name:</span> Nexvia
              Solutions LTD
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              <a
                href="https://www.google.com/maps?q=58B+Wimpole+Street,+London,+W1G+8YR"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                58B Wimpole Street, London, W1G 8YR
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href="tel:+442080404615"
                className="hover:text-white transition"
              >
                +44 20 8040 4615
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:support@myair.com"
                className="hover:text-white transition"
              >
                support@myair.com
              </a>
            </li>
          </ul>

          {/* Social */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Follow MyAir</p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 bg-white/30 rounded-md hover:bg-white/50 transition hover:scale-110"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 bg-white/30 rounded-md hover:bg-white/50 transition hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="p-2 bg-white/30 rounded-md hover:bg-white/50 transition hover:scale-110"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/70 space-y-4 px-4">
        <div className="flex justify-center flex-wrap gap-4">
          <Link to="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-white transition">
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link to="/refund-policy" className="hover:text-white transition">
            Refund Policy
          </Link>

          <span>|</span>
          <Link to="/about-us" className="hover:text-white transition">
            About Us
          </Link>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          {["VERIFIED", "UnionPay", "Maestro", "MasterCard", "VISA"].map(
            (label) => (
              <div
                key={label}
                className="bg-white/30 text-sm px-3 py-1 rounded-md hover:bg-white/50 transition cursor-pointer"
              >
                {label}
              </div>
            )
          )}
        </div>

        <p className="pt-4">© 2025 MyAir. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
