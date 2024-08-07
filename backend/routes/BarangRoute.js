import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all barang
router.get("/", async (req, res) => {
  const barangs = await prisma.tbl_barang.findMany({
    include: { detailPenjualans: true },
  });
  res.json(barangs);
});

// Get barang by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const barang = await prisma.tbl_barang.findUnique({
    where: { ID_Barang: parseInt(id) },
    include: { detailPenjualans: true },
  });
  res.json(barang);
});

// Create new barang
router.post("/", async (req, res) => {
  const { namaBarang, satuan, hargaSatuan } = req.body;
  const newBarang = await prisma.tbl_barang.create({
    data: {
      namaBarang,
      satuan,
      hargaSatuan,
    },
  });
  res.json(newBarang);
});

// Update barang
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { namaBarang, satuan, hargaSatuan } = req.body;
  const updatedBarang = await prisma.tbl_barang.update({
    where: { ID_Barang: parseInt(id) },
    data: {
      namaBarang,
      satuan,
      hargaSatuan,
    },
  });
  res.json(updatedBarang);
});

// Delete barang
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBarang = await prisma.tbl_barang.delete({
    where: { ID_Barang: parseInt(id) },
  });
  res.json(deletedBarang);
});

export default router;
