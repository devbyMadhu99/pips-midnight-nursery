
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("DNS servers:", dns.getServers());

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Dream = require("./models/Dream");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Pip's Midnight Nursery backend is running! 🌙",
  });
});

// Get all saved dreams
app.get("/api/dreams", async (req, res) => {
  try {
    const dreams = await Dream.find().sort({ savedAt: -1 });
    res.json(dreams);
  } catch (error) {
    console.error("Failed to load dreams:", error.message);
    res.status(500).json({ message: "Failed to load dreams" });
  }
});

// Save a dream
app.post("/api/dreams", async (req, res) => {
  try {
    const { title, text, symbol, favourite, savedAt } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof text !== "string" ||
      !text.trim()
    ) {
      return res.status(400).json({
        message: "Title and text are required",
      });
    }

    const dream = await Dream.create({
      title: title.trim(),
      text: text.trim(),
      symbol,
      favourite,
      savedAt,
    });

    res.status(201).json(dream);
  } catch (error) {
    console.error("Failed to save dream:", error.message);
    res.status(500).json({ message: "Failed to save dream" });
  }
});

 // Update a dream (for favourites)
app.patch("/api/dreams/:id", async (req, res) => {
  try {
    const dream = await Dream.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!dream) {
      return res.status(404).json({ message: "Dream not found" });
    }

    res.json(dream);
  } catch (error) {
    res.status(500).json({ message: "Failed to update dream" });
  }
});

// Delete a dream
app.delete("/api/dreams/:id", async (req, res) => {
  try {
    const dream = await Dream.findByIdAndDelete(req.params.id);

    if (!dream) {
      return res.status(404).json({ message: "Dream not found" });
    }

    res.json({ message: "Dream deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete dream" });
  }
});


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully! 🌙");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
