import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SocialLogin from '../SocialLogin/SocialLogin';


const Login = () => {
  useEffect(() => {
      document.title = "Fitness Care | Login";
    }, []);
  const { signIn, signInWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const location = useLocation();

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoginError('');

    signIn(email, password)
      .then((res) => {
        const loggedInUser = res.user;
    axiosSecure.post('/jwt', { email: loggedInUser.email })
      .then(response => {
        localStorage.setItem('access-token', response.data.token);
        navigate(location.state ? location.state : "/");
      });
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    setLoginError('');

   signInWithGoogle()
  .then(res => {
    const loggedInUser = res.user;

    const userInfo = {
      name: loggedInUser.displayName,
      email: loggedInUser.email,
      photoURL: loggedInUser.photoURL,
      role: 'member',
    };

    axiosSecure.post('/users', userInfo)
      .then(() => {
        axiosSecure.post('/jwt', { email: loggedInUser.email })
          .then(response => {
            localStorage.setItem('access-token', response.data.token);
            navigate(location.state ? location.state : "/");
          })
          .catch(() => {
            setLoginError('Failed to get JWT token');
          });
      })
      .catch(() => {
        setLoginError('Failed to save user info');
      });
  })
  .catch(err => {
    setLoginError(err.message);
  });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 py-12">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-gray-200"
  >
    <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
      Welcome Back
    </h2>

    <div className="mb-6">
      <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        id="email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors.email ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
        placeholder="you@example.com"
      />
      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        id="password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors.password ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
        placeholder="Enter your password"
      />
      {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
    </div>

    {loginError && (
      <p className="mb-6 text-center text-red-600 font-medium">{loginError}</p>
    )}

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
    >
      Login
    </button>

    <p className="mt-6 text-center text-sm text-gray-600">
      Don’t have an account?{' '}
      <Link to="/register" className="text-blue-600 hover:underline font-semibold">
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
