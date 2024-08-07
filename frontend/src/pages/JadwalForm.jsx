import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const JadwalForm = () => {
  const [kdDosen, setKdDosen] = useState("");
  const [kdMatkul, setKdMatkul] = useState("");
  const [waktu, setWaktu] = useState("");
  const [ruang, setRuang] = useState("");
  const [dosen, setDosen] = useState([]);
  const [matkul, setMatkul] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDosen();
    fetchMatkul();
    if (id) {
      fetchJadwal();
    }
  }, [id]);

  const fetchDosen = async () => {
    const response = await axios.get("http://localhost:5000/dosen");
    setDosen(response.data);
  };

  const fetchMatkul = async () => {
    const response = await axios.get("http://localhost:5000/matkul");
    setMatkul(response.data);
  };

  const fetchJadwal = async () => {
    const response = await axios.get(`http://localhost:5000/jadwal/${id}`);
    const { kd_dosen, kd_matkul, waktu, ruang } = response.data;
    setKdDosen(kd_dosen);
    setKdMatkul(kd_matkul);
    setWaktu(waktu);
    setRuang(ruang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jadwal = { kd_dosen: kdDosen, kd_matkul: kdMatkul, waktu, ruang };

    if (id) {
      await axios.put(`http://localhost:5000/jadwal/${id}`, jadwal);
    } else {
      await axios.post("http://localhost:5000/jadwal", jadwal);
    }

    navigate("/jadwal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {id ? "Edit Jadwal" : "Add New Jadwal"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Dosen:</label>
            <select
              value={kdDosen}
              onChange={(e) => setKdDosen(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Dosen</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Matkul:</label>
            <select
              value={kdMatkul}
              onChange={(e) => setKdMatkul(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Matkul</option>
              {matkul.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Waktu:</label>
            <input
              type="text"
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ruang:</label>
            <input
              type="text"
              value={ruang}
              onChange={(e) => setRuang(e.target.value)}
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
