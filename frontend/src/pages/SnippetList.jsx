import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SnippetList.css';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/snippets');
        setSnippets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch snippets. Please try again later.');
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) {
    return <div className="loading">Loading snippets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="snippet-list">
      <h1>Code Snippets</h1>
      
      <div className="filters">
        <select className="language-filter">
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
          <option value="jsx">JSX</option>
        </select>
        
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search snippets..." 
        />
      </div>
      
      <div className="snippets-container">
        {snippets.length === 0 ? (
          <p>No snippets found. Be the first to add one!</p>
        ) : (
          snippets.map(snippet => (
            <div key={snippet.id} className="snippet-card">
              <h2>{snippet.title}</h2>
              <div className="snippet-info">
                <span className="language-badge">{snippet.language}</span>
              </div>
              <div className="snippet-preview">
                <code>{snippet.code.length > 100 
                  ? snippet.code.substring(0, 100) + '...' 
                  : snippet.code}
                </code>
              </div>
              <Link to={`/snippets/${snippet.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
      
      <Link to="/create" className="create-button">
        + Create New Snippet
      </Link>
    </div>
  );
}

export default SnippetList; 