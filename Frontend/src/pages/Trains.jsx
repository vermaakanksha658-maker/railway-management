import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Trains() {

  const [trains, setTrains] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const trainsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {

    fetchTrains();

  }, []);

  const fetchTrains = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8200/api/trains",{  headers: { Authorization: `Bearer ${token}`,},
        }
      );

      setTrains(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleBookTicket = (train) => {

    navigate("/book-ticket", { state: train });

  };

  const indexOfLastTrain =
    currentPage * trainsPerPage;

  const indexOfFirstTrain =
    indexOfLastTrain - trainsPerPage;

  const currentTrains = trains.slice(
    indexOfFirstTrain,
    indexOfLastTrain
  );

  const totalPages = Math.ceil(
    trains.length / trainsPerPage
  );

  const getTotalSeats = (seatsAvailable) => {

    return Object.values(seatsAvailable || {})
      .map((quotaObj) =>
        Object.values(quotaObj || {}).reduce(
          (sum, seats) => sum + seats,
          0
        )
      )
      .reduce((sum, val) => sum + val, 0);

  };
  return (

    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Trains 
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {currentTrains.map((train) => (
          <div key={train._id} className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-2xl transition" >
            <h3 className="text-xl font-bold mb-2">{train.trainName}</h3>
            <p className="text-sm text-gray-500 mb-3"> Train No: {train.trainNumber} </p>
            <div className="mb-3 text-gray-700">
              <p>
                <span className="font-semibold"> From:
                </span>{" "}{train.stations?.[0]?.name}
              </p>
              <p>
                <span className="font-semibold"> To: </span>{" "}
                { train.stations?.[  train.stations.length - 1]?.name }
              </p>
            </div>
        
            <div className="mb-3 text-gray-700">
              <p> Departure: {train.departureTime} </p>
              <p> Arrival: {train.arrivalTime} </p>
            </div>

            <p className="mb-4 text-sm text-gray-700">

              <span className="font-semibold"> Total Seats:
              </span>{" "}
              {getTotalSeats(train.seatsAvailable)}
            </p>
            
            <button onClick={() =>handleBookTicket(train)}
              className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Book Ticket
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className={`px-5 py-2 rounded-xl text-white font-semibold ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:opacity-90"
          }`}
        >
          Previous
        </button>

        <span className="font-semibold text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className={`px-5 py-2 rounded-xl text-white font-semibold ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:opacity-90"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

}

export default Trains;