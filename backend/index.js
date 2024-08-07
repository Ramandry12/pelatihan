import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import BarangRoute from "./routes/BarangRoute.js";
import PenjualanRoute from "./routes/PenjualanRoute.js";
import ShiftRoute from "./routes/ShiftRoute.js";
import DetailPenjualanRoute from "./routes/DetailPenjualanRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/barang", BarangRoute);
app.use("/penjualan", PenjualanRoute);
app.use("/shift", ShiftRoute);
app.use("/detail-penjualan", DetailPenjualanRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running on port " + process.env.APP_PORT);
});
