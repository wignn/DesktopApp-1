const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in" });
  }
});

router.get("/", (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(401).json({ message: "Token expired" });
    res.status(200).json({ token });
  });
});

module.exports = router;
