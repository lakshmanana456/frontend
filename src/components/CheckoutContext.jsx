import { createContext, useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);

  return (
    <CheckoutContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </CheckoutContext.Provider>
  );
};
