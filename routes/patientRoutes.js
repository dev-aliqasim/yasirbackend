const express = require("express");
const Patient = require("../models/patient");

const router = express.Router();

// Add new patient data
router.post("/", async (req, res) => {
  try {
    const { name, age, email, phone, bp, heartRate, temperature } = req.body;

    let patient = await Patient.findOne({ email });

    if (!patient) {
      patient = new Patient({ name, age, email, phone, medicalRecords: [] });
    }

    patient.medicalRecords.push({ bp, heartRate, temperature });
    await patient.save();

    res.status(201).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get patient data by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all patients data
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();

    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
