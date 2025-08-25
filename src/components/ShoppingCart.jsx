import { useContext, useEffect, useState } from "react";
import { FaRupeeSign, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import auth from "../config";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { cart, removeFromCart, increaseQty, decreaseQty, getTotal } =
    useContext(CartContext);

  //  Track Firebase user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u); // set user if logged in, otherwise null
    });
    return () => unsubscribe();
  }, []);

  //  If no user OR no items
  if (!user || cart.length === 0) {
    return (
      <h1 className="text-center mt-10 text-xl">
        🛒 Your cart is empty
      </h1>
    );
  }


  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="lg:text-2xl text-xl font-bold mb-6">Your Shopping Cart</h1>

      {cart.map((item) => {
        const product = item.productId; // sometimes it's an object, sometimes just an id
        const productId = typeof product === "object" ? product._id : product;

        return (
          <div
            key={productId}
            className="flex gap-6 items-center border p-4 rounded-lg shadow-sm bg-white"
          >
            {/* Image */}
            <img
              src={
                typeof product === "object"
                  ? `https://backend-1-v6zd.onrender.com${product.imageUrl}`
                  : `https://backend-1-v6zd.onrender.com/product/image/${productId}`
              }
              alt={item.name || product.name}
              className="lg:w-24 lg:h-24 w-16 h-16 object-cover rounded-md"
            />

            {/* Details */}
            <div className="flex-1">
              <h2 className="font-semibold lg:text-lg">
                {item.name || product.name}
              </h2>
              <p className="flex items-center text-green-600 font-bold">
                <FaRupeeSign /> {item.offerPrice || product.offerPrice}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(productId)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <FaMinus className="lg:text-md text-xs" />
              </button>
              <span className="px-3 font-semibold">{item.quantity}</span>
              <button
                onClick={() => increaseQty(productId)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <FaPlus className="lg:text-md text-xs" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to remove this item from the cart?")) {
                  removeFromCart(productId);
                }
              }}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>

          </div>
        );
      })}


      {/* Total Section */}
      <div className="mt-6 flex justify-between items-center p-4 border-t">
        <h2 className="lg:text-xl font-semibold">
          Total:{" "}
          <span className="text-green-600 flex items-center">
            <FaRupeeSign /> {getTotal()}
          </span>
        </h2>
        <button
          onClick={handleCheckout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-xs lg:text-lg font-semibold shadow-md"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
