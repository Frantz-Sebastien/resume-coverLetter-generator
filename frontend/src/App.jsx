import { useState } from "react";
import Form from "./components/Form";
import ResumeGenerator from "./components/ResumeGenerator";
import CoverLetterGenerator from "./components/CoverLetterGenerator";

function App() {
  const [formData, setFormData] = useState({
    jobDescription: "",
    workExperience: "",
    education: "",
    aboutMe: "",
  });

  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  // Handler to update form data from Form component
  const handleFormUpdate = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Resume & Cover Letter Generator</h1>

      {/* Form component manages user input and updates formData */}
      <Form formData={formData} onFormUpdate={handleFormUpdate} />

      {/* Resume and Cover Letter Generator Buttons */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <ResumeGenerator formData={formData} setResume={setResume} />
        <CoverLetterGenerator formData={formData} setCoverLetter={setCoverLetter} />
      </div>

      {/* Display Generated Resume */}
      {resume && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3>Generated Resume:</h3>
          <pre style={{ whiteSpace: "pre-wrap", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
            {resume}
          </pre>
        </div>
      )}

      {/* Display Generated Cover Letter */}
      {coverLetter && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3>Generated Cover Letter:</h3>
          <pre style={{ whiteSpace: "pre-wrap", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
            {coverLetter}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;