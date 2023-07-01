const app = require("express")()
const jobs = {}

app.get("/", (req, res) => {
    res.send("Welcome to the server")
})

async function checkProgress(jobId) {
    return new Promise((resolve, reject) => {
        if(jobs[jobId] < 100)
            this.setTimeout(() => resolve(false), 2000)
        else resolve(true)
    })
}
//Whenever a new job is submitted, it will be added to the dictionary with a unique job ID, and the progess as it second key.
//while registering the new job into the dictionary, you update the job by increasing the porgress of 10%, every 3 seconds.
//to do this, we call a updateJob() function, it will a recursive function to trigger another function, every 3 seconds.
app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0
    updateJob(jobId, 0)
    res.send("\n\n " + jobId + "\n\n")
})

app.get("/checkstatus", async (req, res) => {
    console.log(jobs[req.query.jobId])

    res.send("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n")
})


//this will depict the updation in the job every 3 second, and console.log the progess everytime the update happens
//it closely resembles how the short polling works,
//at the same time, it resemebles: server and client are talking too much, and it might cause bottle neck within the givern network bandwidth
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