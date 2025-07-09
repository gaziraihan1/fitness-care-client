import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAxios from '../../../Hooks/useAxios';


const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoginError('');

    signIn(email, password)
      .then((res) => {
        const loggedInUser = res.user;
    axiosInstance
    .post('/jwt', { email: loggedInUser.email })
      .then(response => {
        localStorage.setItem('access-token', response.data.token);
        navigate('/');
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
        axiosInstance.post('/jwt', { email: loggedInUser.email })
          .then(response => {
            localStorage.setItem('access-token', response.data.token);
            navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>

        <div className="mt-6">
          <SocialLogin onGoogleLogin={handleGoogleSignIn} />
        </div>
      </form>
    </div>
  );
};

export default Login;
