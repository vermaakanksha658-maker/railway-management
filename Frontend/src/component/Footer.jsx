import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">RailWayX </h2>
          <p className="text-sm">
            Smart Railway Management System for easy ticket booking,
            train tracking, and secure travel experience.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/trains" className="hover:text-white">Trains</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Online Booking</li>
            <li>Train Schedule</li>
            <li>Secure Payment</li>
            <li>24/7 Support</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Lucknow, India 🇮🇳</p>
          <p className="text-sm">support@railwayx.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm">© {new Date().getFullYear()} RailWayX. All rights reserved.</div>
    </footer>
  );
}

export default Footer;