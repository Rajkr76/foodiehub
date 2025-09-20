import React from 'react'

const createfood = () => {

    const isDarkMode = true;
  
  return (
    <div className= {`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} min-h-screen`}>createfood</div>
  )
}

export default createfood