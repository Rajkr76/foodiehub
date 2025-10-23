import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChooseRegister from '../pages/auth/ChooseRegister'
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import Home from '../pages/general/Home'
import Profile from '../components/profile'
import Createfood from '../pages/food/createfood'
import UploadProfile from '../components/uploadProfile'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ChooseRegister />} />
        
        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        
        {/* Food Partner Routes */}
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />

        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/createfood" element={<Createfood/>}/>
        <Route path="/store/:storeId" element={<Profile />} />
        <Route path="/profile/:storeId" element={<UploadProfile />} />
        
      </Routes>
    </Router>
  )
}

export default AppRoutes