import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ onGoogleLogin }) => {
  return (
    <button
      onClick={onGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-300 shadow-md 
                 bg-white hover:shadow-lg hover:scale-[1.02] active:scale-95 
                 transition-all duration-300 ease-in-out"
    >
      <FcGoogle className="text-2xl" />
      <span className="text-gray-700 font-medium tracking-wide">
        Continue with Google
      </span>
    </button>
  );
};

export default SocialLogin;
