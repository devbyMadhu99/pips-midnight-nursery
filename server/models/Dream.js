
const mongoose = require("mongoose");

const dreamSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true },
  symbol: { type: String, default: "🌙" },
  favourite: { type: Boolean, default: false },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dream", dreamSchema);
