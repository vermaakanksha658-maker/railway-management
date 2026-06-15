import React, { useState } from "react";

function Booking() {
  const [passengers, setPassengers] = useState([]);
  const [form, setForm] = useState({ trainNo: "", name: "", age: "", source: "", destination: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookTicket = () => {
    setPassengers([...passengers, form]);
    setForm({ trainNo: "", name: "", age: "", source: "", destination: "" });
  };

  const cancelTicket = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Railway Reservation System</h2>
      <input name="trainNo" placeholder="Train Number" value={form.trainNo} onChange={handleChange}
      /><br /><br />
      <input name="name" placeholder="Passenger Name" value={form.name} onChange={handleChange}
      /><br /><br />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange}
      /><br /><br />
      <input name="source" placeholder="Source" value={form.source} onChange={handleChange}
      /><br /><br />
      <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange}
      /><br /><br />
      <button onClick={bookTicket}>Book Ticket</button>
      <h3>Passenger List</h3>
      {passengers.map((p, index) => (
        <div key={index} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p>Train No: {p.trainNo}</p>
          <p>Name: {p.name}</p>
          <p>Age: {p.age}</p>
          <p>Source: {p.source}</p>
          <p>Destination: {p.destination}</p>
          <button onClick={() => cancelTicket(index)}>Cancel Ticket</button>
        </div>
      ))}
    </div>
  );
}

export default Booking;