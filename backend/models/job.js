const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    location: String,
    minSalary: Number,
    maxSalary: Number,
    companyName: String,
    jobType: String,
    deadline: String,
    description: String
});

module.exports = mongoose.model('Job', jobSchema);
