import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/SnippetDetail.css';

function SnippetDetail() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/snippets/${id}`);
        setSnippet(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch the snippet. It might not exist.');
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading snippet...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!snippet) {
    return <div className="not-found">Snippet not found.</div>;
  }

  return (
    <div className="snippet-detail">
      <div className="snippet-header">
        <h1>{snippet.title}</h1>
        <span className="language-badge">{snippet.language}</span>
      </div>
      
      <div className="code-container">
        <SyntaxHighlighter 
          language={snippet.language} 
          style={vscDarkPlus}
          showLineNumbers
          wrapLines
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
      
      <div className="actions">
        <button className="btn btn-primary">Copy Code</button>
        <button className="btn btn-secondary">Run Code</button>
      </div>
      
      <div className="comments-section">
        <h2>Comments</h2>
        <div className="comment-form">
          <textarea 
            placeholder="Leave a comment on this snippet..."
            rows="3" 
          />
          <button className="btn btn-primary">Submit</button>
        </div>
        
        <div className="comments-list">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      </div>
      
      <Link to="/snippets" className="back-link">
        &larr; Back to Snippets
      </Link>
    </div>
  );
}

export default SnippetDetail; 