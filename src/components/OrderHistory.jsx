import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../config";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // just set empty orders
        setOrders([]);
        setLoading(false);
      } else {
        try {
          const res = await axios.get(
            `https://backend-1-v6zd.onrender.com/orders/${user.uid}`
          );
          setOrders(res.data);
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch order history");
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
  }

  if (orders.length === 0) {
    return <h1 className="text-center mt-10 text-xl text-gray-600">No orders found</h1>;
  }

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="font-semibold text-lg">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {item.offerPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t mt-3 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="flex items-center text-blue-600">
                <FaRupeeSign className="mr-1" />
                {order.total}
              </span>
            </div>

            {/* Extra Info */}
            <div className="mt-2 text-sm text-gray-600 flex justify-between">
              <span>
                Payment:{" "}
                <span className="font-medium">{order.paymentMethod}</span>
              </span>
              <span>
                Status:{" "}
                <span
                  className={`font-semibold ${order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                      ? "text-orange-600"
                      : "text-gray-600"
                    }`}
                >
                  {order.status}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderHistory;
