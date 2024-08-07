import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js"; // Import rute otentikasi
import JadwalRoute from "./routes/JadwalRoute.js";
import DosenRoute from "./routes/DosenRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(AuthRoute);
app.use(JadwalRoute);
app.use(DosenRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running on port " + process.env.APP_PORT);
});
