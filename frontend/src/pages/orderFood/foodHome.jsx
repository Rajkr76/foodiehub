import React, { useState } from "react";
import { CircleUserRound, Search, ArrowLeft, CircleMinus, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FoodCard from "../../components/foodCard";
import Footer from "../../components/footer";

const FoodHome = () => {
  const navigate = useNavigate();

  const backToProfile = () => navigate(-1);

  const foods = [
    { name: "Burger", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "French Fries", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
  ];

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="h-16 w-full flex justify-between items-center">
          <ArrowLeft size={24} color="#121212" className="ml-3" onClick={backToProfile} />
          <h1 className="ml-4 text-red-400 p-2 rounded text-xl font-bold">FoodhieHub</h1>
          <CircleUserRound size={32} className="mr-4" />
        </nav>

        <hr className="text-slate-300" />

        {/* Search */}
        <div className="w-auto h-10 mx-4 my-4 rounded flex items-center justify-center bg-slate-300">
          <input
            type="text"
            className="h-10 w-full px-3 my-4 rounded text-[#000000] font-base"
            placeholder="Search for food"
          />
          <Search size={24} color="#5e5e5e" className="mr-4" />
        </div>

        {/* Food Cards */}
        <div className="flex flex-wrap flex-row gap-2 justify-between p-1 mx-3 h-[60vh] ">
          {foods.map((item, index) => (
            <FoodCard key={index} name={item.name} image={item.image} />
          ))}
        </div>
      </div>
      <div className=" flex w-auto rounded-xl justify-center items-center "><h1 className="bg-green-400 rounded-xl w-30 text-center p-2 text-white mb-3">load more</h1>
      </div>

      < Footer />
    </>
  );
};

export default FoodHome;