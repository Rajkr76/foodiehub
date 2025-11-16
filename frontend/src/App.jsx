import React from 'react'
import AppRoutes from './routes/AppRoutes'

const App = () => {

  oncontextmenu="return false;"

  return (
    <>
    <div onContextMenu={(e) => e.preventDefault()}>
      <AppRoutes />
    </div>
      
    </>
  )
}

export default App