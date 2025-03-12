const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String },
  companyName: { type: String },
  minPrice: { type: Number },
  maxPrice: { type: Number },
  salaryType: { type: String, enum: ['Hourly', 'Monthly', 'Yearly'] },
  jobLocation: { type: String },
  postingDate: { type: Date },
  experienceLevel: { type: String, enum: ['NoExperience', 'Internship', 'Work remotely'] },
  skills: [{ type: String }], // Store skills as an array of strings
  companyLogo: { type: String },
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Temporary'] },
  description: { type: String },
  postedBy: { type: String }, // Store email of the poster
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
