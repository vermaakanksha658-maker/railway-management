import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainWaiting() {

  const [trains, setTrains] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTrains = async () => {
    try {
      const res = await axios.get( "https://railway-management-22qq.onrender.com/api/trains", { headers: { Authorization: `Bearer ${token}`}});
      setTrains(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchWaitingList = async (trainId, trainName) => {
    try {
      const res = await axios.get( `https://railway-management-22qq.onrender.com/api/bookings/waiting/${trainId}`, { headers: { Authorization: `Bearer ${token}` } } );
      setWaitingList(res.data);
      setSelectedTrain(trainName);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="p-8">
       <h2 className="text-2xl font-bold mb-6"> Train Waiting List </h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {trains.map((train) => (
          <button key={train._id} onClick={() => fetchWaitingList( train._id, train.trainName)}className="bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded-lg shadow">

            <div className="font-semibold"> {train.trainName}</div>
            <div className="text-sm"> {train.trainNumber}</div>

          </button>
        ))}
      </div>

      {selectedTrain && (
        <div>
          <h3 className="text-xl font-semibold mb-3"> Waiting List for {selectedTrain}</h3>
          {waitingList.length === 0 ? (

            <p>No waiting bookings for this train</p>) : (

            <table className="w-full border shadow">
              <thead className="bg-gray-200">
                <tr>

                  <th className="p-2">WL No</th>
                  <th className="p-2">Passenger Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Quota</th>

                </tr>
              </thead>
              <tbody>

                {waitingList.map((booking) => (

                  <tr key={booking._id}className="text-center border-t" >

                    <td> WL-{booking.waitingNumber || waitingList.indexOf(booking) + 1}</td>
   <td>
  {booking.passengers
    .map((p) => `${p.name} (${p.age})`)
    .join(", ")}
</td>

                    <td> {booking.userId?.email}</td>
                    <td> {booking.travelClass} </td>
                    <td> {booking.quota} </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default TrainWaiting;