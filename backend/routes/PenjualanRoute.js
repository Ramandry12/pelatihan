import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all penjualan
router.get("/", async (req, res) => {
  const penjualans = await prisma.tbl_penjualan.findMany({
    include: { detailPenjualans: true, shift: true },
  });
  res.json(penjualans);
});

// Get penjualan by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const penjualan = await prisma.tbl_penjualan.findUnique({
    where: { ID_Penjualan: parseInt(id) },
    include: { detailPenjualans: true, shift: true },
  });
  res.json(penjualan);
});

// Create new penjualan
router.post("/", async (req, res) => {
  const { waktuTransaksi, total, ID_Shift } = req.body;
  const newPenjualan = await prisma.tbl_penjualan.create({
    data: {
      waktuTransaksi,
      total,
      ID_Shift,
    },
  });
  res.json(newPenjualan);
});

// Update penjualan
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { waktuTransaksi, total, ID_Shift } = req.body;
  const updatedPenjualan = await prisma.tbl_penjualan.update({
    where: { ID_Penjualan: parseInt(id) },
    data: {
      waktuTransaksi,
      total,
      ID_Shift,
    },
  });
  res.json(updatedPenjualan);
});

// Delete penjualan
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPenjualan = await prisma.tbl_penjualan.delete({
    where: { ID_Penjualan: parseInt(id) },
  });
  res.json(deletedPenjualan);
});

export default router;
