import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "", });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://railway-management-22qq.onrender.com/api/auth/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("Registration failed ");
    }
  };

  return (

    <div className='mt-5 flex items-center justify-center'>
      <div>

        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-500'> CREATE ACCOUNT</h1>
          <h1 className="mb-3 text-2xl font-bold text-black"> RAILWAY RESERVATION SYSTEM </h1>
        </div>

        <form onSubmit={handleRegister}>

          <div className='mb-4'>
            <label className='text-sm text-gray-600'> Name </label>
            <input className="w-full border px-3 py-2 mt-1 focus:border-black" type="text" placeholder='*******' name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <label className='text-sm text-gray-600'> Email </label>
            <input className="w-full border px-3 py-2 mt-1 focus:border-black" type="email" placeholder='*******' name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <label className='text-sm text-gray-600'> Password</label>
            <input className="w-full border px-3 py-2 mt-1 focus:border-black" type="password" placeholder='*******' name="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <label className='text-sm text-gray-600'> Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 mt-1 focus:border-black focus:outline-none text-sm text-gray-600">
              <option value="" disabled> Select Role </option>
              <option value="passenger"> Passenger </option>
              <option value="admin"> Admin </option>
            </select>
          </div>

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"> Register</button>

          <p className="text-center text-sm mt-4">
            <span className="text-gray-600"> I have an account?</span>{" "}
            <span onClick={() => navigate("/login")} className="text-black hover:underline cursor-pointer" > Login Account </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Register;