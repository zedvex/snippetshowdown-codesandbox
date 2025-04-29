import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SnippetList from './pages/SnippetList';
import SnippetDetail from './pages/SnippetDetail';
import CreateSnippet from './pages/CreateSnippet';
import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets" element={<SnippetList />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
          <Route path="/create" element={<CreateSnippet />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Snippet Showdown - A CodeSandbox Challenge Template</p>
      </footer>
    </div>
  );
}

export default App; 