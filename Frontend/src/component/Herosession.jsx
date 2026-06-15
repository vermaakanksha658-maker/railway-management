import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[85vh] w-full">
      <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3" alt="railway" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex items-center justify-center min-h-[85vh] text-center px-4">
        <div className="max-w-2xl">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4"> Book Train Tickets Easily  </h2>
          <p className="text-gray-200 mb-6 text-sm sm:text-base"> Search trains between stations, check availability, and reserve your seat quickly and securely.</p>
          <button onClick={() => navigate("/search-train")} className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300">Search Train</button>
        </div>
      </div>
    </div>
  );
}
export default HeroSection;