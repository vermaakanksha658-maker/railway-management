import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Edit from "./Edit";

function ManageTrains() {

  const [trains, setTrains] = useState([]);
  const [editingTrain, setEditingTrain] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch trains
  const fetchTrains = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8200/api/trains",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTrains(res.data);

    } catch {

      toast.error("Failed to load trains");

    }

  };

  useEffect(() => {

    fetchTrains();

  }, []);

  // Delete train
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8200/api/trains/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Train deleted successfully");

      fetchTrains();

    } catch {

      toast.error("Delete failed");

    }

  };

  // Update train
  const handleUpdate = async () => {

    try {

      await axios.put(
        `http://localhost:8200/api/trains/${editingTrain._id}`,
        editingTrain,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Train updated successfully");

      setEditingTrain(null);

      fetchTrains();

    } catch {

      toast.error("Update failed");

    }

  };

  return (

    <div className="p-8">

      <h2 className="text-3xl font-bold mb-6">
        Manage Trains 🚆
      </h2>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        <table className="w-full text-sm">

          {/* Header */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">

            <tr>

              <th className="p-4">Train No</th>

              <th className="p-4">Train Name</th>

              <th className="p-4">Route</th>

              <th className="p-4">Timing</th>

              <th className="p-4">Seats</th>

              <th className="p-4">Running Days</th>

              <th className="p-4">Distance</th>

              <th className="p-4">Price/km</th>

              <th className="p-4">Actions</th>

            </tr>

          </thead>

          {/* Body */}
          <tbody>

            {trains.map((train) => (

              <tr
                key={train._id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* Train Number */}
                <td className="p-4 font-semibold">
                  {train.trainNumber}
                </td>

                {/* Train Name */}
                <td className="p-4">
                  {train.trainName}
                </td>

                {/* Route */}
                <td className="p-4 text-gray-600">

                  {train.stations?.[0]?.name}

                  <br />

                  <span className="text-xs">↓</span>

                  <br />

                  {
                    train.stations?.[
                      train.stations.length - 1
                    ]?.name
                  }

                </td>

                {/* Timing */}
                <td className="p-4 text-gray-600">

                  {train.departureTime}

                  <br />

                  <span className="text-xs">↓</span>

                  <br />

                  {train.arrivalTime}

                </td>

                {/* Seats */}
                <td className="p-4">

                  <div className="space-y-1">

                    {Object.entries(
                      train.seatsAvailable || {}
                    ).map(([cls, quotas]) => (

                      <div
                        key={cls}
                        className="bg-gray-100 px-2 py-1 rounded text-xs"
                      >

                        <b>{cls}</b>:{" "}

                        {Object.entries(quotas || {})
                          .map(
                            ([q, seats]) =>
                              `${q}-${seats}`
                          )
                          .join(", ")}

                      </div>

                    ))}

                  </div>

                </td>

                {/* Running Days */}
                <td className="p-4 text-gray-600">

                  {train.runningDays?.join(", ")}

                </td>

                {/* Distance */}
                <td className="p-4">

                  {
                    train.stations?.[
                      train.stations.length - 1
                    ]?.distanceFromStart
                  }{" "}
                  km

                </td>

                {/* Price */}
                <td className="p-4 font-semibold text-green-600">

                  ₹{train.pricePerKm}

                </td>

                {/* Actions */}
                <td className="p-4">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        setEditingTrain(train)
                      }
                      className="bg-black text-white px-4 py-1 rounded-lg text-xs hover:scale-105"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(train._id)
                      }
                      className="bg-red-500 text-white px-4 py-1 rounded-lg text-xs hover:scale-105"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Edit Modal Component */}
      <Edit
        editingTrain={editingTrain}
        setEditingTrain={setEditingTrain}
        handleUpdate={handleUpdate}
      />

    </div>

  );

}

export default ManageTrains;