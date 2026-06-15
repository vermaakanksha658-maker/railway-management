import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function Header() {
  const navigate = useNavigate()
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  console.log("isAuth:", isAuth);

  const handleProfile = () => {
    console.log("My Profile clicked");
    setShowMenu(false);
    if (user?.role === "admin") {
      navigate("/myprofileadmin");
    } else if (user?.role === "passenger") {
      navigate("/myprofilepassenger");
    } else {
      navigate("/");
    }
  };

  const handleDashboard = () => {
    setShowMenu(false);

    if (user?.role === "admin") {
      navigate("/admindashboard");
    } else if (user?.role === "passenger") {
      navigate("/passengerdashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <h3 className="font-bold text-gray-900" to="/">RailWayX</h3>

        <ul className="flex mx-auto space-x-4 gap-4">
          <Link className="text-gray-700 hover:text-blue-500" to="/">Home</Link>
          <Link className="text-gray-700 hover:text-blue-500" to="/about">About</Link>
          <Link className="text-gray-700 hover:text-blue-500" to="/alltrains">Trains</Link>
          <Link className="text-gray-700 hover:text-blue-500" to="/contact">Contact</Link>
        </ul>

        <div className="flex gap-2">
          {isAuth ?
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="bg-black text-white px-3 py-2 rounded">
                {user?.name || "Profile"}
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8  z-50">
                  <div className="min-w-[180px] bg-white rounded-md shadow-lg flex flex-col gap-3 p-4 text-sm text-gray-700">
                    <p className="cursor-pointer hover:text-teal-500" onClick={handleProfile}>My Profile</p>
                    <p className="cursor-pointer hover:text-teal-500" onClick={handleDashboard}>Dashboard</p>
                    <p className="cursor-pointer hover:text-red-500" onClick={() => { setShowMenu(false); dispatch(logout()); navigate("/") }}>Logout</p>
                  </div>
                </div>
              )}
            </div>
            :
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/login")} className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full font-semibold transition duration-200 shadow-sm">
                SIGN IN</button>
              <button onClick={() => navigate("/register")} className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full font-semibold transition duration-200 shadow-sm">
                CREATE ACCOUNT</button>
            </div>}
        </div>
      </div>
    </nav>
  );
}

export default Header;