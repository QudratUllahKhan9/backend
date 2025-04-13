import mongoose from 'mongoose';
import Data from '../models/Data';  // Import your Data model

export default async function handler(req, res) {
  // Only handle GET requests
  if (req.method === 'GET') {
    try {
      const { id } = req.query;  // Get the ID from the query params (e.g., /api/data?id=2467270621)
      const data = await Data.findOne({ id });  // Query the database for that ID

      if (data) {
        return res.status(200).json(data);  // Return the data if found
      } else {
        return res.status(404).json({ message: "❌ No data found with this ID." });
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      return res.status(500).json({ message: "❌ Internal Server Error" });
    }
  } else {
    // Handle non-GET requests
    return res.status(405).json({ message: "❌ Method Not Allowed" });
  }
}
