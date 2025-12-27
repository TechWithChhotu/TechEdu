import { Logs, X } from "lucide-react";
import SignInBanner from "../assets/icons/signin-banner.svg";
import TechEdu from "../assets/images/TechEdu_fit_to_logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api.v1.js";
import OtpInput from "../components/common/OtpInput.jsx";

export default function Auth() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendOTPSuccess, setSendOTPSuccess] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleOtpComplete = (otp) => {
    console.log("OTP Entered:", otp);
    setEnteredOTP(otp);
  };

  const handleRequestOtp = async () => {
    if (phone.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/user/login-register", {
        phone,
      });

      console.log("OTP Response:", res.data);
      setSendOTPSuccess(res.data.success);
      setUserExist(res.data.exist);

      // 👉 next step (OTP screen)
      // navigate("/verify-otp");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleUserLogin = async () => {
    console.log("handleUserLogin");

    if (enteredOTP < 100000) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {
      // setLoading(true);

      const res = await api.post("/user/sign-in", {
        phone,
        userOTP: enteredOTP,
      });

      console.log("Sign-in Response: ", res.data);
      if (res.data.success) {
        console.log("You are login successfully");
        //futher .....Code
        navigate("");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUserRegister = async () => {
    console.log("handleUserRegister");

    if (enteredOTP < 100000) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {
      const res = await api.post("/user/sign-up", {
        phone,
        name,
        email,
        password,
        userOTP: enteredOTP,
      });

      if (res.data.success) {
        console.log("OTP Response:", res.data);
        navigate(-1);
        // futher code......
      }

      // 👉 next step (OTP screen)
      // navigate("/verify-otp");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-5xl h-[550px] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={() => navigate(-1)}
        >
          <X size={32} />
        </button>

        {/* LEFT SECTION (Illustration) */}
        <div className="hidden md:flex flex-col justify-between bg-gray-50 p-6">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="w-40  rounded-lg flex items-center justify-center">
              <img src={TechEdu} alt="" />
            </span>
          </div>

          <div className="flex justify-center">
            <img src={SignInBanner} alt="illustration" className="max-w-sm" />
          </div>

          <p className="text-center text-gray-400 text-sm">
            Learn. Build. Grow.
          </p>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Login / Register</h2>
            {/* Mobile Input */}
            <label className="block text-sm text-gray-600 mb-2">
              Please enter your mobile number
            </label>
            <div className="flex border rounded-lg overflow-hidden mb-4">
              <select className="px-3 border-r outline-none bg-gray-50">
                <option>IN +91</option>
              </select>
              <input
                type="tel"
                className="flex-1 px-4 py-2 outline-none"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10 digit number"
              />
            </div>
            {sendOTPSuccess && <OtpInput onComplete={handleOtpComplete} />}
            {/* Input Name */}
            {sendOTPSuccess && !userExist && (
              <div className="">
                <label className="block text-sm text-gray-600 mb-2">
                  Please enter your name
                </label>
                <input
                  type="tel"
                  className="flex-1 px-4 py-2 outline-none border rounded-md w-full"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name. "
                />

                {/* Email */}
                <label className="block text-sm text-gray-600 mb-2">
                  Please enter your email
                </label>
                <input
                  type="email"
                  className="flex-1 px-4 py-2 outline-none border rounded-md w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your name. "
                />

                {/* Password */}
                <label className="block text-sm text-gray-600 mb-2">
                  Please a password
                </label>
                <input
                  type="password"
                  className="flex-1 px-4 py-2 outline-none border rounded-md w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password 6-8 character long. "
                  maxLength={8}
                  minLength={6}
                />
              </div>
            )}
            {/* Button */}
            <button
              onClick={
                sendOTPSuccess
                  ? userExist
                    ? handleUserLogin
                    : handleUserRegister
                  : handleRequestOtp
              }
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white transition mt-4
            ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            >
              {loading
                ? "Sending OTP..."
                : sendOTPSuccess
                ? "Verify OTP"
                : "Request OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
