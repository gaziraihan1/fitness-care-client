import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ onGoogleLogin }) => {
  return (
    <button
      onClick={onGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-2 md:gap-3 px-2 md:px-5 py-3 rounded-xl border border-gray-300 shadow-md 
                 bg-white dark:bg-gray-700 hover:shadow-lg hover:scale-[1.02] active:scale-95 
                 transition-all duration-300 ease-in-out"
    >
      <FcGoogle className="text-lg md:text-2xl" />
      <span className="text-gray-700 dark:text-gray-200 font-medium tracking-wide">
        Continue with Google
      </span>
    </button>
  );
};

export default SocialLogin;
