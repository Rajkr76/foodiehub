import React from 'react'
import { House } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { FileChartColumn } from 'lucide-react'
import { User } from 'lucide-react'
const footer = () => {
  return (
    <div>
        <div className="bg-red-400 h-16 flex justify-between items-center px-5 fixed bottom-0 w-full ">
        <House />
        <ShoppingCart />
        <FileChartColumn />
        <User />
        </div>
    </div>
  )
}

export default footer