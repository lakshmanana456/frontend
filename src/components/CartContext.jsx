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

  //  Add to cart
  const addToCart = async (product) => {
    if (!userId) return alert("Please login to add items to your cart");

    const res = await axios.post(`https://backend-1-v6zd.onrender.com/cart/${userId}/add`, {
      productId: product._id,
      name: product.name,
      storage: product.storage,
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
  const increaseQty = async (id) => {
    if (!userId) return;

    const item = cart.find((p) => {
      const productId =
        typeof p.productId === "object" ? p.productId._id : p.productId;
      return productId === id;
    });

    if (item) {
      // normalize id before sending
      const productId =
        typeof item.productId === "object" ? item.productId._id : item.productId;

      const res = await axios.put(
        `https://backend-1-v6zd.onrender.com/cart/${userId}/update`,
        {
          productId,
          quantity: item.quantity + 1,
        }
      );

      setCart(res.data.items);
    }
  };

  const decreaseQty = async (id) => {
    if (!userId) return;

    const item = cart.find((p) => {
      const productId =
        typeof p.productId === "object" ? p.productId._id : p.productId;
      return productId === id;
    });

    if (item && item.quantity > 1) {
      const productId =
        typeof item.productId === "object" ? item.productId._id : item.productId;

      const res = await axios.put(
        `https://backend-1-v6zd.onrender.com/cart/${userId}/update`,
        {
          productId,
          quantity: item.quantity - 1,
        }
      );

      setCart(res.data.items);
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
