import { useState } from 'react'

const Form = ({ onSubmit }) => {

    const [jobDescription, setJobDescription] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [education, setEducation] = useState("")
    const [aboutMe, setAboutMe] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit({ jobDescription, workExperience, education, aboutMe })
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
          <textarea
            placeholder="Copy and Paste Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <textarea
            placeholder="Work Experience"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            rows={4}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <textarea
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            rows={2}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <textarea
            placeholder="About Me"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            rows={2}
            style={{ width: "100%", marginBottom: "10px" }}
          />
    
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button type="submit">Generate</button>
          </div>
        </form>
      );
    }
    
    export default Form;