import { useState } from "react";

// Uncomment this part once you have deployed the backend
const API_URL =
    import.meta.env.MODE === "development" 
        ?  import.meta.env.VITE_BACKEND_URL
        : import.meta.env.VITE_BACKEND_URL_PROD; 

// const API_URL = import.meta.env.VITE_BACKEND_URL_PROD;

const ResumeGenerator = ({ formData, setResume }) => {

  const [loading, setLoading] = useState(false)

  const handleGenerateResume = async () => {
    // Validate form data
    if (!formData.jobDescription || !formData.workExperience || !formData.education || !formData.aboutMe) {
      alert("Please fill out the entire form before generating the resume.");
      return;
    }
    setLoading(true)
    try {
      // Send data to backend
      const response = await fetch(`${API_URL}/api/resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }
      
      const data = await response.json();
      setResume(data.resume);
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("There was an error generating your resume. Please try again.");
    }

    setLoading(false)
  };

  return (
    <button 
      onClick={handleGenerateResume} 
      style={{ 
        padding: "10px 15px", 
        backgroundColor: "#4CAF50", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer" 
      }}
    >
      {loading ? "Generating..." : "Generate Resume"}
    </button>
  );
};

export default ResumeGenerator;