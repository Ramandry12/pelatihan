import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DosenList = () => {
  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/dosen");
    setDosen(response.data);
  };

  const deleteDosen = async (kd_dosen) => {
    await axios.delete(`http://localhost:5000/dosen/${kd_dosen}`);
    fetchData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Dosen List</h2>
        <Link
          to="/dosen/new"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 inline-block"
        >
          Add New Dosen
        </Link>
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="py-2 px-4 text-left">Kode Dosen</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Alamat</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dosen.map((item) => (
              <tr key={item.kd_dosen} className="border-b border-gray-200">
                <td className="py-2 px-4">{item.kd_dosen}</td>
                <td className="py-2 px-4">{item.nama}</td>
                <td className="py-2 px-4">{item.alamat}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/dosen/edit/${item.kd_dosen}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDosen(item.kd_dosen)}
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

export default DosenList;
