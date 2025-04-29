import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Snippet Showdown!</h1>
        <p>A platform for sharing and comparing code snippets</p>
        <div className="hero-buttons">
          <Link to="/snippets" className="btn btn-primary">
            Browse Snippets
          </Link>
          <Link to="/create" className="btn btn-secondary">
            Create Snippet
          </Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h2>Share Your Code</h2>
          <p>Create and share your code snippets with the community.</p>
        </div>
        <div className="feature-card">
          <h2>Syntax Highlighting</h2>
          <p>View code with beautiful syntax highlighting for various languages.</p>
        </div>
        <div className="feature-card">
          <h2>Collaborate</h2>
          <p>Get feedback and suggestions on your code snippets.</p>
        </div>
      </div>
      
      <div className="challenge-section">
        <h2>Current Challenge</h2>
        <p>Implement a function that reverses a string without using built-in reverse methods.</p>
        <div className="challenge-box">
          <pre>
            <code>
              function reverseString(str) {
                // Your code here
              }
            </code>
          </pre>
        </div>
        <Link to="/create" className="btn btn-primary">
          Submit Your Solution
        </Link>
      </div>
    </div>
  );
}

export default Home; 