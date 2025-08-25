import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckoutContext } from "./CheckoutContext";
import { CartContext } from "./CartContext";
import auth from "../config";
import axios from "axios";

const Checkout = () => {
  const { getTotal, cart, clearCart } = useContext(CartContext);
  const { setOrderData } = useContext(CheckoutContext);
  const navigate = useNavigate();

  // Always define hooks before any conditionals
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    payment: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe(); // cleanup
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.street &&
      formData.city &&
      formData.state &&
      formData.zipcode &&
      formData.country &&
      formData.phone &&
      formData.payment
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all fields and select a payment method.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const user = auth.currentUser;
      const userId = user.uid;

      const res = await axios.post(`http://localhost:5000/order/${userId}`, {
        deliveryInfo: formData,
        paymentMethod: "Cash on Delivery",
      });

      if (res.data.success) {
        setOrderData({ formData, cart, total: getTotal() });
        toast.success("Order successfully placed", {
          position: "top-center",
          autoClose: 3000,
        });

        clearCart();
        setTimeout(() => {
          navigate("/ordersummary");
        }, 3000);
      }
    } catch (err) {
      toast.error("Failed to place order. Try again later.");
    }
  };

  const inputClass = "border border-gray-300 p-2 rounded-sm w-full";

  // Safe conditional rendering 
  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Loading</h1>;
  }

  return (
    <div className="flex flex-col md:flex-col lg:flex-row px-6 gap-10 mt-4">
      {/* Delivery Info */}
      <section className="flex-1 mx-8">
        <h1 className="font-semibold text-2xl mb-4">
          DELIVERY INFORMATION —
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className={inputClass} />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className={inputClass} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="col-span-2 border border-gray-300 p-2 rounded-sm w-full" />
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="col-span-2 border border-gray-300 p-2 rounded-sm w-full" />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className={inputClass} />
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className={inputClass} />
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Zipcode" className={inputClass} />
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className={inputClass} />
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="col-span-2 border border-gray-300 p-2 rounded-sm w-full" />
        </form>
      </section>

      {/* Cart & Payment */}
      <section className="flex-1 mx-8">
        <h1 className="font-semibold text-2xl mb-4">CART TOTAL —</h1>
        <div className="space-y-2 mb-6">
          <p className="border-b border-black p-2 flex justify-between">
            Subtotal <span className="flex items-center"><FaRupeeSign />{getTotal()}</span>
          </p>
          <p className="border-b border-black p-2 flex justify-between">
            Shipping <span className="text-blue-600 font-semibold">Free</span>
          </p>
          <h2 className="font-bold flex justify-between">
            Total <span className="flex items-center"><FaRupeeSign />{getTotal()}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <h1 className="font-semibold mb-2">Payment Method</h1>
          <label htmlFor="paymentmode" className="gap-1 space-x-1">
            <input id="paymentmode" name="payment" type="checkbox" checked={formData.payment} onChange={handleChange} />
            CASH ON DELIVERY
          </label>

          <button
            type="submit"
            disabled={getTotal() === 0}
            className={`w-full p-2 rounded-md text-white mt-6
            ${getTotal() === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"}`}
          >
            Place Order
          </button>

        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
