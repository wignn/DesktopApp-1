const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const {z} = require('zod')

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

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

app.post("/data", async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const newUser = await prisma.data.create({
      data: {
        Name: validatedData.name,
        Email: validatedData.email,
      Password: validatedData.password,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


app.get("/data", async (req, res) => {
  try {
    const newUser = await prisma.data.findMany();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const intId = parseInt(id, 10);

    if (isNaN(intId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const deletedData = await prisma.data.delete({
      where: {
        id: intId, 
      },
    });

    res.status(200).json({ message: "Data deleted successfully", deletedData });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Failed to delete data" });
  }
});


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
