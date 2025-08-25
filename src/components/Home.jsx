import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import WeOffer from "./WeOffer";
import { FaRupeeSign, FaStar } from "react-icons/fa";

const Home = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [latestcollection, setLatestcollection] = useState([])

  useEffect(() => {
    axios.get("https://backend-1-v6zd.onrender.com/productlist").then((res) => {
      const allProducts = res.data;

      //  Bestseller
      setBestsellers(allProducts.filter((p) => p.bestseller === true));

      //  Latest collection (take last 8 added products)
      const latest = [...allProducts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);

      setLatestcollection(latest);
    });
  }, []);

  return (
    <div>
      <Hero />
      {/* latest collection */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Latest Collection</h2>
        {latestcollection.length === 0 ? (
          <p className="text-gray-500">No Latest collection here.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 ">
            {latestcollection.map((p) => (
              <Link to={`/productdetails/${p._id}`} key={p._id}

                className="bg-white shadow-md  p-4  transition group border"
              >
                <img
                  src={`https://backend-1-v6zd.onrender.com${p.imageUrl}`}
                  alt={p.name}
                  className="w-44 h-40 mx-auto rounded-md group- transition-all group-hover:scale-105 duration-300 object-contain"
                />
                <div className="mt-3">
                  <h3 className="font-bold text-gray-800 text-lg ">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{p.storage}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-white bg-green-500 flex items-center px-2 py-0.5 rounded-md text-sm">
                    {p.rating}
                    <FaStar className="ml-1 text-xs" />
                  </p>
                  <span className="text-gray-600 text-sm">
                    ({p.ratingCount})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <p className="flex items-center line-through text-gray-400 text-sm">
                    <FaRupeeSign /> {p.originalPrice}
                  </p>
                  <p className="flex items-center font-semibold text-green-600">
                    <FaRupeeSign /> {p.offerPrice}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      {/*  Best Seller Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
        {bestsellers.length === 0 ? (
          <p className="text-gray-500">No bestsellers available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {bestsellers.map((p) => (
              <Link to={`/productdetails/${p._id}`} key={p._id}

                className="bg-white shadow-md border group p-4  transition "
              >
                <img
                  src={`https://backend-1-v6zd.onrender.com/product/image/${p._id}`}
                  alt={p.name}
                  className="w-48 h-40  mx-auto rounded-md group-hover:scale-105 transform transition-all duration-300 object-contain"
                />
                <div className="mt-3">
                  <h3 className="font-bold text-gray-800 text-lg ">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{p.storage}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-white bg-green-500 flex items-center px-2 py-0.5 rounded-md text-sm">
                    {p.rating}
                    <FaStar className="ml-1 text-xs" />
                  </p>
                  <span className="text-gray-600 text-sm">
                    ({p.ratingCount})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <p className="flex items-center line-through text-gray-400 text-sm">
                    <FaRupeeSign /> {p.originalPrice}
                  </p>
                  <p className="flex items-center font-semibold text-green-600">
                    <FaRupeeSign /> {p.offerPrice}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <WeOffer />

    </div>
  );
};

export default Home;
