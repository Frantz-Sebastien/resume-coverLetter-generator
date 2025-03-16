import React from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const CoverLetterGenerator = ({ formData, setCoverLetter }) => {
  const handleGenerateCoverLetter = async () => {
    // Validate form data
    if (!formData.jobDescription || !formData.workExperience || !formData.education || !formData.aboutMe) {
      alert("Please fill out the entire form before generating the cover letter.");
      return;
    }
    
    try {
      // Send data to backend
      const response = await fetch(`${API_URL}/api/cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }
      
      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      alert("There was an error generating your cover letter. Please try again.");
    }
  };

  return (
    <button 
      onClick={handleGenerateCoverLetter} 
      style={{ 
        padding: "10px 15px", 
        backgroundColor: "#2196F3", 
        color: "white", 
        border: "none", 
        borderRadius: "5px",
        cursor: "pointer" 
      }}
    >
      Generate Cover Letter
    </button>
  );
};

export default CoverLetterGenerator;