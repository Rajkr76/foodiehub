import React from 'react';
import { Link } from 'react-router-dom';
import DotGrid from '../../components/DotGrid';
import { UserRound } from 'lucide-react';
import { UsersRound } from 'lucide-react';


const ChooseRegister = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900  to-slate-900 flex items-center justify-center p-4 font-sans">
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <DotGrid className='hidden sm:block'
            dotSize={7}
            gap={15}
            baseColor="#24344f"
            activeColor="#17e841"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        <div className=" w-full max-w-md mx-auto">
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-blue-500/10 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                Welcome to FoodieHub
              </h1>
            </div>

            {/* User Type Cards */}
            <div className="space-y-4 mb-8">
              {/* Customer Card */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-200 to-slate-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl"><UserRound /></span>
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
              {/* Footer */}
              <div className="text-center pt-6 border-t border-orange-500/10 mt-6">
                <p className="text-slate-400 text-sm">
                  New to FoodieHub?{' '}
                  <Link
                    to="/foodpartner/register"
                    className="text-orange-400 font-medium hover:text-orange-300 transition-colors hover:underline"
                  >
                    Join as Partner
                  </Link>
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Looking to order food?{' '}
                  <Link
                    to="/user/login"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Customer Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseRegister;