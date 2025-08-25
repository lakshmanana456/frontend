import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaBars, FaSearch } from "react-icons/fa";
import SlideNavbar from "./SlideNavbar";
import { Link } from "react-router-dom";
import auth from "../config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

function Navbar() {

  const { setSearchTerm } = useContext(SearchContext); //search functionality
  const [isOpen, setIsOpen] = useState(false); //like display hide and block
  const inputRef = useRef(null)

  const [log, setLog] = useState(false)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  function handleLogout() {
    signOut(auth)
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setLog(true)
      } else {
        setLog(false)
      }
    })
  }, [])
  return (
    <>

      <nav className="sticky top-0 w-full z-20 flex justify-between items-center  py-4 px-2 bg-blue-200 overflow-visible">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link to={"/home"} className="font-bold text-2xl text-blue-800" style={{ fontFamily: '"Great Vibes", cursive' }}>Awesome</Link>

          <div className="flex  items-center gap-2">
            <div className="flex relative items-center">
              <input
                ref={inputRef}
                onFocus={() => navigate("/productlist")}
                onChange={(e) => setSearchTerm(e.target.value)} //search functionality
                className="  border-2 border-gray-300 rounded-md p-2 w-[38vw]  focus:outline-none focus:border-gray-600"
                type="text"
                placeholder="Search Products..."

              />
              <p
                className="items-center flex absolute right-2"
                onClick={() => {
                  inputRef.current.focus();   // focus input
                  navigate("/productlist");   // redirect to collections
                }}
              >
                <FaSearch className="cursor-pointer" />
              </p>

            </div>

          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center md:space-x-3 space-x-4 text-gray-700 lg:text-md ">
          <Link
            to={"/shoppingcart"}
            className="md:text-sm flex items-center gap-1 hover:text-black cursor-pointer font-bold relative"
          >
            <FaShoppingCart />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to={"/orderhistory"} className="hover:text-black font-bold cursor-pointer ">Orders</Link>
          <Link to={"/contactus"} className="hover:text-black font-bold cursor-pointer ">Contact</Link>
          <Link to={"/productlist"} className="hover:text-black font-bold cursor-pointer ">Collections</Link>


          {log ? <Link onClick={handleLogout} className="font-bold bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
            Logout
          </Link> : <Link to={"/login"} className="font-bold bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
            Login
          </Link>}

        </div>

        {/* Mobile Menu Icon */}
        <div
          className="block md:hidden text-xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </div>
      </nav>

      {/* Slide Navbar */}
      <SlideNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
