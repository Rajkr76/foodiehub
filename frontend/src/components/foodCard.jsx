import React, { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

const foodCard = ({ name, image }) => {
  const [orderNumber, setOrderNumber] = useState(0);

  return (
    <div className="hero-content w-36 h-30 rounded-t-xl bg-green-300">
      <img loading="lazy" 
        src={image}
        alt={name}
        className="object-cover w-full h-full rounded-t-xl"
      />
     
      <div className="bg-slate-300 w-full h-10 flex flex-row rounded-b-xl justify-between items-center">
        <h1 className="px-2 py-1">{name}</h1>
        <SquareArrowOutUpRight size={20} color="#050505" className="mr-2" />
      </div>
      
    </div>
  );
};

export default foodCard;