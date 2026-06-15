import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './component/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import SearchTrain from './pages/Searchtrain'
import Contact from './pages/Contact'
import Admindashboard from './pages/Admindashboard'
import AddTrain from './component/AddTrain'
import ManageTrains from './component/ManageTrain'
import Edit from './component/Edit'
import TotalBookings from './component/TotalBookings'
import TotalUsers from './component/TotalUsers'
import BookTicket from './pages/BookingTicket'
import MyBookings from './component/MyBookings'
import Myprofileadmin from './pages/Myprofileadmin'
import Myprofilepassenger from './pages/Myprofilepassenger'
import Passengersdashboard from './pages/Passengersdashboard'
import Footer from './component/Footer'
import Trains from './pages/Trains'
import TotalWaiting from './component/TotalWaiting'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search-train" element={<SearchTrain />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/passengerdashboard" element={<Passengersdashboard />} />
          <Route path="/myprofileadmin" element={<Myprofileadmin />} />
          <Route path="/myprofilepassenger" element={<Myprofilepassenger />} />
          <Route path="/addTrain " element={<AddTrain />} />
          <Route path="/manageTrain " element={<ManageTrains />} />
          <Route path="/totalUsers " element={<TotalUsers />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/totalBookings " element={<TotalBookings />} />
          <Route path="/totalWaiting " element={<TotalWaiting waiting={true} />} />
          <Route path="totalUsers " element={<TotalUsers />} />
          <Route path="bookings" element={<BookTicket />} />
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="/alltrains" element={<Trains />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
