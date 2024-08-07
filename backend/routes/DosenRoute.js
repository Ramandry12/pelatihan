import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/dosen", async (req, res) => {
  try {
    const dosen = await prisma.tbl_dosen_andryramadhanp.findMany();
    res.json(dosen);
  } catch (error) {
    console.log(error, "ero");
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/dosen/:kd_dosen", async (req, res) => {
  const { kd_dosen } = req.params;
  try {
    const dosen = await prisma.tbl_dosen_andryramadhanp.findUnique({
      where: { kd_dosen: parseInt(kd_dosen) },
    });
    if (!dosen) {
      return res.status(404).json({ error: "Dosen not found" });
    }
    res.json(dosen);
  } catch (error) {
    console.log(error, "ero");
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/dosen", async (req, res) => {
  const { kd_dosen, nama, alamat } = req.body;
  try {
    const dosen = await prisma.tbl_dosen_andryramadhanp.create({
      data: {
        kd_dosen: parseInt(kd_dosen),
        nama,
        alamat,
      },
    });
    res.json(dosen);
  } catch (error) {
    console.log(error, "ero");
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/dosen/:kd_dosen", async (req, res) => {
  const { kd_dosen } = req.params;
  const { nama, alamat } = req.body;
  try {
    const dosen = await prisma.tbl_dosen_andryramadhanp.update({
      where: { kd_dosen: parseInt(kd_dosen) },
      data: {
        nama,
        alamat,
      },
    });
    res.json(dosen);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/dosen/:kd_dosen", async (req, res) => {
  const { kd_dosen } = req.params;
  try {
    await prisma.tbl_dosen_andryramadhanp.delete({
      where: { kd_dosen: parseInt(kd_dosen) },
    });
    res.json({ message: "Dosen deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
