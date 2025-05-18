// MongoDB Schema for Lab 9
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Student Schema (for Task1)
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Product Schema (for Task2)
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Job Schema (for Task4)
const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  salary: {
    type: Number,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

// Applicant Schema (for Task4)
const ApplicantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewing", "Accepted", "Rejected"],
    default: "Pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

// Create models
const Student = mongoose.model("Student", StudentSchema);
const Product = mongoose.model("Product", ProductSchema);
const Job = mongoose.model("Job", JobSchema);
const Applicant = mongoose.model("Applicant", ApplicantSchema);

// Export models
module.exports = {
  Student,
  Product,
  Job,
  Applicant,
};
