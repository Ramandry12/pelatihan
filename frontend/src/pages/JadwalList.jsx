import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JadwalList = () => {
  const [jadwal, setJadwal] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/jadwal");
    setJadwal(response.data);
  };

  const deleteJadwal = async (id) => {
    await axios.delete(`http://localhost:5000/jadwal/${id}`);
    fetchData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Jadwal List</h2>
        <Link
          to="/jadwal/new"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 inline-block"
        >
          Add New Jadwal
        </Link>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Dosen</th>
              <th className="py-2">Matkul</th>
              <th className="py-2">Waktu</th>
              <th className="py-2">Ruang</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((item) => (
              <tr key={item.id}>
                <td className="py-2">{item.id}</td>
                <td className="py-2">{item.dosen.nama}</td>
                <td className="py-2">{item.matkul.nama}</td>
                <td className="py-2">{item.waktu}</td>
                <td className="py-2">{item.ruang}</td>
                <td className="py-2">
                  <Link
                    to={`/jadwal/edit/${item.id}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteJadwal(item.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
  );
};

export default JadwalList;
