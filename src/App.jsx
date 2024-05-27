import React from 'react'
import Loginpage from './components/Loginpage/Loginpage'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

  )
}

export default App
