import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { SearchContext } from "./SearchContext";
import auth from "../config";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const { searchTerm } = useContext(SearchContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [log, setLog] = useState(false);
  const [admin, setAdmin] = useState(false)

  // New product state
  const [newProduct, setNewProduct] = useState({
    category: "",
    imgFile: null,
    name: "",
    storage: "",
    originalPrice: "",
    offerPrice: "",
    rating: "",
    ratingCount: "",
    description: "",
    bestseller: false,
    imageUrl: ""
  });

  // Fetch products
  useEffect(() => {
    axios.get("http://localhost:5000/productlist").then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Auth check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLog(true);
        setAdmin(user.uid === "Wk7CsXgflWMbIpHsYQJ0mjsxdad2");
      } else {
        setLog(false);
        setAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);



  // Unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Search + Category Filter
  const searchProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryFilteredProducts =
    selectedCategories.length > 0
      ? searchProducts.filter((p) => selectedCategories.includes(p.category))
      : searchProducts;

  // Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, imgFile: file });
    }
  };

  // Category checkbox change
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    try {
      const res = await axios.post("http://localhost:5000/addproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, res.data]);
      resetForm();
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  // Update product
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newProduct) {
      if (key === "imgFile" && !newProduct.imgFile) continue; // skip empty image
      formData.append(key, newProduct[key]);
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/updateproduct/${editingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProducts(products.map((p) => (p._id === editingId ? res.data : p)));
      resetForm();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Reset form
  const resetForm = () => {
    setNewProduct({
      category: "",
      imgFile: null,
      name: "",
      storage: "",
      originalPrice: "",
      offerPrice: "",
      rating: "",
      ratingCount: "",
      description: "",
      bestseller: false,
      imageUrl: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = null;
    setIsEditing(false);
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingId(product._id);
    setNewProduct({
      category: product.category,
      imgFile: null, // new file optional
      name: product.name,
      storage: product.storage,
      originalPrice: product.originalPrice,
      offerPrice: product.offerPrice,
      rating: product.rating,
      ratingCount: product.ratingCount,
      description: product.description,
      bestseller: product.bestseller,
      imageUrl: product.imageUrl,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div>
      {/* Add/Edit Form */}
      {admin && (
        <form
          ref={formRef}
          onSubmit={isEditing ? updateProduct : addProduct}
          className="bg-gray-100 p-4 rounded-md shadow-md mb-6 space-y-2 mt-4"
        >
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>

          <input
            list="categoryOptions"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            placeholder="Select or type category"
            className="p-2 border rounded-md w-full"
            required
          />
          <datalist id="categoryOptions">
            {categories.map((cat, i) => (
              <option key={i} value={cat} />
            ))}
          </datalist>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded-md w-full"
            required={!isEditing}
          />

          {[
            { name: "name", placeholder: "Product Name" },
            { name: "storage", placeholder: "Storage / Color" },
            { name: "originalPrice", placeholder: "Original Price" },
            { name: "offerPrice", placeholder: "Offer Price" },
            { name: "rating", placeholder: "Rating (e.g. 4.6)" },
            { name: "ratingCount", placeholder: "Rating Count" },
          ].map((field, index) => (
            <input
              key={index}
              type="text"
              name={field.name}
              value={newProduct[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="p-2 border rounded-md w-full"
              required
            />
          ))}

          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          ></textarea>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="bestseller"
              checked={newProduct.bestseller}
              onChange={(e) =>
                setNewProduct({ ...newProduct, bestseller: e.target.checked })
              }
            />
            Mark as Bestseller
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* Filters + Products */}
      <div className="px-6 py-8  gap-10 lg:flex ">
        {/* Sidebar */}
        <div className="w-60 bg-white p-3 rounded-lg shadow-md mb-2">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Filter by Category
          </h2>
          <div className="space-y-3 ">
            {categories.map((cat, i) => (
              <label
                key={i}
                className="flex items-center gap-2  rounded-md cursor-pointer hover:bg-gray-100 transition"
              >
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={handleCategoryChange}
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          {categoryFilteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center mt-20 text-lg">
              No products found
            </p>
          ) : (
            <>
              <h1 className="font-semibold text-xl mb-2">ALL COLLECTIONS —</h1>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 lg:gap-14 gap-8 md:grid-cols-3 sm:grid-cols-3">
                {categoryFilteredProducts.map((data) => (
                  <Link
                    to={`/productdetails/${data._id}`}
                    key={data._id}
                    className="bg-white border shadow-md  p-4 group"
                  >
                    {/* Product Image */}
                    <div className="overflow-hidden rounded-lg ">
                      <img
                        className="w-44 h-40 mx-auto object-contain transform group-hover:scale-105 transition duration-300"
                        src={`http://localhost:5000${data.imageUrl}`}
                        alt={data.name}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="mt-3">
                      <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
                        {data.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{data.storage}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-white bg-green-500 flex items-center px-2 py-0.5 rounded-md text-sm">
                        {data.rating}
                        <FaStar className="ml-1 text-xs" />
                      </p>
                      <span className="text-gray-600 text-sm">({data.ratingCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                      <p className="flex items-center line-through text-gray-400 text-sm">
                        <FaRupeeSign /> {data.originalPrice}
                      </p>
                      <p className="flex items-center font-semibold text-green-600">
                        <FaRupeeSign /> {data.offerPrice}
                      </p>
                    </div>

                    {/* Admin Actions */}
                    {admin && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEdit(data);
                          }}
                          className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(data._id);
                          }}
                          className="flex-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
