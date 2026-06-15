import React from "react";

function Edit({ editingTrain, setEditingTrain, handleUpdate }) {

  if (!editingTrain) return null;

  const handleSeatChange = (cls, quota, value) => {

    setEditingTrain({
      ...editingTrain,
      seatsAvailable: {
        ...editingTrain.seatsAvailable,
        [cls]: {
          ...editingTrain.seatsAvailable?.[cls],
          [quota]: Number(value)
        }
      }
    });

  };

  const handleStationChange = (index, e) => {

    const updatedStations = [...editingTrain.stations];

    updatedStations[index][e.target.name] = e.target.value;

    setEditingTrain({
      ...editingTrain,
      stations: updatedStations
    });

  };

  const addStation = () => {

    setEditingTrain({
      ...editingTrain,
      stations: [
        ...editingTrain.stations,
        { name: "", distanceFromStart: "" }
      ]
    });

  };

  const handleRunningDays = (e) => {

    const { value, checked } = e.target;

    if (checked) {

      setEditingTrain({
        ...editingTrain,
        runningDays: [...editingTrain.runningDays, value]
      });

    } else {

      setEditingTrain({
        ...editingTrain,
        runningDays:
          editingTrain.runningDays.filter(day => day !== value)
      });

    }

  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="bg-white p-6 rounded-xl shadow w-[750px] max-h-[90vh] overflow-y-auto">

        <h3 className="text-xl font-semibold mb-4">
          Edit Train
        </h3>

        {/* Train Number */}
        <input
          type="text"
          value={editingTrain.trainNumber}
          onChange={(e) =>
            setEditingTrain({
              ...editingTrain,
              trainNumber: e.target.value
            })
          }
          className="border w-full p-2 mb-2"
        />

        {/* Train Name */}
        <input
          type="text"
          value={editingTrain.trainName}
          onChange={(e) =>
            setEditingTrain({
              ...editingTrain,
              trainName: e.target.value
            })
          }
          className="border w-full p-2 mb-3"
        />

        {/* Departure Time */}
<input
  type="time"
  value={editingTrain.departureTime || ""}
  onChange={(e) =>
    setEditingTrain({
      ...editingTrain,
      departureTime: e.target.value
    })
  }
  className="border w-full p-2 mb-2"
  placeholder="Departure Time"
/>

{/* Arrival Time */}
<input
  type="time"
  value={editingTrain.arrivalTime || ""}
  onChange={(e) =>
    setEditingTrain({
      ...editingTrain,
      arrivalTime: e.target.value
    })
  }
  className="border w-full p-2 mb-3"
  placeholder="Arrival Time"
/>

        {/* Stations */}
        <label className="font-semibold">
          Stations
        </label>

        {editingTrain.stations?.map((station, index) => (

          <div key={index} className="flex gap-2 mt-2">

            <input
              type="text"
              name="name"
              value={station.name}
              onChange={(e) =>
                handleStationChange(index, e)
              }
              className="border p-2 w-1/2"
            />

            <input
              type="number"
              name="distanceFromStart"
              value={station.distanceFromStart}
              onChange={(e) =>
                handleStationChange(index, e)
              }
              className="border p-2 w-1/2"
            />


            

          </div>

        ))}

        <button
          onClick={addStation}
          className="bg-gray-200 px-3 py-1 mt-2 rounded"
        >
          + Add Station
        </button>

        {/* Running Days */}
        <div className="mt-4">

          <label className="font-semibold">
            Running Days
          </label>

          <div className="flex gap-3 flex-wrap">

            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
              .map(day => (

              <label key={day}>

                <input
                  type="checkbox"
                  value={day}
                  checked={
                    editingTrain.runningDays?.includes(day)
                  }
                  onChange={handleRunningDays}
                />

                {day}

              </label>

            ))}

          </div>

        </div>

        {/* Seats Available (Fixed Layout) */}
        <div className="mt-5">

          <label className="font-semibold block mb-2">
            Seats Available
          </label>

          <div className="grid grid-cols-6 gap-2 text-sm">

            {/* Header */}
            <div></div>

            {["SL","3A","2A","1A","CC"].map(cls => (
              <div
                key={cls}
                className="text-center font-semibold"
              >
                {cls}
              </div>
            ))}

            {/* Rows */}
            {["General","Tatkal","Ladies","Senior"]
              .map(quota => (

              <React.Fragment key={quota}>

                <div className="font-medium">
                  {quota}
                </div>

                {["SL","3A","2A","1A","CC"].map(cls => (

                  <input
                    key={cls}
                    type="number"
                    value={
                      editingTrain
                        ?.seatsAvailable?.[cls]?.[quota] || ""
                    }
                    onChange={(e)=>
                      handleSeatChange(
                        cls,
                        quota,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded text-center"
                  />

                ))}

              </React.Fragment>

            ))}

          </div>

        </div>

        {/* Price */}
        <input
          type="number"
          value={editingTrain.pricePerKm}
          onChange={(e)=>
            setEditingTrain({
              ...editingTrain,
              pricePerKm: Number(e.target.value)
            })
          }
          className="border w-full p-2 mt-4"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={() => setEditingTrain(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default Edit;