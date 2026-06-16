import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddTrain() {
  const [formData, setFormData] = useState({ trainNumber: "", trainName: "", from: "", to: "", departureTime: "", arrivalTime: "", runningDays: [],
    seatsAvailable: {
  SL: { General: "", Tatkal: "", Ladies: "", Senior: "" },
  "3A": { General: "", Tatkal: "", Ladies: "", Senior: "" },
  "2A": { General: "", Tatkal: "", Ladies: "", Senior: "" },
  "1A": { General: "", Tatkal: "", Ladies: "", Senior: "" },
  CC: { General: "", Tatkal: "", Ladies: "", Senior: "" }
},
    quota: [],
    stations: [
      { name: "", distanceFromStart: "" }
    ],
    pricePerKm: ""
  });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeatChange = (cls, quota, value) => {

  setFormData({
    ...formData,
    seatsAvailable: {
      ...formData.seatsAvailable,
      [cls]: {
        ...formData.seatsAvailable[cls],
        [quota]: value
      }
    }
  });

};

  const handleRunningDays = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({ ...formData, runningDays: [...formData.runningDays, value]});
    } else {
      setFormData({ ...formData, runningDays: formData.runningDays.filter(day => day !== value) });
    }
  };

  
  const handleStationChange = (index, e) => {
    const updatedStations = [...formData.stations];
    updatedStations[index][e.target.name] = e.target.value;
    setFormData({...formData,stations: updatedStations});};

  const addStation = () => { setFormData({...formData,stations: [ ...formData.stations, { name: "", distanceFromStart: "" }]});};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to) {
      toast.error("From and To required");
      return;
    }
    const updatedStations = [...formData.stations];

    if (updatedStations.length > 0) {
      updatedStations[0].name = formData.from;
      updatedStations[updatedStations.length - 1].name =formData.to;
    }
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        stations: updatedStations.map(station => ({name: station.name,distanceFromStart: Number(station.distanceFromStart)})),
        seatsAvailable: Object.fromEntries(

  Object.entries(formData.seatsAvailable).map(
    ([cls, quotas]) => [

      cls,

      Object.fromEntries(
        Object.entries(quotas).map(
          ([q,val]) => [q, Number(val)]
        )

      )

    ]

  )

),
        pricePerKm: formData.pricePerKm || 2
      };
      const res = await axios.post("https://railway-management-22qq.onrender.com/api/trains/add",payload,{ headers: { Authorization: `Bearer ${token}` } } );
      toast.success(res.data.message);
      setFormData({trainNumber: "",trainName: "",from: "",to: "",departureTime: "",arrivalTime: "",runningDays: [],
seatsAvailable: {
    SL: { General:"", Tatkal:"", Ladies:"", Senior:"" },
    "3A": { General:"", Tatkal:"", Ladies:"", Senior:"" },
    "2A": { General:"", Tatkal:"", Ladies:"", Senior:"" },
    "1A": { General:"", Tatkal:"", Ladies:"", Senior:"" },
    CC: { General:"", Tatkal:"", Ladies:"", Senior:"" }}

,quota: [],stations: [{ name: "", distanceFromStart: "" }],pricePerKm: ""});
    } 

  
    
    catch (error) {
      toast.error( error.response?.data?.message || "Train add failed ❌");
    }
  };

  return (

    <div className="px-10 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-6"> Add Train  </h2>
        <form onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-6">
          <input type="text" name="trainNumber" value={formData.trainNumber} placeholder="Train Number" onChange={handleChange} className="border p-2 rounded" required/>
          <input type="text" name="trainName" value={formData.trainName} placeholder="Train Name" onChange={handleChange} className="border p-2 rounded"required/>
          <input type="text"name="from" value={formData.from}placeholder="From" onChange={handleChange} className="border p-2 rounded"required/>
          <input type="text"name="to" value={formData.to} placeholder="To" onChange={handleChange} className="border p-2 rounded" required/>
          <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} className="border p-2 rounded" required/>
          <input type="time" name="arrivalTime"  value={formData.arrivalTime} onChange={handleChange} className="border p-2 rounded" required/>
        
          <div className="col-span-2">
            <label className="font-semibold"> Intermediate Stations </label>
            {formData.stations.map((station, index) => (
              <div key={index}
                   className="flex gap-2 mt-2">
                <input type="text" name="name" placeholder="Station Name"value={station.name} onChange={(e) => handleStationChange(index, e)} className="border p-2 rounded w-1/2" required/>
                <input type="number" name="distanceFromStart" placeholder="Distance From Start" value={station.distanceFromStart} onChange={(e) => handleStationChange(index, e) } className="border p-2 rounded w-1/2" required/>
              </div>
            ))}
           <button type="button" onClick={addStation} className="mt-2 px-4 py-1 bg-gray-200 rounded"> + Add Station</button>
          </div>

          <div className="col-span-2">
            <label className="font-semibold"> Running Days:</label>
            <div className="flex gap-3 mt-2 flex-wrap">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
                .map(day => (
                <label key={day}>
                  <input type="checkbox" value={day} checked={formData.runningDays.includes(day)} onChange={handleRunningDays} /> {day} </label>
              ))}
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-5 gap-4">{["SL","3A","2A","1A","CC"].map(cls => (

  <div key={cls}>

    <label className="font-semibold">{cls}</label>

    {["General","Tatkal","Ladies","Senior"].map(q => (

      <input
        key={q}
        type="number"
        placeholder={`${cls}-${q}`}
        value={formData.seatsAvailable?.[cls]?.[q] || ""}
        onChange={(e)=>handleSeatChange(cls,q,e.target.value)}
        className="border p-2 rounded m-1"
        required
      />

    ))}

  </div>

))}
          </div>

          <div className="col-span-2">
            
          </div>
          <input type="number" name="pricePerKm" value={formData.pricePerKm} placeholder="Price per KM (default ₹2)" onChange={handleChange} className="border p-2 rounded"/>
          <button type="submit" className="col-span-2 bg-black text-white py-3 rounded-xl" >  Add Train</button>
        </form>
      </div>
    </div>
  );

}

export default AddTrain;