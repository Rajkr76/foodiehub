import React from 'react'
import  { useNavigate } from 'react-router-dom';

const Home = () => {
    const isDarkMode = true;
    const navigate = useNavigate();

    React.useEffect(() => {
        const isSignedIn = document.cookie.split(';').some(cookie => cookie.trim().startsWith('token='));
        if (!isSignedIn) {
            navigate("/register");
        }
    }, []);
    
  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen `}>
      Home
    </div>
  )
}

export default Home

