import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/matkul", async (req, res) => {
  try {
    const matkul = await prisma.tbl_matkul_andryramadhanp.findMany();
    res.json(matkul);
  } catch (error) {
    console.log(error, "ero");
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/jadwal", async (req, res) => {
  try {
    const jadwal = await prisma.tbl_jadwal_andryramadhanp.findMany({
      include: {
        dosen: true,
        matkul: true,
        krs: true,
      },
    });
    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get jadwal by id
router.get("/jadwal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jadwal = await prisma.tbl_jadwal_andryramadhanp.findUnique({
      where: { id: parseInt(id) },
      include: {
        dosen: true,
        matkul: true,
        krs: {
          include: {
            siswa: true,
            semester: true,
          },
        },
      },
    });
    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Create new jadwal
router.post("/jadwal", async (req, res) => {
  const { kd_dosen, kd_matkul, waktu, ruang } = req.body;
  try {
    const jadwal = await prisma.tbl_jadwal_andryramadhanp.create({
      data: {
        waktu,
        ruang,
        dosen: {
          connect: { id: parseInt(kd_dosen) },
        },
        matkul: {
          connect: { id: parseInt(kd_matkul) },
        },
      },
    });
    res.json(jadwal);
  } catch (error) {
    console.log(error, "rrr");
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update jadwal by id
router.put("/jadwal/:id", async (req, res) => {
  const { id } = req.params;
  const { kd_dosen, kd_matkul, waktu, ruang } = req.body;
  try {
    const jadwal = await prisma.tbl_jadwal_andryramadhanp.update({
      where: { id: parseInt(id) },
      data: {
        waktu,
        ruang,
        dosen: {
          connect: { id: parseInt(kd_dosen) },
        },
        matkul: {
          connect: { id: parseInt(kd_matkul) },
        },
      },
    });
    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/jadwal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tbl_jadwal_andryramadhanp.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Jadwal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
