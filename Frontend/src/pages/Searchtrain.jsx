import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Searchtrain() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ from: "", to: "", date: "", travelClass: "", quota: "" });
  const [trains, setTrains] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://railway-management-22qq.onrender.com/api/trains/search", { params: formData, headers: { Authorization: `Bearer ${token}` } });
      setTrains(res.data);
      toast.success("Trains found successfully ");
    } catch (error) {
      setTrains([]);
      toast.error("No trains found ");
    }
  };

  return (

    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4"> Search Trains </h2>
      <form onSubmit={handleSearch} className="w-[400px] bg-white shadow-md p-6 rounded-xl" >
        <input className="w-full border px-3 py-2 mb-3" type="text" name="from" placeholder="From Station" value={formData.from} onChange={handleChange} required />
        <input className="w-full border px-3 py-2 mb-3" type="text" name="to" placeholder="To Station" value={formData.to} onChange={handleChange} required />
        <input className="w-full border px-3 py-2 mb-3" type="date" name="date" value={formData.date} onChange={handleChange} />

        <select name="travelClass" value={formData.travelClass} onChange={handleChange} className="w-full border px-3 py-2 mb-3">
          <option value="">Select Class</option>
          <option value="SL">Sleeper</option>
          <option value="3A">3AC</option>
          <option value="2A">2AC</option>
          <option value="1A">1AC</option>
          <option value="CC">Chair Car</option>
        </select>

        <select name="quota" value={formData.quota} onChange={handleChange} className="w-full border px-3 py-2 mb-3" >
          <option value="">Select Quota</option>
          <option value="General">General</option>
          <option value="Tatkal">Tatkal</option>
          <option value="Ladies">Ladies</option>
          <option value="Senior">Senior Citizen</option>
        </select>
        <button className="w-full bg-black text-white py-2 rounded"> Search Train </button>
      </form>

      {trains.length > 0 && (
        <div className="mt-8 w-[80%]">
          <table className="w-full border shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Train</th>
                <th className="p-2">Route</th>
                <th className="p-2">Time</th>
                <th className="p-2">Distance</th>
                <th className="p-2">Fare</th>
                <th className="p-2">Seats</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>

              {trains.map((item) => (
                <tr key={item.train._id} className="text-center border-t">
                  <td>
                    {item.train.trainName}
                    <br />
                    ({item.train.trainNumber})
                  </td>
                  <td> {formData.from} → {formData.to} </td>
                  <td> {item.train.departureTime} - {item.train.arrivalTime} </td>
                  <td> {item.distance} km </td>
                  <td> ₹ {item.fare}</td>
                  <td>
                    {Object.entries(item.train?.seatsAvailable || {})
                      .filter(([cls]) =>
                        !formData.travelClass || cls === formData.travelClass
                      )
                      .map(([cls, quotas]) => (
                        <div key={cls}>
                          <b>{cls}</b>:{" "}
                          {formData.quota ? `${formData.quota}-${quotas?.[formData.quota] ?? "N/A"}`
                            : Object.entries(quotas || {})
                              .map(([q, seats]) => `${q}-${seats}`)
                              .join(", ")}
                        </div>
                      ))}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate("/bookings", {
                          state: {
                            trainId: item.train._id,
                            source: formData.from,
                            destination: formData.to,
                            travelClass: formData.travelClass,
                            quota: formData.quota,
                            date: formData.date,
                            distance: item.distance,
                            fare: item.fare,
                            pricePerKm: item.train.pricePerKm,
                            stations: item.train.stations
                          }
                        })
                      }
                      className="bg-green-600 text-white px-4 py-1 rounded" > Book </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Searchtrain;