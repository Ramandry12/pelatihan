import React, { useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const { mutate } = useSWRConfig();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <h2>Loading...</h2>;

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    mutate("products");
  };

  const handleEditClick = (productId) => {
    setCurrentProductId(productId);
    setShowEditModal(true);
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </button>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr className="bg-white border-b" key={product.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="py-3 px-6">{product.price}</td>
                  <td className="py-3 px-1 text-center">
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-700"
            >
              &times;
            </button>
            <AddProduct
              onClose={() => setShowAddModal(false)}
              mutate={mutate}
            />
          </div>
        </div>
      )}
      {showEditModal && currentProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-700"
            >
              &times;
            </button>
            <EditProduct
              onClose={() => setShowEditModal(false)}
              mutate={mutate}
              id={currentProductId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
