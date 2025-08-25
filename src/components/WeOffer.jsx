import React, { useState } from 'react'
import { FaRetweet, FaHeadset, FaTruck, } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
const WeOffer = () => {
  const [email, setEamil] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    setEamil("")
    toast.success("You Subscribed Successfully",
      {
        position: "top-center",
        autoClose: 3000
      }
    )
  }
  const CustomerSupport = [
    {
      icon: <FaRetweet />,
      heading: " Easy Exchange Policy",
      description: "We offer hassle free exchange policy"
    },
    {
      icon: <FaTruck />,
      heading: " Fast & Free Shipping",
      description: "Easy to reach your desire product faster"
    },
    {
      icon: <FaHeadset />,
      heading: " Best customer support ",
      description: "We provide 24/7 customer support"
    },

  ]
  return (
    <div className="px-4  py-10 border">
      {/* Customer Support Section */}
      <div className="flex flex-col md:flex-row md:justify-around gap-8 mt-10">
        {CustomerSupport.map((data, i) => (
          <section key={i} className="flex flex-col items-center text-center max-w-xs mx-auto">
            <span className="text-3xl md:text-3xl lg:text-4xl">{data.icon}</span>
            <h1 className="font-semibold md:text-md lg:text-xl text-base mt-2">{data.heading}</h1>
            <p className="text-gray-500 md:text-xs text-sm">{data.description}</p>
          </section>
        ))}
      </div>

      {/* Subscribe Section */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4 mt-16 mx-auto w-full">
        <h1 className="font-bold text-xl sm:text-2xl text-center">
          Subscribe now & get 20% off
        </h1>

        <div className="flex w-full md:w-1/2 gap-2">
          <input
            type="email"
            value={email}

            onChange={(e) => setEamil(e.target.value)}
            required
            placeholder="Enter your email"
            className="border-2 border-black w-full p-2 rounded-md"
          />
          <button

            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-xs"
          >
            Subscribe
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>

  )
}

export default WeOffer