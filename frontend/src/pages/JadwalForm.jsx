import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const JadwalForm = () => {
  const [namaBarang, setNamaBarang] = useState("");
  const [satuan, setSatuan] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBarang();
    }
  }, [id]);

  const fetchBarang = async () => {
    const response = await axios.get(`http://localhost:5000/barang/${id}`);
    const { namaBarang, satuan, hargaSatuan } = response.data;
    setNamaBarang(namaBarang);
    setSatuan(satuan);
    setHargaSatuan(hargaSatuan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const barang = { namaBarang, satuan, hargaSatuan };

    if (id) {
      await axios.put(`http://localhost:5000/barang/${id}`, barang);
    } else {
      await axios.post("http://localhost:5000/barang", barang);
    }

    navigate("/barang");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {id ? "Edit Barang" : "Add New Barang"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Barang:</label>
            <input
              type="text"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Satuan:</label>
            <input
              type="text"
              value={satuan}
              onChange={(e) => setSatuan(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Harga Satuan:</label>
            <input
              type="number"
              value={hargaSatuan}
              onChange={(e) => setHargaSatuan(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JadwalForm;
