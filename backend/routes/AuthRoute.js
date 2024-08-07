import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

// Register user
router.post("/register", async (req, res) => {
  const { username, namaKasir, alamat, nomorHp, nomorKtp, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.kasir.create({
      data: {
        username,
        namaKasir,
        alamat,
        nomorHp,
        nomorKtp,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.kasir.findUnique({
    where: { username },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.ID_Kasir, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token, username: user.username });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
