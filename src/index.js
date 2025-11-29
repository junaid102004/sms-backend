import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("SMS Backend running...");
});

// Create user
app.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await prisma.user.create({
      data: { email, name, password }
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
