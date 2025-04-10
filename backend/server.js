const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./models/Job"); 
const path = require('path');


const app = express();
app.use(express.json()); 
app.use(cors()); 

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/jobDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error(" MongoDB Connection Error:", error));


app.post("/api/jobs", async (req, res) => {
    try {
        const newJob = new Job({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public'))); 


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

