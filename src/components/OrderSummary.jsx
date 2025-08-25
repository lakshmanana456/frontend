import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "./CheckoutContext";
import { useNavigate } from "react-router-dom";
import auth from "../config";


const OrderSummary = () => {
  const { orderData } = useContext(CheckoutContext);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const handleContinue = () => {
    navigate("/")
  }
  const handleHistory = () => {
    navigate("/orderhistory")
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });

  }, [navigate]);


  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Checking login...</h1>;
  }

  if (!orderData) return <p>No order found.</p>;
  return (
    <div className="px-6">
      <h1 className="font-semibold text-2xl">Order Summary:</h1>
      <p>Name: {orderData.formData.firstName} {orderData.formData.lastName}</p>
      <p>Street: {orderData.formData.street} </p>
      <p>State: {orderData.formData.state} </p>
      <p>Country:  {orderData.formData.country}</p>
      <p>Zipcode:  {orderData.formData.zipcode}</p>
      <p>Phone Number: {orderData.formData.phone}</p>
      <p>Email: {orderData.formData.email}</p>
      <p>Total Price: {orderData.total}</p>
      <button onClick={handleContinue} className="text-white bg-blue-500 p-2 mt-2 rounded-md">Continue Shopping</button>
      <button onClick={handleHistory} className="text-white bg-blue-500 p-2 mt-2 rounded-md ml-2">Check order</button>
    </div>
  );
};

export default OrderSummary;
