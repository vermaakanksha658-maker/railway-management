import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", });
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("https://railway-management-22qq.onrender.com/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(res.data.message);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Login failed ");
    }
  };

  return (

        <div className='mt-5 flex items-center justify-center'>
          <div>

            <div className='text-center'>
              <h1 className='text-2xl font-bold text-gray-500'> LOGIN ACCOUNT</h1>
              <h1 className="mb-3 text-2xl font-bold text-black"> Railway Management System</h1>
            </div>

            <form onSubmit={handleLogin}>

              <div className='mb-4'>
                <label className='text-sm text-gray-600'> Email</label>
                <input className="w-full border px-3 py-2 mt-1 focus:border-black" type="email" placeholder='*******' name="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className='mb-4'>
                <label className='text-sm text-gray-600'> Password</label>
                <input className="w-full border px-3 py-2 mt-1 focus:border-black" type="password" placeholder='*******' name="password" value={formData.password} onChange={handleChange} />
              </div>

              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"> Login</button>

              <p className="text-center text-sm mt-4">
                <span className="text-gray-600"> Don't have an account?</span>{" "}
                <span onClick={() => navigate("/register")} className="text-black hover:underline cursor-pointer"> Register Here</span>
              </p>
            </form>
          </div>
        </div>
  )
}

export default Login;