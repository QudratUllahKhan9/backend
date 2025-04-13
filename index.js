import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Data from './models/Data';  // Import your Data model

const app = express();

// Enable CORS for all origins (for testing with Postman)
app.use(cors());  // Allow all origins
app.use(express.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)  // Connect to MongoDB using the connection string
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Route to fetch data by unique ID (GET request)
app.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params;  // Extract the ID from the request URL
    const data = await Data.findOne({ id });  // Find user data by the unique ID
    if (data) {
      res.json(data);  // Send the found data as JSON
    } else {
      res.status(404).send("❌ No data found with this ID.");  // Handle if no data found
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).send("❌ Internal Server Error");  // Handle server error
  }
});

// Export for Vercel serverless function (for serverless environments)
export default app;
