import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Myprofilepassenger() {

  const token = useSelector(state => state.auth.token);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", dob: "", age: "", gender: "", });
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8200/api/auth/profile", { headers: { Authorization: `Bearer ${token}` } });
        setFormData({ ...res.data, dob: res.data?.dob?.slice(0, 10) || "" });
      } catch (error) {
        console.error(error);
      }
    };

    if (token) getProfile();
  }, [token]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8200/api/auth/profile", formData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Profile updated successfully ");
    } catch (error) {
      console.error(error);
      alert("Profile update failed ");
    }
  };

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6"> Passenger Profile  </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />

        <div className="grid grid-cols-2 gap-4">
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="border p-2 rounded" />
        </div>

        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button className="bg-black text-white px-6 py-2 rounded hover:bg-blue-700">Save Profile</button>
      </form>
    </div>
  );
}

export default Myprofilepassenger;