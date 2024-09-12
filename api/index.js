const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route to get all users
app.get("/user/f", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Test route
app.get("/test", (req, res) => {
  res.json("test");
});

// Route to create a new user
app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route to create a new user with different field names
app.post("/data", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
