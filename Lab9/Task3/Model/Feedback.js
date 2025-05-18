const mongoose = require("mongoose");

// Feedback Schema
const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading and trailing whitespaces
      maxlength: 100, // Maximum length for the name field
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Converts email to lowercase
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Regex for email validation
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000, // Maximum length for messages
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps

// Create the Feedback model
module.exports = mongoose.model("Feedback", feedbackSchema);
