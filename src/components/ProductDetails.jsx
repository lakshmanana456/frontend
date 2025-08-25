import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "./CartContext";
import auth from "../config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [log, setLog] = useState(false); // login state
  const navigate = useNavigate();

  // Fetch product
  useEffect(() => {
    axios.get(`https://backend-1-v6zd.onrender.com/product/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  // Auth check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLog(true);
      } else {
        setLog(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!product) return

  const handleAddToCart = () => {
    if (!log) {
      toast.error("Please login and Continue");
      setTimeout((function () {
        navigate("/login")
      }), 3000)
      return;
    }
    addToCart(product);
    toast.success("Product added to cart!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 gap-10">
      {/* Image */}
      <div className="flex justify-center items-center">
        <img
          src={`https://backend-1-v6zd.onrender.com${product.imageUrl}`}
          alt={product.name}
          className="w-96 h-96 rounded-2xl shadow-lg border"
        />
      </div>

      {/* Info */}
      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-500">Storage: {product.storage}</p>

        <div className="flex items-center gap-2">
          <span className="flex items-center bg-green-500 text-white px-2 py-1 rounded-md text-sm">
            {product.rating} <FaStar className="ml-1 text-xs" />
          </span>
          <span className="text-gray-600 text-sm">
            ({product.ratingCount} reviews)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <p className="flex items-center line-through text-gray-400 text-lg">
            <FaRupeeSign /> {product.originalPrice}
          </p>
          <p className="flex items-center text-2xl font-bold text-green-600">
            <FaRupeeSign /> {product.offerPrice}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition shadow-md"
        >
          <FaShoppingCart /> Add to Cart
        </button>

        {/* Description */}
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Product Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default ProductDetails;
