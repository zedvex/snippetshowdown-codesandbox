import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SnippetShowdown
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/snippets" className="nav-link">
              Snippets
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Create Snippet
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 