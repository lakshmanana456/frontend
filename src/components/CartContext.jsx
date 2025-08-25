import { createContext, useState, useEffect } from "react";
import axios from "axios";
import auth from "../config";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  //  Track Firebase logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        // fetch cart when user logs in
        axios.get(`https://backend-1-v6zd.onrender.com/cart/${user.uid}`)
          .then(res => setCart(res.data.items || []))
          .catch(err => console.error("Error fetching cart:", err));
      } else {
        setUserId(null);
        setCart([]); // reset cart when logged out
      }
    });
    return () => unsubscribe();
  }, []);

  const normalizeCart = (items) => {
  return items.map(item => ({
    ...item,
    productId: typeof item.productId === "object" ? item.productId._id : item.productId
  }));
};

  //  Add to cart
  const addToCart = async (product) => {
    if (!userId) return alert("Please login to add items to your cart");

    const res = await axios.post(`https://backend-1-v6zd.onrender.com/cart/${userId}/add`, {
      productId: product._id,
      name: product.name,
      offerPrice: product.offerPrice
    });
    setCart(res.data.items);
  };

  //  Remove from cart
  const removeFromCart = async (id) => {
    if (!userId) return;
    const res = await axios.delete(`https://backend-1-v6zd.onrender.com/cart/${userId}/remove/${id}`);
    setCart(res.data.items);
  };

  //  Increase quantity
  // Increase quantity
const increaseQty = async (id) => {
  if (!userId) return;
  const item = cart.find(p => p.productId === id);
  if (item) {
    const res = await axios.put(`https://backend-1-v6zd.onrender.com/cart/${userId}/update`, {
      productId: id,
      quantity: item.quantity + 1
    });
    setCart(normalizeCart(res.data.items));
  }
};

// Decrease quantity
const decreaseQty = async (id) => {
  if (!userId) return;
  const item = cart.find(p => p.productId === id);
  if (item && item.quantity > 1) {
    const res = await axios.put(`https://backend-1-v6zd.onrender.com/cart/${userId}/update`, {
      productId: id,
      quantity: item.quantity - 1
    });
    setCart(normalizeCart(res.data.items));
  }
};


  //  Clear cart
  const clearCart = async () => {
    if (!userId) return;
    await axios.delete(`https://backend-1-v6zd.onrender.com/cart/${userId}/clear`);
    setCart([]);
  };

  //  Get total
  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
