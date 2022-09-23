const mongoose = require("mongoose");

const momSchema = new mongoose.Schema({
  momName: {
    type: String,
    required: true,
  },

  momEmail: {
    type: String,
    required: true,
  },

  childName: {
    type: String,
    required: true,
  },

  childEmail: {
    type: String,
    required: true,
  },

  childFirstName: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mom", momSchema);
