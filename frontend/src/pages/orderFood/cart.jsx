import React from 'react'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const cart = () => {

    const navigate = useNavigate();
    const backtohome = ()=>{
        navigate(-1);
    }

    const [number, setNumber] = useState(0);

    const is_empty = true; 
  return (
   <>
   <div className=" h-10 flex items-center text-white  pl-3 pt-2 ">
           <ArrowLeft onClick={backtohome} />
     </div>

     <div className="bg-red-400">
        <h1 className='text-black font-mono text-2xl font-bold'>Cart is Empty</h1>
     </div>
   </>
  )
}

export default cart