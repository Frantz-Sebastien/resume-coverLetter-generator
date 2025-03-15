import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import resumeRoutes from "./routes/resume.js"
import coverLetterRoutes from "./routes/coverLetter.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use("/api/resume", resumeRoutes);
app.use("/api/cover-letter", coverLetterRoutes);

app.get('/', (req, res) => {
    res.send('Resume Generator API is running...');
});


app.listen(PORT, () => console.log(`We are live at port ${PORT}!`))