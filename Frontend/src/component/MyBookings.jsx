import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [openTrain, setOpenTrain] = useState(null);

  // Fetch bookings
  const fetchBookings = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://railway-management-22qq.onrender.com/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(res.data);

    } catch {

      toast.error("Failed to load bookings");

    }
  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // Cancel booking function
  const cancelBooking = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://railway-management-22qq.onrender.com/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Booking cancelled successfully");

      fetchBookings();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Cancellation failed"
      );

    }

  };

  // Group bookings by train
  const groupedBookings = bookings.reduce((acc, booking) => {

    const trainKey = booking.trainId?._id;

    if (!acc[trainKey]) {

      acc[trainKey] = {
        trainName: booking.trainId?.trainName,
        trainNumber: booking.trainId?.trainNumber,
        bookings: []
      };

    }

    acc[trainKey].bookings.push(booking);

    return acc;

  }, {});

  return (

    <div className="p-10">

      <h2 className="text-2xl font-bold mb-6">
        My Bookings
      </h2>

      {bookings.length === 0 ? (

        <p>No bookings found</p>

      ) : (

        Object.entries(groupedBookings).map(
          ([trainId, train], index) => (

            <div key={index} className="mb-5">

              {/* Train Card */}
              <div
                onClick={() =>
                  setOpenTrain(
                    openTrain === trainId
                      ? null
                      : trainId
                  )
                }
                className="cursor-pointer bg-blue-50 hover:bg-blue-100 p-4 rounded shadow flex justify-between items-center"
              >

                <div>

                  <div className="text-lg font-semibold">

                     {train.trainName}

                  </div>

                  <div className="text-gray-600">

                    Train No: {train.trainNumber}

                  </div>

                </div>

                <div className="text-sm font-medium">

                  {train.bookings.length} Bookings

                </div>

              </div>

              {/* Booking Table (Visible only if clicked) */}
              {openTrain === trainId && (

                <table className="w-full border mt-3 shadow">

                  <thead className="bg-gray-200">

                    <tr>

                      <th className="p-2">Route</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Class</th>
                      <th className="p-2">Quota</th>
                      <th className="p-2">Passengers</th>
                      <th className="p-2">PNR</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {train.bookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="text-center border-t"
                      >

                        <td>
                          {booking.source} → {booking.destination}
                        </td>

                        <td>
                          {new Date(
                            booking.journeyDate
                          ).toLocaleDateString()}
                        </td>

                        <td>{booking.travelClass}</td>

                        <td>{booking.quota}</td>

                        <td>

                          {booking.passengers.map((p, i) => (

                            <div key={i}>
                              {p.name} ({p.age})
                            </div>

                          ))}

                        </td>

                        <td>{booking.pnr}</td>

                        <td>
                          ₹ {booking.totalFare}
                          <br />
                          <span className="text-xs text-gray-500">
                            ({booking.passengers.length} passengers)
                          </span>
                        </td>

                        <td
                          className={
                            booking.status === "confirmed"
                              ? "text-green-600 font-semibold"
                              : booking.status === "waiting"
                              ? "text-yellow-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >

                          {booking.status}

                        </td>

                        <td>

  {booking.status === "cancelled" ? (

    <span className="text-gray-500 font-semibold">
      Cancelled
    </span>

  ) : new Date(booking.journeyDate) > new Date() ? (

    <button
      onClick={() =>
        cancelBooking(booking._id)
      }
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Cancel
    </button>

  ) : (

    <span className="text-green-600 font-semibold">
      Journey Completed
    </span>

  )}

</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              )}

            </div>

          )
        )

      )}

    </div>

  );

}

export default MyBookings;