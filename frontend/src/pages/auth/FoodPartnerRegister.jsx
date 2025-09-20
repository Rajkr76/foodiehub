import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

   const response = await axios.post('http://localhost:3000/api/auth/food-partner/register', {
      businessName,
      contactName,
      email,
      phone,
      address,
      password

    }, {
       withCredentials:true } )
    .then((response) => {
      console.log(response.data);
      alert('Registration successful!');
      navigate('/createfood');
    })
    .catch((error) => {
      console.error(error);
      alert('Registration failed. Please try again.(check your form details)');
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-500/10 relative overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-red-600"></div>

          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-slate-200 transition-colors mb-6 text-sm"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🍽️</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent mb-2">
              Join as Partner
            </h1>
            <p className="text-slate-400 text-sm">Grow your restaurant business with FoodieHub</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-orange-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
                placeholder="Enter your restaurant name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">contact Name</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-orange-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
                placeholder="Enter owner's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Business Email</label>
              <input
                type="email"
                id="email"
                name="email"
               
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-orange-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
                placeholder="Enter business email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-orange-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
                placeholder="Enter restaurant phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Restaurant Address</label>
              <textarea
                id="address"
                name="address"
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-orange-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 hover:border-orange-500/50 transition-all duration-300 min-h-20 max-h-28 resize-y"
                placeholder="Enter complete restaurant address"
                rows="3"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 text-sm font-medium ml-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
              
                className="w-full px-4 py-3.5 bg-slate-900/80 border-2 border-orange-500/30 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="mt-6">
              <label className="flex items-start text-slate-300 text-sm cursor-pointer">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms"
                    name="Terms"
                   
                    className="sr-only peer" 
                    required 
                  />
                  <div className="w-4 h-4 border-2 border-orange-500/40 rounded bg-transparent mr-3 flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-red-600 peer-checked:border-orange-500 hover:border-orange-500/60 transition-all duration-300 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="leading-5">
                  I agree to the <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Partner Agreement</a>, <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Terms of Service</a> and <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-6 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              Start Partnership Journey
            </button>
          </form>

         

          {/* Footer */}
          <div className="text-center pt-6 border-t border-orange-500/10 mt-6">
            <p className="text-slate-400 text-sm">
              Already have a partner account?{' '}
              <Link 
                to="/foodpartner/login"
                className="text-orange-400 font-medium hover:text-orange-300 transition-colors hover:underline"
              >
                Sign In
              </Link>
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Looking to order food?{' '}
              <Link 
                to="/user/register"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create Customer Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;