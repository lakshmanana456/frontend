import React from 'react'

const Footer = () => {
  return (
    <div className=" px-6 py-12 bg-blue-50  border-gray-300">
      {/* Footer Content */}
      <div className="flex flex-col md:flex-row md:justify-between gap-12 pb-8 border-b border-gray-400">

        {/* Brand Info */}
        <section className="md:w-1/3">
          <h1 className="font-bold text-xl" style={{ fontFamily: '"Great Vibes", cursive' }}>Awesome</h1>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            Awesome is a mobile company that combines style, performance, and innovation in every device.
            We create smartphones that are fast, reliable, and designed to fit modern lifestyles.
            With Awesome, technology isn't just powerful—it's truly awesome.
          </p>
        </section>

        {/* Company Links */}
        <section>
          <h1 className="font-bold text-xl mb-3">Company</h1>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </section>

        {/* Contact Info */}
        <section>
          <h1 className="font-bold text-xl mb-3">Get in Touch</h1>
          <p className="text-gray-700 text-sm"> +1-212-345-6778</p>
          <p className="text-gray-700 text-sm"> awesome@gmail.com</p>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm mt-6">
        © 2025 Awesome.dev — All Rights Reserved.
      </div>
    </div>

  )
}

export default Footer