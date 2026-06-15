import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">About RailWayX</h2>
        <p className="text-gray-500 mt-2"> Smart Railway Management System for easy and secure travel </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
        <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3" className="rounded-lg shadow-lg" alt="train" />

        <div>
          <h4 className="text-xl font-semibold mb-3">Our Platform</h4>
          <p className="text-gray-600 mb-3">
            RailWayX is a modern railway management system designed to provide
            seamless train booking, schedule tracking, and passenger management.
            Our goal is to make railway services digital, secure, and user-friendly.
          </p>
          <p className="text-gray-600">
            Passengers can easily search trains, book tickets, and manage their
            travel plans. Admin and employees can manage trains, schedules,
            and passengers efficiently.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h4 className="text-2xl font-bold mb-6">Our Features</h4>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: "Online Booking",
              desc: "Book train tickets easily anytime.",
            },
            {
              title: "Train Schedule",
              desc: "Check train timings and availability.",
            },
            {
              title: "Secure System",
              desc: "Safe login and authentication.",
            },
            {
              title: "Fast Performance",
              desc: "Quick and responsive platform.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h6 className="font-semibold">{feature.title}</h6>
              <p className="text-sm text-gray-500 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-12">
        <h4 className="text-2xl font-bold mb-3">Our Mission</h4>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Our mission is to digitalize railway services and provide a smooth,
          efficient, and secure railway experience for passengers and railway staff.
        </p>
      </div>

      <div className="grid md:grid-cols-3 text-center gap-6">
        <div>
          <h3 className="text-3xl font-bold text-blue-500">10K+</h3>
          <p className="text-gray-600">Passengers</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-500">500+</h3>
          <p className="text-gray-600">Trains</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-500">24/7</h3>
          <p className="text-gray-600">Support</p>
        </div>
      </div>

    </div>
  );
}

export default About;