import { X } from "lucide-react";
import React from "react";
import Button from "@/components/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
        <form className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
          />
          <Button>Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
