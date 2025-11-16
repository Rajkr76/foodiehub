import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {X} from 'lucide-react'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom';
const Cart = () => {

  const [showpop, setShowpop] = useState(false);
  
  const navigate = useNavigate();
  const { state } = useLocation();

  const backtohome = () => navigate(-1);

  const isEmpty = state?.empty || false;

  return (
    <>
      <div className="h-10 flex items-center  text-black pl-3 pt-2">
        <ArrowLeft onClick={backtohome} />
        <h1 className=" text-red-400 p-2 rounded text-xl font-bold">Items in cart</h1>
      </div>
      {isEmpty ? (
        <div className="w-full h-80 mt-20 flex justify-center items-center rounded-lg">
          <div className="bg-green-400 rounded-2xl mx-5 w-full p-2">
            <h1 className="text-black font-bold text-2xl text-center font-mono">Your cart is empty!</h1>
            <h2 className="text-black text-center font-mono">Add items to your cart to see them here.</h2>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mt-5 bg-gray-100 p-4 rounded-xl">
            <img src={state?.image} className="w-full h-40 object-cover rounded-xl" />
            <h2 className="text-xl font-mono font-bold mt-2">{state?.name}</h2>
            <p className="text-sm mt-1">{state?.description}</p>
            <h3 className="mt-2 font-bold">Qty: {state?.number}</h3>
            <h3 className="mt-2 font-bold">Size: {state?.size}</h3>

            {/* Button to show popup */}
            <button
              onClick={() => setShowpop(true)}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
            >
              Add Address
            </button>

          </div>
          <Link to="/orderFood/payment">
          <div className=" px-10">
        <button className="w-full bg-green-400 h-12  rounded-xl font-mono font-bold text-lg active:bg-orange-500 transition duration-300 ease-in-out">Proceed to Pay</button>
      </div>
      </Link>
        </div>
      )}

      {/* POPUP */}
      {showpop && (
        <div className="fixed inset-0 bg-black/80 filter-blur flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-xl w-80 text-center  shadow-lg">
            {/* Close icon */}

              <X onClick={() => setShowpop(false)} className=" text-black w-full bg-slate-300 h-12 flex justify-end  items-center py-2 rounded-lg mb-5"/>

            <h1 className="text-xl font-bold mb-5">Address Details</h1>
            <input
              type="text"
              onChange={(e)=>
                e.target.value
              }
              placeholder="Enter your name"
              className="border w-full p-2 rounded-lg text-sm mb-4"
            />
            <input
              type="text"
              required
              onChange={(e)=>{
                e.target.value
              }}
              placeholder="Enter your phone number"
              className="border w-full p-2 rounded-lg text-sm mb-4"
            />
            <input
              type="text"
              required
              onChange={(e)=>{
                e.target.value
              }}
              placeholder="Enter your email address"
              className="border w-full p-2 rounded-lg text-sm mb-4"
            />
            <input
              type="text"
              required
              onChange={(e)=>{
                e.target.value
              }}
              placeholder="Enter your nearest Famous Landmark"
              className="border w-full p-2 rounded-lg text-sm mb-4"
            />
            <input
              type="text"
              required
              onChange={(e)=>{
                e.target.value
              }}
              placeholder="Enter your detail address"
              className="border w-full p-2 rounded-lg text-sm mb-4"
            />
           
          <button>
            <h1 className="w-full bg-green-400 px-10 text-white py-2 rounded-lg font-semibold" >Save Address</h1>
          </button>
          </div>
        </div>
        
      )}
      
      
      <div className="fixed bottom-0 left-0 w-full sm:static sm:mt-auto">
        <Footer />
      </div>
    </>
  );
};

export default Cart;
