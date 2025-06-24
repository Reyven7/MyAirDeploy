import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow bg-gradient-to-r from-purple-700/90 to-blue-600/90  sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img className="max-h-16" src="/mainlogo.png" alt="Logo" />
        </Link>

        {/* Navigation (deckstop) */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-white/30">
            Home
          </Link>
          <Link to="/countries" className="hover:text-white/30">
            Explore
          </Link>
          <Link to="/support" className="hover:text-white/30">
            Support
          </Link>
        </nav>

        {/* Buttons (deckstop) */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => setShowSignIn(true)}
            className="hover:underline"
          >
            Sign in
          </button>
          <Button
            variant="outline"
            className="text-foreground"
            onClick={() => setShowSignUp(true)}
          >
            Create Account
          </Button>
        </div>

        {/* Burger-manager (mobile) */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu*/}
      <div
        className={`md:hidden bg-white text-black transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100 py-4 px-4" : "max-h-0 opacity-0 px-4"
        }`}
      >
        <nav className="flex flex-col gap-3 font-medium">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/support"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Support
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              setShowSignIn(true);
            }}
            className="text-left hover:underline"
          >
            Sign in
          </button>
          <Button
            onClick={() => {
              setMenuOpen(false);
              setShowSignUp(true);
            }}
            className="bg-black "
          >
            Create account
          </Button>
        </nav>
      </div>

      {/* Modals */}
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
      <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
    </header>
  );
};

export default Header;
