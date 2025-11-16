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
  {
    name: "Classic Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    description: "Juicy panner patty layered with cheese, lettuce, tomato, and house sauce in a toasted bun.",
    rating: 4.8
  },
  {
    name: "Crispy French Fries",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=800",
    description: "Golden, crispy fries lightly salted and served with tangy tomato ketchup.",
    rating: 4.6
  },
  {
    name: "Margherita Pizza",
    image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg",
    description: "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves.",
    rating: 4.9
  },
  {
    name: "Grilled Sandwich",
    image: "https://images.pexels.com/photos/16119654/pexels-photo-16119654.jpeg",
    description: "Toasted sandwich filled with veggies, cheese, and special mint chutney.",
    rating: 4.5
  },
  {
    name: "Pasta Alfredo",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800",
    description: "Creamy white sauce pasta tossed with garlic, cheese, and fresh herbs.",
    rating: 4.7
  },
  {
    name: "Tacos",
    image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
    description: "Soft tortillas filled with spiced chicken, salsa, and fresh veggies.",
    rating: 4.6
  },
  {
    name: "Sushi Rolls",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    description: "Delicate sushi rolls wrapped in seaweed with salmon, rice, and avocado.",
    rating: 4.8
  },
  {
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    description: "Moist chocolate cake layered with fudge icing and topped with chocolate shavings.",
    rating: 4.9
  },
  {
    name: "Caesar Salad",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    description: "Fresh lettuce with creamy Caesar dressing, croutons, and grated cheese.",
    rating: 4.3
  },
  {
    name: "Ice Cream Sundae",
    image: "https://images.pexels.com/photos/30648974/pexels-photo-30648974.jpeg",
    description: "Vanilla and chocolate scoops topped with caramel syrup, nuts, and whipped cream.",
    rating: 4.7
  },
  {
    name: "Chicken Biryani",
    image: "https://images.pexels.com/photos/10219670/pexels-photo-10219670.jpeg",
    description: "Aromatic basmati rice cooked with tender chicken and Indian spices.",
    rating: 4.8
  },
  {
    name: "Veggie Wrap",
    image: "https://images.unsplash.com/photo-1630409355647-c19e4b2b5a52?auto=format&fit=crop&q=80&w=800",
    description: "Whole wheat wrap filled with fresh vegetables, hummus, and sauces.",
    rating: 4.4
  },
  {
    name: "Falafel Platter",
    image: "https://images.unsplash.com/photo-1590080875831-5fe0a4f1a1f2?auto=format&fit=crop&q=80&w=800",
    description: "Crispy falafel balls served with pita bread, hummus, and salad.",
    rating: 4.5
  },
  {
    name: "Momos",
    image: "https://images.unsplash.com/photo-1626074353765-3d868a6b4d59?auto=format&fit=crop&q=80&w=800",
    description: "Steamed dumplings filled with spiced veggies or chicken and served with chili sauce.",
    rating: 4.6
  },
  {
    name: "Pancakes",
    image: "https://images.unsplash.com/photo-1604909053002-dc50e59b90d7?auto=format&fit=crop&q=80&w=800",
    description: "Fluffy pancakes served with maple syrup and fresh fruits.",
    rating: 4.7
  },
  {
    name: "Spring Rolls",
    image: "https://images.unsplash.com/photo-1632776437878-ec9c0e9a0372?auto=format&fit=crop&q=80&w=800",
    description: "Crispy fried rolls stuffed with seasoned vegetables and noodles.",
    rating: 4.4
  },
  {
    name: "Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1553531888-a0aefbfc6f1b?auto=format&fit=crop&q=80&w=800",
    description: "Thick smoothie bowl topped with granola, chia seeds, and fresh fruits.",
    rating: 4.5
  },
  {
    name: "Samosa",
    image: "https://images.unsplash.com/photo-1617196035326-6d4e97c87e8b?auto=format&fit=crop&q=80&w=800",
    description: "Crispy golden pastry filled with spiced potatoes and peas.",
    rating: 4.3
  },
  {
    name: "Cupcake",
    image: "https://images.unsplash.com/photo-1607977011497-dc07f9eae24a?auto=format&fit=crop&q=80&w=800",
    description: "Soft, moist cupcake topped with creamy frosting and sprinkles.",
    rating: 4.6
  },
  {
    name: "Donuts",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800",
    description: "Glazed donuts with chocolate and strawberry toppings for a sweet treat.",
    rating: 4.7
  },
  {
    name: "Cupcake",
    image: "https://images.unsplash.com/photo-1607977011497-dc07f9eae24a?auto=format&fit=crop&q=80&w=800",
    description: "Soft, moist cupcake topped with creamy frosting and sprinkles.",
    rating: 4.6
  }
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
        <div className="w-auto h-10 ml-4 mr-4 my-4 rounded flex items-center justify-center bg-slate-300">
          <input
            type="text"
            className="h-10 w-full px-3 my-4 rounded text-[#000000] font-base"
            placeholder="Search for food"
          />
          <Search size={24} color="#5e5e5e" className="mr-4 " />
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-2 grid-rows-2 pb-24  w-full my-4 px-4 gap-y-14 gap-x-4 transition-all duration-500 ease-in-out sm:grid-cols-3 md:grid-cols-4">
          {foods.slice(0, loadmore).map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/fooditem", { state: item })} // sends data to FoodItem
              className="cursor-pointer"
            >
              <FoodCard name={item.name} image={item.image} />
            </div>
          ))}
        </div>

        {loadmore < foods.length && (
          <div className=" flex w-auto rounded-xl justify-center items-center h-0 ">
            
            <h1 className="bg-green-400 rounded-xl w-30 text-center p-2  text-white mb-15 z-20" onClick={loadMore}>load more

            </h1>
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