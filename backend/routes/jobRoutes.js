const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Job = require("../models/job");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/", async (req, res) => {
    const job = new Job({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        location: req.body.location
    });

    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const job = await Job.findById(id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: "Job not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: "Job not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const job = await Job.findByIdAndDelete(id);
        if (job) {
            res.json({ message: "Job deleted" });
        } else {
            res.status(404).json({ message: "Job not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
