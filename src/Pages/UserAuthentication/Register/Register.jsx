import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxios from '../../../Hooks/useAxios';

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [firebaseError, setFirebaseError] = useState('');

  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;
    setFirebaseError('');

    if (password.length < 6) {
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL })
          .then(() => {
            const userInfo = {
              name,
              email,
              photoURL,
              role: 'member',
            };

            axiosSecure.post('/users', userInfo)
              .then(() => {
                reset();
                navigate('/');
              });
          });
      })
      .catch(err => {
        setFirebaseError(err.message);
      });
  };

  const handleGoogleSignIn = () => {

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
          });
      })
      .catch(() => {
      });
  })
  .catch(() => {
  });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

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
          <label className="block mb-1 text-sm font-medium">Photo URL</label>
          <input
            type="text"
            {...register('photoURL')}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters required' },
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {firebaseError && <p className="text-red-500 text-sm mb-4">{firebaseError}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>

        <div className="mt-6">
          <SocialLogin onGoogleLogin={handleGoogleSignIn} />
        </div>
      </form>
    </div>
  );
};

export default Register;
