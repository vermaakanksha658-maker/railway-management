import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddTrain from "../component/AddTrain";
import ManageTrain from "../component/ManageTrain";
import TotalUsers from "../component/TotalUsers";
import TotalBookings from "../component/TotalBookings";
import TotalWaiting from "../component/TotalWaiting";

function AdminDashboard() {

  const [activeSection, setActiveSection] = useState(null);
  const [showCards, setShowCards] = useState(true);

  return (

    <div className="w-full flex">
      <div className="w-70">
        <div className="flex flex-col px-8 py-8 gap-4">

          <Link to="#" onClick={() => { setActiveSection(null); setShowCards(true); }} className="text-gray-600 hover:text-blue-500"> Dashboard </Link>
          <Link to="#" onClick={() => { setActiveSection("addTrain"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> Add Train</Link>
          <Link to="#" onClick={() => { setActiveSection("manageTrain"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> Manage Trains</Link>
          <Link to="#" onClick={() => { setActiveSection("totalUsers"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> Total Users </Link>
          <Link to="#" onClick={() => { setActiveSection("totalBookings"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> Total Bookings </Link>
          <Link to="#" onClick={() => { setActiveSection("totalWaiting"); setShowCards(false); }} className="text-gray-600 hover:text-blue-500"> Total Waiting </Link>

        </div>
      </div>

      <div className="w-full">

        {showCards && (

          <div className="py-10">
            <div className="grid grid-cols-5 gap-10 w-full mx-auto px-2">

              <div onClick={() => { setActiveSection("addTrain"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600">Add Train</h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

              <div onClick={() => { setActiveSection("manageTrain"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer" >
                <h4 className="text-2xl font-bold text-black-600"> Manage Trains </h4>
                <p className="text-gray-600 hover:text-red-500"> View detail</p>
              </div>

              <div onClick={() => { setActiveSection("totalUsers"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600"> Total Users</h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

              <div onClick={() => { setActiveSection("totalBookings"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600"> Total Bookings </h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

              <div onClick={() => { setActiveSection("totalWaiting"); setShowCards(false); }} className="shadow p-6 rounded-xl cursor-pointer">
                <h4 className="text-2xl font-bold text-black-600"> Total Waiting  </h4>
                <p className="text-gray-600 hover:text-red-500"> View detail </p>
              </div>

            </div>
          </div>
        )}

        {activeSection === "addTrain" && <AddTrain />}
        {activeSection === "manageTrain" && <ManageTrain />}
        {activeSection === "totalUsers" && <TotalUsers />}
        {activeSection === "totalBookings" && <TotalBookings />}
        {activeSection === "totalWaiting" && <TotalWaiting waiting={true} />}

      </div>
    </div>

  );
}

export default AdminDashboard;