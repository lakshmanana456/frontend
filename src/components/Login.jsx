import React from 'react'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import auth, { provider } from '../config'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [appUser, setAppUser] = useState(null)
    const [error, setError] = useState(false)

    const handleGoogleSignIn = async () => {
        try {
            const { user } = await signInWithPopup(auth, provider);

            setAppUser(user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setAppUser(null);
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate("/home")
            }
        })
    }, [])

    function handleLogin(e) {
        e.preventDefault()

        setError("")
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/home")

        }).catch(() => {
            setError("Email or Password Incorrect")
        })
    }


    return (
        <form onSubmit={handleLogin} className="flex flex-col mx-auto max-w-md  m-8 text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200 ">
            <h1 className="font-bold text-3xl text-blue-600">Login</h1>
            <p className="text-gray-500 text-sm">Welcome back! Please enter your details.</p>

            {/* Email Input */}
            <input

                required
                onChange={(e) => setEmail(e.target.value)}


                className="border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-blue-500   transition-all duration-200"
                type="email"
                placeholder="Email"
            />

            {/* Password Input with Eye Toggle */}
            <div className="relative">
                <input
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all duration-200"
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                />
                <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-600"
                >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                </span>
                {error ? <p className='absolute text-red-500 '>{error}</p> : ""}
            </div>

            {/* Login Button */}
            <button
                className="bg-blue-600 text-white rounded-lg py-2 px-6 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
                type='submit'
            >
                Login
            </button>

            {/* Sign Up Link */}
            <div className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                <p> Not a user?</p>
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Signup
                </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2">
                <hr className="w-44 border-gray-300" />
                <span className="text-gray-400 text-sm">OR</span>
                <hr className="w-44 border-gray-300" />
            </div>

            {/* Google Sign-In Button */}
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
                <img
                    src="/Google_icon.png" // place in public folder
                    alt="Google Icon"
                    className="w-5 h-5"
                />
                <span className=" font-medium">Login with Google</span>
            </button>
        </form>

    )
}

export default Login