import React from 'react'
import { ArrowLeft } from 'lucide-react';
import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   
import { CheckLine } from 'lucide-react';

const payment = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10);

  const backToHome = () => {
    navigate(-1);
  };

    useEffect(() => {
        if(timer==0){
            navigate("/foodhome");
            return;
        }
      const interval = setInterval(()=>{
        setTimer((prev) => prev - 1);
      },1000);

      return ()  => clearInterval(interval);
    }, [timer])
    
  return (
    <div className='bg-green-400 h-screen'>
        <div className="h-10 flex items-center  text-black pl-3 pt-2">
                <ArrowLeft onClick={backToHome} />
              </div>
             
        <div className="gap-4 w-full h-screen px-2 flex flex-col justify-center items-center rounded-xl " >

             <CheckLine size={80} />
            <h1 className="text-black font-mono font-bold text-xl px-1">
               payment done successfully. 
            </h1>
            
            <h1 className="px-5 text-justify text-black font-mono  text-base">
                Click to back or stay here to automatically redirect to food home page in next <span className='text-lg text-white'>{timer}</span> seconds
            </h1>
            
        </div>
      

    </div>
  )
}

export default payment