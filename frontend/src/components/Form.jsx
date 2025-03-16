import { useState, useEffect } from 'react';

const Form = ({ formData, onFormUpdate }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  // Update a single field in the form
  const handleFieldChange = (field, value) => {
    const updatedFormData = {
      ...localFormData,
      [field]: value
    };
    setLocalFormData(updatedFormData);
    onFormUpdate(updatedFormData);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "600px", margin: "auto" }}>
      <textarea
        placeholder="Copy and Paste Job Description"
        value={localFormData.jobDescription}
        onChange={(e) => handleFieldChange('jobDescription', e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        placeholder="Work Experience"
        value={localFormData.workExperience}
        onChange={(e) => handleFieldChange('workExperience', e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        placeholder="Education"
        value={localFormData.education}
        onChange={(e) => handleFieldChange('education', e.target.value)}
        rows={2}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        placeholder="About Me"
        value={localFormData.aboutMe}
        onChange={(e) => handleFieldChange('aboutMe', e.target.value)}
        rows={2}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
    </form>
  );
};

export default Form;