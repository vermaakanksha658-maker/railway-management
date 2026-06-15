import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookTicket from "./BookingTicket";
import MyBookings from "../component/MyBookings";
import SearchTrain from "./Searchtrain";

function AdminDashboard() {

  const [activeSection, setActiveSection] = useState(null);
  const [showCards, setShowCards] = useState(true);

  return (

    <div className="w-full flex">
      <div className="w-70">
        <div className="flex flex-col px-8 py-8 gap-4">

          <Link to="#" onClick={() => { setActiveSection(null); setShowCards(true); }} className="text-gray-600 hover:text-blue-500"> Dashboard </Link>
          <Link to="/myprofilepassenger" onClick={() => { setActiveSection("myprofilepassenger"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500">Profile</Link>
          <Link to="/bookings" onClick={() => { setActiveSection("bookings"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500">Book Ticket</Link>
          <Link to="/mybookings" onClick={() => { setActiveSection("myBookings"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> My Bookings </Link>
          <Link to="/search-train" onClick={() => { setActiveSection("search-train"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> Search Train </Link>

        </div>
      </div>

      <div className="w-full">
        {showCards && (
          <div className="py-10">
            <div className="grid grid-cols-3 gap-10 w-full mx-auto px-2">

              <div onClick={() => { setActiveSection("search-train"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600"> Search Train </h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

              <div onClick={() => { setActiveSection("bookings"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600"> Book Ticket</h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

              <div onClick={() => { setActiveSection("myBookings"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600"> My Bookings </h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

            </div>
          </div>
        )}

        {activeSection === "search-train" && <SearchTrain />}
        {activeSection === "bookings" && <BookTicket />}
        {activeSection === "myBookings" && <MyBookings />}
        
      </div>
    </div>
  );
}

export default AdminDashboard;