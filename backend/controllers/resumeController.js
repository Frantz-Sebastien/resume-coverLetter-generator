import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPEN_API_KEY,
    })
)

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

    const response = await openai.createCompletion({
        model: "gpt-4-turbo",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1000,
    })

    res.json({ resume: response.data.choices[0].text.trim() })
    } catch(error){
        console.error("Error generating resume:", error)
        res.status(500).json({ error: "Internal Server Error"})
    }
}