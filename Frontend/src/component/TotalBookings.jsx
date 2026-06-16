import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalBookings() {

  const [bookings, setBookings] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const token = localStorage.getItem("token");

  const getAllBookings = async () => {
    try {

      const res = await axios.get(
        "https://railway-management-22qq.onrender.com/api/bookings/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookings(res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  // train-wise grouping
  const trainWiseBookings = bookings.reduce((acc, booking) => {

    const trainId = booking.trainId?._id;

    if (!acc[trainId]) {
      acc[trainId] = {
        trainName: booking.trainId?.trainName,
        bookings: []
      };
    }

    acc[trainId].bookings.push(booking);

    return acc;

  }, {});

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Total Trains: {Object.keys(trainWiseBookings).length}
      </h1>

      {/* Train List */}
      <div className="mb-6 grid grid-cols-3 gap-4">

  {Object.entries(trainWiseBookings).map(([trainId, data]) => (

    <button
      key={trainId}
      onClick={() => setSelectedTrain(data)}
      className="bg-gray-200 px-4 py-3 rounded-lg hover:bg-gray-300 shadow"
    >
      <p className="font-semibold">{data.trainName}</p>
      <p className="text-sm">
        Bookings: {data.bookings.length}
      </p>
    </button>

  ))}

</div>

      {/* Selected Train Booking Table */}
      {selectedTrain && (

        <div>

          <h2 className="text-xl font-semibold mb-2">
            Bookings for {selectedTrain.trainName}
          </h2>

          <table className="w-full border">

            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">User</th>
                <th className="border p-2">Source</th>
                <th className="border p-2">Destination</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Fare</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>

              {selectedTrain.bookings.map((booking) => (

                <tr key={booking._id}>
                  <td className="border p-2">
                    {booking.userId?.name}
                  </td>
                  <td className="border p-2">
                    {booking.source}
                  </td>
                  <td className="border p-2">
                    {booking.destination}
                  </td>
                  <td className="border p-2">
                    {booking.travelClass}
                  </td>
                  <td className="border p-2">
                    ₹{booking.totalFare}
                  </td>
                  <td className="border p-2">
                    {booking.status}
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

export default TotalBookings;