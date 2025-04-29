// Simple Express server with example endpoints
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const snippets = [
  { id: 1, title: 'Hello World', code: 'console.log("Hello World")', language: 'javascript' },
  { id: 2, title: 'Add Two Numbers', code: 'function add(a, b) { return a + b; }', language: 'javascript' },
  { id: 3, title: 'React Component', code: 'function App() { return <div>Hello React</div>; }', language: 'jsx' }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Snippet Showdown API' });
});

app.get('/api/snippets', (req, res) => {
  res.json(snippets);
});

app.get('/api/snippets/:id', (req, res) => {
  const snippet = snippets.find(s => s.id === parseInt(req.params.id));
  if (!snippet) return res.status(404).json({ error: 'Snippet not found' });
  res.json(snippet);
});

app.post('/api/snippets', (req, res) => {
  const { title, code, language } = req.body;
  if (!title || !code || !language) {
    return res.status(400).json({ error: 'Title, code and language are required' });
  }
  
  const newSnippet = {
    id: snippets.length + 1,
    title,
    code,
    language
  };
  
  snippets.push(newSnippet);
  res.status(201).json(newSnippet);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
