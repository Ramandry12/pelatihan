import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all detail penjualan
router.get("/", async (req, res) => {
  const detailPenjualans = await prisma.tbl_detail_penjualan.findMany({
    include: { penjualan: true, barang: true },
  });
  res.json(detailPenjualans);
});

// Get detail penjualan by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const detailPenjualan = await prisma.tbl_detail_penjualan.findUnique({
    where: { ID_Detail_Penjualan: parseInt(id) },
    include: { penjualan: true, barang: true },
  });
  res.json(detailPenjualan);
});

// Create new detail penjualan
router.post("/", async (req, res) => {
  const { ID_Penjualan, ID_Barang, kuantitas, hargaSatuan, sub_total } =
    req.body;
  const newDetailPenjualan = await prisma.tbl_detail_penjualan.create({
    data: {
      ID_Penjualan,
      ID_Barang,
      kuantitas,
      hargaSatuan,
      sub_total,
    },
  });
  res.json(newDetailPenjualan);
});

// Update detail penjualan
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { ID_Penjualan, ID_Barang, kuantitas, hargaSatuan, sub_total } =
    req.body;
  const updatedDetailPenjualan = await prisma.tbl_detail_penjualan.update({
    where: { ID_Detail_Penjualan: parseInt(id) },
    data: {
      ID_Penjualan,
      ID_Barang,
      kuantitas,
      hargaSatuan,
      sub_total,
    },
  });
  res.json(updatedDetailPenjualan);
});

// Delete detail penjualan
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDetailPenjualan = await prisma.tbl_detail_penjualan.delete({
    where: { ID_Detail_Penjualan: parseInt(id) },
  });
  res.json(deletedDetailPenjualan);
});

export default router;
