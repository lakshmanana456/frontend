import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contactus = () => {
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        Have questions about <span className="font-semibold text-blue-500">Awesome</span>? 
        We'd love to hear from you!
      </p>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6">
          <FaPhoneAlt className="text-blue-500 text-3xl mb-3" />
          <h3 className="font-semibold">Phone</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6">
          <FaEnvelope className="text-blue-500 text-3xl mb-3" />
          <h3 className="font-semibold">Email</h3>
          <p className="text-gray-600">support@awesome.com</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6">
          <FaMapMarkerAlt className="text-blue-500 text-3xl mb-3" />
          <h3 className="font-semibold">Address</h3>
          <p className="text-gray-600 text-center">
            123 Awesome Street, Chennai, India
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form  className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
          required
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
          required
            placeholder="Write your message..."
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contactus;
