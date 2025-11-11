import React, { useState } from "react";
import { CircleUserRound, Search, ArrowLeft, CircleMinus, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FoodCard from "../../components/foodCard";
import Footer from "../../components/footer";

const FoodHome = () => {
  const navigate = useNavigate();
  const [loadmore, setLoadMore] = useState(4);
  const backToProfile = () => navigate(-1);

  const loadMore = () => {
    setLoadMore((prev) => prev + 20);
  };

  const foods = [
    { name: "Burger", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "French Fries", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
    { name: "Sandwich", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=80&w=688" },
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
        <div className="grid grid-cols-2 grid-rows-2 pb-24  gap-5 mx-4 my-4 px-1 gap-y-14 transition-all duration-500 ease-in-out sm:grid-cols-3 md:grid-cols-4">
          {foods.slice(0, loadmore).map((item, index) => (
            <FoodCard key={index} name={item.name} image={item.image} />
          ))}
        </div>

        {loadmore < foods.length && (
          <div className=" flex w-auto rounded-xl justify-center items-center h-3"><h1 className="bg-green-400 rounded-xl w-30 text-center p-2 text-white mb-3" onClick={loadMore}>load more</h1>
          </div>
        )}

        <div className="fixed bottom-0 left-0 w-full sm:static sm:mt-auto">
          <Footer />
        </div>
      </div>


    </>
  );
};
export default FoodHome;