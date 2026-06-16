import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BookTicket = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const trainId = location.state?.trainId;
  const sourceFromSearch = location.state?.source || "";
  const destinationFromSearch = location.state?.destination || "";
  const distance = location.state?.distance;
  const fare = location.state?.fare;
  const pricePerKm = location.state?.pricePerKm;

  const [formData, setFormData] = useState({journeyDate: "",travelClass: "SL", quota: "General", source: sourceFromSearch,
     destination: destinationFromSearch, distance, fare, pricePerKm, });
  const [passengers, setPassengers] = useState([
  {
    name: "",
    age: "",
    gender: ""
  }
]);

const handlePayment = async () => {

  try {

    // ticket amount
    const totalAmount = fare;

    const { data } = await axios.post(
      "https://railway-management-22qq.onrender.com/api/payment/create-order",
      { ticketPrice: totalAmount, quantity: 1 }
    );

    const options = {

      key: "rzp_test_SoNCubYBFbZsDL",

      amount: data.amount,

      currency: data.currency,

      name: "Railway Management",

      description: "Train Ticket Booking",

      order_id: data.id,

      handler: async function (response) {

  try {

    alert("Payment Successful");

    const payload = {

      trainId,

      source: formData.source,

      destination: formData.destination,

      journeyDate: formData.journeyDate,

      travelClass: formData.travelClass,

      quota: formData.quota,

      passengers,

    };

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://railway-management-22qq.onrender.com/api/bookings/book",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    navigate("/mybookings");

  } catch (error) {

    console.log(error);

    alert("Booking failed");

  }

},

      theme: {
        color: "#000000",
      },

    };

    const razor = new window.Razorpay(
      options
    );

    razor.open();

  } catch (error) {

    console.log(error);

  }

};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassengerChange = (index, e) => {
  const updatedPassengers = [...passengers];

  updatedPassengers[index][e.target.name] = e.target.value;

  setPassengers(updatedPassengers);
};

const addPassenger = () => {

  if (passengers.length >= 6) {
    alert("Maximum 6 passengers allowed");
    return;
  }

  setPassengers([
    ...passengers,
    {
      name: "",
      age: "",
      gender: ""
    }
  ]);
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trainId) {
      alert("Train not selected properly. Please search again.");
      navigate("/searchtrain");
      return;
    }

    try {

      const payload = { trainId, source: formData.source, destination: formData.destination, journeyDate: formData.journeyDate, travelClass: formData.travelClass, quota: formData.quota, passengers: passengers
      };

      const token = localStorage.getItem("token");
      const res = await axios.post( "https://railway-management-22qq.onrender.com/api/bookings/book", payload, { headers: { Authorization: `Bearer ${token}` }} );

      alert(res.data.message);
      navigate("/mybookings");
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      alert( error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[650px]">
        <h2 className="text-2xl font-bold text-center mb-6"> Train Ticket Booking </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Source</label>
              <input type="text" name="source" value={formData.source} readOnly className="w-full border p-2 rounded-lg bg-gray-100" />
            </div>

            <div>
              <label className="font-semibold">Destination</label>
              <input type="text" name="destination" value={formData.destination} readOnly className="w-full border p-2 rounded-lg bg-gray-100"/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Journey Date</label>
              <input type="date" name="journeyDate" onChange={handleChange} className="w-full border p-2 rounded-lg" required/>
            </div>

            <div>
              <label className="font-semibold">Class</label>
              <select name="travelClass" onChange={handleChange} className="w-full border p-2 rounded-lg" >
                <option value="SL">Sleeper (SL)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="1A">First Class (1A)</option>
                <option value="CC">Chair Car (CC)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold">Quota</label>
            <select name="quota" onChange={handleChange} className="w-full border p-2 rounded-lg">
              <option value="General">General</option>
              <option value="Tatkal">Tatkal</option>
              <option value="Ladies">Ladies</option>
              <option value="Senior">Senior Citizen</option>
            </select>
          </div>

        {passengers.map((passenger, index) => (
  <div
    key={index}
    className="border p-4 rounded-lg space-y-3"
  >
    <h3 className="font-bold">
      Passenger {index + 1}
    </h3>

    <input
      type="text"
      name="name"
      placeholder="Passenger Name"
      value={passenger.name}
      onChange={(e) =>
        handlePassengerChange(index, e)
      }
      className="w-full border p-2 rounded-lg"
      required
    />

    <input
      type="number"
      name="age"
      placeholder="Age"
      value={passenger.age}
      onChange={(e) =>
        handlePassengerChange(index, e)
      }
      className="w-full border p-2 rounded-lg"
      required
    />

    <select
      name="gender"
      value={passenger.gender}
      onChange={(e) =>
        handlePassengerChange(index, e)
      }
      className="w-full border p-2 rounded-lg"
      required
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>
))}

<button
  type="button"
  onClick={addPassenger}
  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
>
  Add Passenger
</button>
<button
  type="button"
  onClick={handlePayment}
  className="bg-black text-white px-5 py-2 rounded-lg"
>
  Pay & Book Ticket
</button>  
    </form>
      </div>
    </div>
  );
};

export default BookTicket;