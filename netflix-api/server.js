const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbURI = "mongodb://localhost:27017/netflix"; // Replace with your connection string if using MongoDB Atlas
mongoose
  .connect(dbURI) // Removed useNewUrlParser and useUnifiedTopology options
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });

// User Routes
app.use("/api/user", userRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
