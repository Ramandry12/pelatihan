import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all shift
router.get("/", async (req, res) => {
  const shifts = await prisma.tbl_shift.findMany({
    include: { penjualans: true, kasir: true },
  });
  res.json(shifts);
});

// Get shift by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const shift = await prisma.tbl_shift.findUnique({
    where: { ID_Shift: parseInt(id) },
    include: { penjualans: true, kasir: true },
  });
  res.json(shift);
});

// Create new shift
router.post("/", async (req, res) => {
  const {
    ID_Kasir,
    waktuBuka,
    saldoAwal,
    jumlahPenjualan,
    saldoAkhir,
    waktuTutup,
    status,
  } = req.body;
  const newShift = await prisma.tbl_shift.create({
    data: {
      ID_Kasir,
      waktuBuka,
      saldoAwal,
      jumlahPenjualan,
      saldoAkhir,
      waktuTutup,
      status,
    },
  });
  res.json(newShift);
});

// Update shift
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    ID_Kasir,
    waktuBuka,
    saldoAwal,
    jumlahPenjualan,
    saldoAkhir,
    waktuTutup,
    status,
  } = req.body;
  const updatedShift = await prisma.tbl_shift.update({
    where: { ID_Shift: parseInt(id) },
    data: {
      ID_Kasir,
      waktuBuka,
      saldoAwal,
      jumlahPenjualan,
      saldoAkhir,
      waktuTutup,
      status,
    },
  });
  res.json(updatedShift);
});

// Delete shift
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedShift = await prisma.tbl_shift.delete({
    where: { ID_Shift: parseInt(id) },
  });
  res.json(deletedShift);
});

export default router;
