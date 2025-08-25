import { useEffect, useState } from "react";
import { FaShoppingCart, FaHome, FaShoppingBag, FaPhone, FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";
import auth from "../config";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const SlideNavbar = ({ isOpen, setIsOpen }) => {
  const [log, setLog] = useState(false);
  const { cart } = useContext(CartContext)

  const sideNavLinks = [
    { to: "/home", icon: <FaHome />, name: "Home" },
    { to: "/productlist", icon: <FaShoppingBag />, name: "Collections" },
    { to: "/shoppingcart", icon: <FaShoppingCart />, name: "Cart" },
    { to: "/orderhistory", icon: <FaBox />, name: "Orders" },
    { to: "/contactus", icon: <FaPhone />, name: "Contact" },
    { to: "/login", name: "Login" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLog(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section
      id="sidenav"
      className={`md:hidden bg-blue-200 fixed z-20 top-0 transition-all duration-1000 w-[40%] h-[100vh] ${isOpen ? "right-0" : "right-[-40%]"
        }`}
    >
      <div className="text-right p-5">
        <p
          id="closenav"
          className="cursor-pointer inline p-2"
          onClick={() => setIsOpen(false)}
        >
          X
        </p>
      </div>

      <ul className="flex flex-col gap-8 items-start ml-10 text-blue-800 text-md font-semibold">
        {sideNavLinks.map((data, i) => {
          if (data.name === "Login") {
            return log ? (
              // Logout button (stay on same page)
              <button
                key={i}
                onClick={() => auth.signOut()}
                className="bg-blue-600 text-white px-2 py-1 rounded-md flex items-center hover:bg-blue-700 gap-1"
              >
                {data.icon}
                Logout
              </button>
            ) : (
              // Login link (navigate to login page)
              <Link
                key={i}
                to={data.to}
                className="bg-blue-600 text-white px-2 py-1 rounded-md flex items-center hover:bg-blue-700 gap-1"
              >
                {data.icon}
                Login
              </Link>
            );
          }

          // Normal navigation links
          return (
            <Link
              key={i}
              to={data.to}
              className="flex items-center hover:underline hover:text-blue-950 gap-1 relative"
            >
              {data.icon}
              {data.name}

              {data.name === "Cart" && cart.length > 0 && (
                <span className="absolute -top-1 left-2 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default SlideNavbar;
