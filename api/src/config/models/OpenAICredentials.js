const mongoose = require("mongoose");

const openAICredentialsSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OpenAICredentials = mongoose.model(
  "OpenAICredentials",
  openAICredentialsSchema
);

module.exports = OpenAICredentials;
