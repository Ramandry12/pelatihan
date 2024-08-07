import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DosenForm = () => {
  const [kdDosen, setKdDosen] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const { kd_dosen } = useParams();

  useEffect(() => {
    if (kd_dosen) {
      fetchDosen(kd_dosen);
    }
  }, [kd_dosen]);

  const fetchDosen = async (kd_dosen) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/dosen/${kd_dosen}`
      );
      const { kd_dosen: kdDosen, nama, alamat } = response.data;
      setKdDosen(kdDosen);
      setNama(nama);
      setAlamat(alamat);
    } catch (error) {
      console.error("There was an error fetching the dosen data!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dosen = { kd_dosen: parseInt(kdDosen), nama, alamat };

    try {
      if (kd_dosen) {
        // Update dosen
        await axios.put(`http://localhost:5000/dosen/${kd_dosen}`, dosen);
      } else {
        // Add new dosen
        await axios.post("http://localhost:5000/dosen", dosen);
      }
      navigate("/dosen");
    } catch (error) {
      console.error("There was an error saving the dosen data!", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {kd_dosen ? "Edit Dosen" : "Add New Dosen"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Kode Dosen:</label>
            <input
              type="text"
              value={kdDosen}
              onChange={(e) => setKdDosen(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!!kd_dosen} // Disable input field for editing
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nama:</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Alamat:</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {kd_dosen ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DosenForm;
