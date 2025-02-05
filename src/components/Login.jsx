import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestOTP, verifyOTP } from "../network/auth";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phone) {
      setError("Phone number is required.");
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      await requestOTP(phone);
      setOtpSent(true);
      setSuccess("OTP sent successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError("OTP is required.");
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      let a = await verifyOTP(phone, otp);
      localStorage.setItem("token-user", a.token);
      setSuccess("OTP Verified! Logging you in...");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex h-[35rem] max-w-5xl mx-auto md:my-10 ">
      <div className="hidden w-1/2 bg-gradient-to-r from-blue-900 to-blue-700 text-white md:flex flex-col justify-center items-start p-12 rounded-md">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="mt-4 text-lg">
          Login to access your account and continue your journey.
        </p>
      </div>

      <div className="md:w-1/2 flex items-center justify-center w-full">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to Your Account
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <div className="space-y-4">
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

            {otpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOTP}
                className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? "bg-gray-500 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <button
                onClick={handleVerifyOTP}
                className={`w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  loading ? "bg-gray-500 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP & Login"}
              </button>
            )}

            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
