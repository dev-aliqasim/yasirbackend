const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
  phone: String,
  medicalRecords: [
    {
      date: { type: Date, default: Date.now },
      bp: String,
      heartRate: String,
      temperature: String,
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
