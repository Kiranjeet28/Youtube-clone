import React, { useEffect, useRef,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../PrivateRouter/AuthContext';
import Logo from '../../Logo';
const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser, LoginWithGoogle } = useAuth();
  const loginForm = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  // Handle the Google Button 
  const SigninWithGoogle = async() => {
    try {
      await LoginWithGoogle();
      navigate('/'); 
    } catch (error) {
      setError(error.message || 'An error occurred during Login .');
    }
  }

  // Form submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    try {
      await loginUser(userInfo);
      navigate('/Sign'); 
    } catch (error) {
      setError(error.message || 'An error occurred during registration.');
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 py-12 px-4 sm:px-6 lg:px-8 w-[100vw]">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Logo/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-800">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} ref={loginForm}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: lock-closed */}
                <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M4 8V6a4 4 0 118 0v2h1a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a1 1 0 011-1h1zm3-2v2h4V6a2 2 0 00-4 0z" />
                </svg>
              </span>
              Sign in
            </button>
          <button
          className="flex items-center justify-center mt-2 bg-white text-gray-700 rounded-md shadow-md py-2 px-4 mb-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[26.5vw] font-mono "
          onClick={SigninWithGoogle}>
          <img src="https://th.bing.com/th/id/OIP.7aFwzaoZuyYDexTRuFM1AQHaHa?rs=1&pid=ImgDetMain" alt="Google Logo" className="w-6 h-6 mr-2" />
          <span>Sign in with Google</span>
        </button>
            {error && (
                <p className="text-red-600 text-sm mb-4">{error}</p>
              )}
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-red-800">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
