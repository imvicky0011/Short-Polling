const app = require("express")()
const jobs = {}

app.get("/", (req, res) => {
    res.send("Welcome to the server")
})

app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0
    updateJob(jobId, 0)
    res.end("\n\n " + jobId + "\n\n")
})

app.get("/checkstatus", (req, res) => {
    console.log(jobs[req.query.jobId])
    res.end("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n")
})

function updateJob(jobId, prg) {
    jobs[jobId] = prg
    console.log(`updated ${jobId} to ${prg}`)
    if(prg === 100) return
    this.setTimeout(() => {
        updateJob(jobId, prg + 10)
    }, 3000);
}

app.listen(8080, () => {
    console.log("Server listening to the port 8080")
})