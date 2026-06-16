import React, { useState } from "react";
import axios from "axios";

function Contacts() {
  const [formData, setFormData] = useState({
  fullName: "",
  phone: "",
  email: "",
  message: "",
});
const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(
      "https://railway-management-22qq.onrender.com/api/contact/send-message",
      formData
    );

    alert(res.data.message);

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      message: "",
    });

  } catch (error) {

    console.log(error);

    alert("Failed to send message");

  }

};
  return (
    <section className="bg-gray-100 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-black"> Contact Railway Support  </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-6 text-black"> Contact Information </h3>
            <div className="space-y-5 text-gray-700 text-lg">
              <p>Railway Bhawan, New Delhi, India</p>
              <p> +91 98765 43210 </p>
              <p> support@railwaymanagement.com</p>
            </div>
            <p className="mt-8 text-gray-600 leading-relaxed">
              If you face issues related to train booking, cancellation,
              refund, or train timing, feel free to contact our railway
              support team anytime.</p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-6 text-black"> Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
<input
  type="text"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Full Name"/>


<input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Phone Number"/>


<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"/>

<textarea
  rows="4"
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Write your message..."
  className="w-full p-3 border rounded-lg focus:border-black outline-none"
></textarea>

              <button
  type="submit"
  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
> Send Message </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;