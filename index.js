const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const patientRoutes = require("./routes/patientRoutes");

const app = express();
const port = 3000;
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/patients", patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
