import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-500/10 relative overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome to FoodieHub
            </h1>
            <p className="text-slate-400 text-sm">Choose your account type to continue</p>
          </div>

          {/* User Type Cards */}
          <div className="space-y-4 mb-8">
            {/* Customer Card */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🛍️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">Customer</h3>
                  <p className="text-slate-400 text-sm">Order delicious food</p>
                </div>
              </div>
              <div className="space-y-3">
                <Link 
                  to="/user/login"
                  className="w-full block py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl text-center hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  to="/user/register"
                  className="w-full block py-3 px-4 bg-slate-900/80 border-2 border-blue-500/30 text-slate-200 font-medium rounded-xl text-center hover:bg-slate-900/90 hover:border-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Create Account
                </Link>
              </div>
            </div>

            {/* Food Partner Card */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100">Food Partner</h3>
                  <p className="text-slate-400 text-sm">Grow your restaurant business</p>
                </div>
              </div>
              <div className="space-y-3">
                <Link 
                  to="/foodpartner/login"
                  className="w-full block py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl text-center hover:from-orange-600 hover:to-red-700 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Partner Login
                </Link>
                <Link 
                  to="/foodpartner/register"
                  className="w-full block py-3 px-4 bg-slate-900/80 border-2 border-orange-500/30 text-slate-200 font-medium rounded-xl text-center hover:bg-slate-900/90 hover:border-orange-500/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Join as Partner
                </Link>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-4">Why choose FoodieHub?</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-400 text-sm">⚡</span>
                </div>
                <p className="text-xs text-slate-400">Fast Delivery</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-400 text-sm">🔒</span>
                </div>
                <p className="text-xs text-slate-400">Secure</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-400 text-sm">⭐</span>
                </div>
                <p className="text-xs text-slate-400">Quality Food</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;