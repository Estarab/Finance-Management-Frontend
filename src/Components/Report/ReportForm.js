// src/ReportForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ReportForm = () => {
  const [report, setReport] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [submittedReport, setSubmittedReport] = useState(null);  // State to store submitted report

  const handleReportChange = (e) => setReport(e.target.value);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 5) {
      alert('You can upload up to 5 images.');
    } else {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('reportText', report);

    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/v1/upload-report', formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          setUploadProgress(percent);
        },
      });
      
      // Set the submitted report data to state
      setSubmittedReport(response.data);

    } catch (error) {
      console.error('Error uploading report and images', error);
    }
  };

  // Remove a file from the list
  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  return (
    <div>
      <h2>Submit Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Write your report here"
            value={report}
            onChange={handleReportChange}
            rows="4"
            cols="50"
            required
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            required
          />
        </div>
        <div>
          <h4>Selected Images:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} 
                <button type="button" onClick={() => handleRemoveFile(file)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
      {uploadProgress && <p>Uploading: {uploadProgress}%</p>}

      {/* Display the submitted report and images */}
      {submittedReport && (
        <div>
          <h3>Your Report:</h3>
          <p>{submittedReport.reportText}</p>
          <h4>Uploaded Images:</h4>
          <div>
            {submittedReport.images.map((imagePath, index) => (
              <div key={index}>
                <img 
                  src={`http://localhost:5000/api/v1/download/${imagePath.split('/').pop()}`} 
                  alt={`uploaded ${index}`} 
                  style={{ width: '200px', marginRight: '10px' }} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
