import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onClose, mutate }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!price || isNaN(price)) {
      setError("Price harus berupa angka");
      return;
    }
    await axios.post("http://localhost:5000/products", {
      name: name,
      price: parseInt(price),
    });
    mutate("products");
    onClose();
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      setError("Price must be a number");
    } else {
      setError("");
    }
    setPrice(value);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={saveProduct} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Product Name</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Price</label>
            <input
              type="text"
              className={`w-full py-3 mt-1 border ${
                error ? "border-red-500" : "border-slate-200"
              } rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow`}
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="py-3 px-6 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 font-bold text-white bg-gray-600 hover:bg-gray-500 rounded-lg border-gray-500 hover:shadow"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
