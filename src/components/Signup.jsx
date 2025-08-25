import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import auth, { provider } from '../config'

const Signup = () => {
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState()

  const [appUser, setAppUser] = useState(null);

  const navigate = useNavigate()
  const handleGoogleSignUp = async (e) => {
    try {
      e.preventDefault()
      const { user } = await signInWithPopup(auth, provider);

      setAppUser(user);
    } catch (error) {
      console.error("Error signup in with Google:", error);
      setAppUser(null);
    }
  };

async function handleSubmit(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await auth.signOut();
    navigate("/login");
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      alert("Email is already registered. Please log in instead.");
    } else {
      alert("Failed to signup: " + err.message);
    }
  }
}

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-md text-center space-y-6 p-8 border border-gray-200  shadow-lg m-6 rounded-md">
      <h1 className="font-bold text-blue-600 text-3xl">Signup</h1>

      {/* Email Input */}
      <input
        required
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 p-2 rounded-lg outline-none focus:border-blue-500 border-gray-300 transition-all duration-200"
      />

      {/* Password Input */}
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all duration-200 "
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
        >
          {showPass ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>

      {/* confirm password */}
      <div className="relative">
        <input
          type={showConfirmPass ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPass(!showConfirmPass)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
        >
          {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
        </button>

        {error ? <p className="Error absolute text-center items-center text-red-500 text-sm ">{error}</p> : ""}


      </div>
      <span className='text-start text-blue-500'>*Password min 6 chars</span>
      {/* Signup Button */}
      <button
        type='submit'
        className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700 transition font-semibold"
      >
        Signup
      </button>

      {/* Login Redirect */}
      <div className="text-sm text-gray-500 space-x-1 flex items-center justify-center">
        <p> Already a user?</p>
        <a href="./login" className=" text-blue-600 hover:underline">
          Login
        </a>
      </div>

      {/* Google Signup */}
      <button
        onClick={handleGoogleSignUp}
        className="flex justify-center items-center gap-3 p-2 rounded-md border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium"
      >
        <img src="/Google_icon.png" alt="Google-icon" className="w-5 h-5" />
        Signup with Google
      </button>
    </form>

  )
}

export default Signup
