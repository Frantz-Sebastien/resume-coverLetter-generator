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

// 404 Error Handling - Handles requests to unknown endpoints
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error. Please try again later." });
});

app.listen(PORT, () => console.log(`We are live at port ${PORT}!`))