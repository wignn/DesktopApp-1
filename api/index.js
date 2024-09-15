const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const WebSocket = require("ws");

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const prisma = new PrismaClient();

app.use(express.json());

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
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

app.post("/data", async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const newUser = await prisma.data.create({
      data: {
        userId: validatedData.id,
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
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

app.get("/dataAcount/:id", async (req, res) => {
  const {id} = req.params
  const userId = parseInt(id,10)
  try {
    const data = await prisma.data.findMany({
      where:{
        userId:userId
      }
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
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
      where: { id: intId },
    });

    res.status(200).json({ message: "Data deleted successfully", deletedData });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Failed to delete data" });
  }
});

app.post("/post", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newPost = await prisma.post.create({
      data: { title, content },
    });

    res.status(200).json({ message: "Data added successfully", newPost });
  } catch (error) {
    console.log("Error adding post:", error);
    res.status(500).json({ error: "Failed to add data" });
  }
});

// Register & hash
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

// Auth route
app.get("/auth", (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(500).json({ message: "Internal error" });
    }
    res.status(200).json({ token });
  });
});

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);
  });
});

//malas pake b ing
app.post('/kirimPesan', async (req, res) => {
  try {
    const { receiverId, text, sender } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ message: 'Receiver ID and text are required' });
    }
    
    const message = await prisma.message.create({
      data: {
        text: text,
        senderId: sender,
        receiverId: receiverId,
      },
    });

    broadcastMessage({ type: 'newMessage', data: message });

    return res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

app.get("/contact", async (req, res) => {
  try {
    const contact = await prisma.user.findMany();
    return res.status(200).json({ contact });
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    return res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.get("/TampilkanPesan/:sender/:receiver", async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const senderId = parseInt(sender, 10);
    const receiverId = parseInt(receiver, 10);
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: receiverId, receiverId: senderId },
          { senderId: senderId, receiverId: receiverId },
        ],
      },
    });
    return res.status(200).json({ messages });
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
