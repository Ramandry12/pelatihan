import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import JadwalList from "./pages/JadwalList";
import JadwalForm from "./pages/JadwalForm";
import DosenList from "./pages/DosenList";
import DosenForm from "./pages/DosenForm";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jadwal"
            element={
              <ProtectedRoute>
                <JadwalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jadwal/new"
            element={
              <ProtectedRoute>
                <JadwalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jadwal/edit/:id"
            element={
              <ProtectedRoute>
                <JadwalForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dosen"
            element={
              <ProtectedRoute>
                <DosenList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dosen/new"
            element={
              <ProtectedRoute>
                <DosenForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dosen/edit/:kd_dosen"
            element={
              <ProtectedRoute>
                <DosenForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
