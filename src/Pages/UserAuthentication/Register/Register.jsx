import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  useEffect(() => {
    document.title = "Fitness Care | Register";
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [firebaseError, setFirebaseError] = useState("");

  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;
    setFirebaseError("");

    if (password.length < 6) {
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL }).then(() => {
          const userInfo = {
            name,
            email,
            photoURL,
            role: "member",
          };

          axiosSecure.post("/users", userInfo).then(() => {
            logOut().then(() => {
              navigate("/login");
            });
            reset();
          });
        });
      })
      .catch((err) => {
        setFirebaseError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const loggedInUser = res.user;

        const userInfo = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "member",
        };

        axiosSecure
          .post("/users", userInfo)
          .then(() => {
            axiosSecure
              .post("/jwt", { email: loggedInUser.email })
              .then((response) => {
                localStorage.setItem("access-token", response.data.token);
                navigate(location.state ? location.state : "/");
              })
              .catch(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
          🚀 Create Account
        </h2>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="photoURL"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Profile Photo URL
          </label>
          <input
            id="photoURL"
            type="text"
            {...register("photoURL")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters required" },
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {firebaseError && (
          <p className="mb-6 text-center text-red-600 font-medium">
            {firebaseError}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          Create Account
        </button>
        <div className="flex items-center gap-3 mt-6">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-400 text-sm">or</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>

        <div className="mt-8">
          <SocialLogin onGoogleLogin={handleGoogleSignIn} />
        </div>
      </form>
    </div>
  );
};

export default Register;
