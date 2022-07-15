//import react from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:productId' element={<ProductScreen />} />
        <Route path='/cart/:productId' element={<CartScreen />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
