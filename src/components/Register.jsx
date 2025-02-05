import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../network/auth";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [stream, setStream] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      await registerUser(name, email, phone, stream, level, password);
      setSuccess("Registration Successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError("Registration Failed! Please try again.");
    }
  };

  return (
    <div className="flex h-[35rem] max-w-5xl mx-auto md:my-10 ">
      <div className=" hidden w-1/2 bg-gradient-to-r from-blue-900 to-blue-700 text-white md:flex flex-col justify-center items-start p-12 rounded-md">
        <h1 className="text-3xl font-bold">Guaranteed Admissions</h1>
        <p className="mt-4 text-lg">
          Avail the chance of getting guaranteed admission to the best college
          for you. Register now and take a step towards your bright future.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome, Create your account
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                placeholder="Mobile No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Stream</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Level</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleRegistration}
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>

            <p
              className="text-center text-gray-600 mt-4"
              onClick={() => navigate("/login")}
            >
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer">Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
