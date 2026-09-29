const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.post("/api/books", async (req, res) => {
  try {
    const { title, author, isbn, category, publicationYear } = req.body;

    if (!title || !author || !isbn || !category || !publicationYear)
      return res.status(400).json({ message: "All fields are required" });

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      publicationYear
    });

    res.status(201).json({
      message: "Book added successfully",
      book
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));