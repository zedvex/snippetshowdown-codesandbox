import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateSnippet.css';

function CreateSnippet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    language: 'javascript'
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3001/api/snippets', formData);
      setSubmitting(false);
      navigate(`/snippets/${response.data.id}`);
    } catch (err) {
      setSubmitting(false);
      setError('Failed to create snippet. Please try again.');
    }
  };

  return (
    <div className="create-snippet">
      <h1>Create New Snippet</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="jsx">JSX/React</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <textarea
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Paste or type your code here"
            rows="15"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary submit-btn" 
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Snippet'}
        </button>
      </form>
    </div>
  );
}

export default CreateSnippet; 