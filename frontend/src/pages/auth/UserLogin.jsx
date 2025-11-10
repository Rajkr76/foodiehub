import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  

  const [forgot , setForgot] = useState(false);
  const forgot_password = ()=>{
    if(forgot){
     setForgot(true);
    }
  }
  {forgot && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-red-500/30 rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
        <div className="text-center">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Feature Not Available</h3>
          <p className="text-slate-400 text-sm mb-4">
            Forgot password functionality is currently not supported. Please contact support for assistance.
          </p>
          <button
            onClick={() => setForgot(false)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/login",{
        email,
        password
      }, { 
        withCredentials: true
      });
      
      console.log(response.data);
      alert('Login successful!');
      
      navigate('/');

    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with error status
        console.error('Error response:', error.response.data);
        alert(error.response.data.message || 'Login failed. Please check your credentials and try again.');
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
        alert('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        console.error('Error:', error.message);
        alert('Login failed. Please try again.');
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-500/10 relative overflow-hidden">

          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-slate-200 transition-colors mb-6 text-sm"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
              Customer Login
            </h1>
            <p className="text-slate-400 text-sm">Welcome back! Please sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-blue-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-blue-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-slate-300 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  
                  className="sr-only peer" 
                />
                <div className="w-4 h-4 border-2 border-blue-500/40 rounded bg-transparent mr-2 flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600 peer-checked:border-blue-500 hover:border-blue-500/60 transition-all duration-300">
                  <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Remember me
              </label>
              <h1 className="forgot text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors cursor-pointer">
                Forgot Password?
             </h1>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              Sign In to Account
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-blue-500/10">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/user/register"
                className="text-blue-400 font-medium hover:text-blue-300 transition-colors hover:underline"
              >
                Create Account
              </Link>
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Are you a restaurant owner?{' '}
              <Link 
                to="/foodpartner/login"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Partner Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;