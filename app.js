document.addEventListener("DOMContentLoaded", function () {
    const jobList = document.getElementById("job-list");
    const jobForm = document.getElementById("job-form");

    
    async function fetchJobs() {
        try {
            const response = await fetch("http://localhost:5000/api/jobs");
            const jobs = await response.json();
            
            jobList.innerHTML = jobs.length ? "" : "<p>No jobs available</p>";

            jobs.forEach(job => {
                const jobItem = document.createElement("li");
                jobItem.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <p><strong>${job.company}</strong> - ${job.location}</p>
                `;
                jobList.appendChild(jobItem);
            });
        } catch (error) {
            console.error("Error fetching jobs:", error);
            jobList.innerHTML = "<p>Failed to load jobs. Try again later.</p>";
        }
    }

 
    jobForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const jobData = {
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("description").value.trim(),
            company: document.getElementById("company").value.trim(),
            location: document.getElementById("location").value.trim()
        };

        if (!jobData.title || !jobData.description || !jobData.company || !jobData.location) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData)
            });

            if (!response.ok) throw new Error("Failed to add job");

            fetchJobs(); 
            jobForm.reset();
        } catch (error) {
            console.error("Error adding job:", error);
            alert("Failed to add job. Please try again.");
        }
    });

    fetchJobs(); 
});
