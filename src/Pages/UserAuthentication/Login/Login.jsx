import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  useEffect(() => {
    document.title = "Fitness Care | Login";
  }, []);
  const { signIn, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const location = useLocation();

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoginError("");

    signIn(email, password)
      .then((res) => {
        const loggedInUser = res.user;
        axiosSecure
          .post("/jwt", { email: loggedInUser.email })
          .then((response) => {
            localStorage.setItem("access-token", response.data.token);
            navigate(location.state ? location.state : "/");
          });
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    setLoginError("");

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
              .catch(() => {
                setLoginError("Failed to get JWT token");
              });
          })
          .catch(() => {
            setLoginError("Failed to save user info");
          });
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 dark:bg-gray-800 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-200 tracking-tight">
          Welcome Back
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full px-4 py-3 rounded-lg border text-black dark:text-gray-300 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-4 py-3 rounded-lg border text-black dark:text-gray-300 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {loginError && (
          <p className="mb-6 text-center text-red-600 font-medium">
            {loginError}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <div className="flex items-center gap-3 mt-6">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-400 text-sm">or</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-200">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>

        <div className="mt-8">
          <SocialLogin onGoogleLogin={handleGoogleSignIn} />
        </div>
      </form>
    </div>
  );
};

export default Login;
