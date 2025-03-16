import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
import * as cheerio from "cheerio"
import axios from "axios"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model:"gemini-1.5-pro-002" })


export const generateResume = async (req, res) => {
    try{
        const{ jobDescription, workExperience, education, aboutMe } = req.body

        if(!jobDescription || !workExperience || !education || !aboutMe){
            return res.status(400).json({ error: "All fields required" })
        }

        const prompt = `
            Create a professional ATS-optimized resume for the following job:
            
            Job Description: ${jobDescription}
            
            Candidate's Work Experience: ${workExperience}
            
            Candidate's Education: ${education}
            
            Candidate's Personal Summary: ${aboutMe}
            
            Please format the response as a structured resume`

        const result = await model.generateContent(prompt)
        const response = result.response

        res.json( { resume: response.text() })

    } catch(error){
        console.error("Error generating resume:", error)
        res.status(500).json({ error: "Internal Server Error"})
    }
}