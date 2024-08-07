import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/matkul", async (req, res) => {
  try {
    const dosen =
      await prisma.tbl_matkul_andryramadhanp_andryramadhanp.findMany();
    res.json(dosen);
  } catch (error) {
    console.log(error, "ero");
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
