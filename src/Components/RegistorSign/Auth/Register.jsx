import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../PrivateRouter/AuthContext';
import Logo from '../../Logo';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const registerForm = useRef(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const password1 = formData.get('password1');
    const password2 = formData.get('password2');

    if (password1 !== password2) {
      setError('Passwords do not match!');
      return;
    }

    const userInfo = { name, email, password1 };

    try {
      await registerUser(userInfo);
      navigate('/Sign'); // Navigate to '/Sign' upon successful registration
    } catch (error) {
      setError(error.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 py-12 px-4 sm:px-6 lg:px-8 w-[100vw]">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Logo/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-800">Create an account</h2>
        </div>
        <form ref={registerForm} onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password1" className="sr-only">Password</label>
              <input
                id="password1"
                name="password1"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password2" className="sr-only">Confirm Password</label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-red-800">
          Already have an account?{' '}
          <Link to="/Sign" className="font-medium text-red-600 hover:text-red-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
