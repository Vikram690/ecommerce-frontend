const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000; // backend will run here

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("✅ MongoDB connected successfully");
});

// Basic test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  console.log("📩 Signup data received:");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password); // real project me encrypt karenge

  // Abhi ke liye simple response
  res.json({ message: "Signup data received on backend ✅" });
});
