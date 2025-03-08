const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // <-- Fixed

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.9orfv.mongodb.net/?retryWrites=true&w=majority&appName=Job-Portal`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB once
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
connectDB();

const db = client.db("mernJobPortal");
const jobsCollections = db.collection("demoJobs");

// POST a job
app.post("/post-job", async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    const result = await jobsCollections.insertOne(body);

    if (result.insertedId) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ message: "Failed to insert job" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET all jobs
app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await jobsCollections.find({}).toArray();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get sigle job by id
app.get("/all-jobs/:id", async (req, res) => {
  try {
    const id = req.params.id
    const job = await jobsCollections.findOne({
      _id: new ObjectId(id)
    })
    res.send(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//Get jobs by email
app.get("/myJobs/:email", async(req, res) => {
  // console.log(req.params.email)
  const jobs = await jobsCollections.find({postedBy: req.params.email}).toArray();
  res.send(jobs)
})

// Delete a job
app.delete("/job/:id", async(req,res) => {
  const id = req.params.id
  const filter = {_id: new ObjectId(id)}
  const result = await jobsCollections.deleteOne(filter)
  res.send(result)
})

// Home route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
