import axios from 'axios';
import React, { useEffect, useState } from 'react'

function TotalUsers() {

  const [Users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const getAllUsers = async () => {
    
    try {
      const res = await axios.get("http://localhost:8200/api/auth/users", { headers: { Authorization: `Bearer ${token}`, }, });
      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

    useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4"> Total Users {Users.length}</h1>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Gender</th>
          </tr>
        </thead>

        <tbody>
          {Users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2"> {user.name}</td>
              <td className="border p-2"> {user.email}</td>
              <td className="border p-2"> {user.phone}</td>
              <td className="border p-2"> {user.dob}</td>
              <td className="border p-2"> {user.age}</td>
              <td className="border p-2"> {user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TotalUsers