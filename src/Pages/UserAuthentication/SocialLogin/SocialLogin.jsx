import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = ({ onGoogleLogin }) => {
  return (
    <button
      onClick={onGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center border px-4 py-2 rounded hover:bg-gray-100 transition"
    >
      <FcGoogle className="mr-2 text-xl" />
      Sign in with Google
    </button>
  );
};

export default SocialLogin;
