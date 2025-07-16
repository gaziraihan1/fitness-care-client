import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
  useEffect(() => {
      document.title = "Fitness Care | Register";
    }, []);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle,logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

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
                logOut()
                .then(() => {
                  navigate('/login');
                  
                })
                reset();

                
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
        axiosSecure.post('/jwt', { email: loggedInUser.email })
          .then(response => {
            localStorage.setItem('access-token', response.data.token);
            navigate(location.state ? location.state : "/")
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 py-12">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-gray-200"
  >
    <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
      Create an Account
    </h2>

    <div className="mb-6">
      <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
        Name <span className="text-red-500">*</span>
      </label>
      <input
        id="name"
        type="text"
        {...register('name', { required: 'Name is required' })}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors.name ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
        placeholder="Your full name"
      />
      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
    </div>

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
      <label htmlFor="photoURL" className="block mb-2 text-sm font-semibold text-gray-700">
        Photo URL
      </label>
      <input
        id="photoURL"
        type="text"
        {...register('photoURL')}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Optional"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        id="password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Minimum 6 characters required' },
        })}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors.password ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
        placeholder="Create a password"
      />
      {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
    </div>

    {firebaseError && (
      <p className="mb-6 text-center text-red-600 font-medium">{firebaseError}</p>
    )}

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
    >
      Register
    </button>

    <p className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:underline font-semibold">
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
