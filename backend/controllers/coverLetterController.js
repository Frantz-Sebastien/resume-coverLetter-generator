import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model:"gemini-1.5-pro-002" })

export const generateCoverLetter = async (req, res) => {
    try{
        const { jobDescription, workExperience, education, aboutMe } = req.body

        if(!jobDescription || !workExperience || !education || !aboutMe){
            return res.status(400).json({ error: "All fields required" })
        }

        const prompt = `
            Create a professional and tailored cover letter for the following job:
            
            Job Description: ${jobDescription}
            
            Candidate's Work Experience: ${workExperience}
            
            Candidate's Education: ${education}
            
            Candidate's Personal Summary: ${aboutMe}
            
            Please format the response as a structured resume`

        const result = await model.generateContent(prompt)
        const AIresponse = result.response

        if(!result || !AIresponse){
            throw new Error("Invalid AI response. Check Google Gemini API.")
        }

        const responseText = AIresponse.text()

        if(!responseText){
            throw new Error("AI response is empty")
        }

        res.json( { coverLetter: responseText })
 
    } catch(error){
        console.error("Error generating cover letter:", error)
        if (error.response) {
            // Google Gemini API errors
            return res.status(error.response.status || 500).json({
                error: `Gemini API Error: ${error.response.data.message || "Unknown error"}`,
            });
        } else if (error.message.includes("AI response is empty")) {
            return res.status(500).json({ error: "AI did not return a valid response. Try again." });
        } else {
            // Generic internal server error
            return res.status(500).json({ error: "Internal Server Error. Please try again later." });
        }
    }
};