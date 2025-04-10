document.addEventListener("DOMContentLoaded", function () {
    fetchJobs();
    loadDraftData();
});

document.querySelector(".create-job-btn").addEventListener("click", function () {
    var myModal = new bootstrap.Modal(document.getElementById("createJobModal"));
    myModal.show();
});

document.getElementById("saveDraft").addEventListener("click", function () {
    let formData = {
        jobTitle: document.querySelector("input[placeholder='Enter job title']").value,
        companyName: document.querySelector("input[placeholder='Amazon, Microsoft, Swiggy']").value,
        location: document.getElementById("jobLocation").value,
        jobType: document.getElementById("jobType").value,
        minSalary: document.getElementById("minSalary").value,
        maxSalary: document.getElementById("maxSalary").value,
        applicationDeadline: document.querySelector("input[type='date']").value,
        jobDescription: document.querySelector("textarea").value
    };

    localStorage.setItem("jobDraft", JSON.stringify(formData));
    alert("Draft Saved Successfully!");
});

function loadDraftData() {
    let savedDraft = localStorage.getItem("jobDraft");
    if (savedDraft) {
        let data = JSON.parse(savedDraft);
        document.querySelector("input[placeholder='Enter job title']").value = data.jobTitle;
        document.querySelector("input[placeholder='Amazon, Microsoft, Swiggy']").value = data.companyName;
        document.getElementById("jobLocation").value = data.location;
        document.getElementById("jobType").value = data.jobType;
        document.getElementById("minSalary").value = data.minSalary;
        document.getElementById("maxSalary").value = data.maxSalary;
        document.querySelector("input[type='date']").value = data.applicationDeadline;
        document.querySelector("textarea").value = data.jobDescription;
    }
}

document.getElementById('jobForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const jobData = {
        title: document.getElementById('jobTitle').value,
        location: document.querySelector('select').value,
        minSalary: document.getElementById('minSalary').value,
        maxSalary: document.getElementById('maxSalary').value,
        companyName: document.getElementById('companyName').value,
        jobType: document.querySelectorAll('select')[1].value,
        deadline: document.getElementById('deadline').value,
        description: document.getElementById('jobDescription').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });

        if (response.ok) {
            alert('Job published successfully!');
            document.getElementById('jobForm').reset();
        } else {
            alert('Failed to publish job.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while submitting.');
    }
});


async function fetchJobs() {
    try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const jobs = await response.json();

        let jobListHTML = "";
        jobs.forEach(job => {
            jobListHTML += `<div class="job-item">
                <h3>${job.jobTitle} - ${job.companyName}</h3>
                <p>${job.location} | ${job.jobType} | ₹${job.minSalary} - ₹${job.maxSalary}</p>
                <p><strong>Deadline:</strong> ${new Date(job.applicationDeadline).toDateString()}</p>
                <p>${job.jobDescription}</p>
            </div>`;
        });

        document.getElementById("jobList").innerHTML = jobListHTML;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Failed to load jobs. Please refresh the page.");
    }
}


