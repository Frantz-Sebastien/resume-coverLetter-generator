import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    console.log("🔍 Testing Gemini API...");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // ✅ Updated model name
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: "Tell me a joke!" }] }] });
    const response = result.response;

    console.log("✅ Gemini Response:", response.text());
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
  }
}

testGemini();
