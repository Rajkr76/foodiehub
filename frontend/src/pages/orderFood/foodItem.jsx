import React, { useState } from 'react'
import Footer from '../../components/footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Star } from 'lucide-react'
import { Minus } from 'lucide-react'
import { Plus } from 'lucide-react'


const FoodItem = () => {
  const [number, setNumber] = useState(0);
  const [size, setSize] = useState("");
  const decrement = () => {
    if (number > 0) {
      setNumber(number - 1)
    }
  }
  const increment = () => {
    if (number >= 0) {
      setNumber(number + 1)
    }
    ;
  }
  const addToCart = () => {
      if (number >= 1 && size !== "") {
        navigate("/cart", {
          state: {
            number,
            name,
            image,
            description,
            size,
          }
        });
      } else {
        navigate("/cart", {
          state: { empty: true }
        });
      }
    };

  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, image, description,rating} = state || {};
  const backtofoodhome = () => {
    navigate(-1);

  }
  return (
    <div className='h-screen '>
      <div className=" h-10 flex items-center  pl-3 pt-2 ">
        <ArrowLeft onClick={backtofoodhome} />
      </div>
      <div className=" h-130 w-full px-3  flex flex-col gap-2  justify-center items-center ">
        <div className=" w-full h-70 rounded-3xl ">
          <img src={image} className='object-cover w-full h-full rounded-3xl' />
        </div>
        <div className=" w-full">
          <h1 className='text-black font-mono  px-2 text-xl font-bold'>{name}</h1>
        </div>
        <div className=" h-3 w-full flex items-center text-center gap-2 px-2">
          <Star size={16} />
          <h1 className='text-base font-mono'>{rating}</h1>
          <h1 className='text-[12px] text-center text-slate-900 font-mono'>20min </h1>
        </div>
        <h1 className='text-sm text-[#2d2d2d]  font-serif mt-2 h-20 w-full px-2 text-justifyoverflow-hidden'>{description}</h1>
        <div className=" p-1 rounded-xl w-full flex justify-evenly items-center ">
          <select name="size" id="size" className='h-10 w-35   bg-orange-500 rounded-xl px-2 font-mono' value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="Select Size">Select Size
            </option>
            <option value="full">full</option>
            <option value="medium">medium</option>
            <option value="half">half</option>
          </select>
          <Minus className='bg-green-400  rounded-xl' onClick={decrement} />
          <h1>{number}</h1>
          <Plus className='bg-green-400  rounded-xl' onClick={increment} />
        </div>


        <div className="bg-yellow-400 w-full h-12 flex justify-center items-center mt-5 rounded-xl">

          <button
            onClick={addToCart}
            className='text-black w-full h-12 rounded-xl font-mono font-bold text-lg active:bg-green-400 transition duration-300 ease-in-out'
          >
            Add to cart
          </button>

        </div>

      </div>
      <div className="fixed bottom-0 left-0 w-full sm:static sm:mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default FoodItem