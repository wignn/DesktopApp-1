
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const WebSocket = require("ws");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const prisma = new PrismaClient();

const applyMiddleware = require("./middleware");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const dataRoutes = require("./dataRoutes");
const messageRoutes = require("./messageRoutes");

applyMiddleware(app); 

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/messages", messageRoutes);

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

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
