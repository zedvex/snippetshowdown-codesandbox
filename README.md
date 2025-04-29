# Snippet Showdown

A full-stack web application for sharing and comparing code snippets. This is a starter template for web development challenges.

## Project Structure

The project consists of two main parts:

- **Frontend**: React application with React Router and syntax highlighting
- **Backend**: Express.js API server with sample endpoints

## Features

- Browse code snippets with syntax highlighting
- Create and share your own snippets
- Filter snippets by language
- View snippet details
- Modern, responsive UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install all dependencies:

```bash
npm run install-all
```

2. Start both frontend and backend:

```bash
npm run dev
```

This will run:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

## Development Challenge

This template provides a starting point for various web development challenges. Here are some ideas for extending it:

1. Implement user authentication and authorization
2. Add a commenting system for snippets
3. Create a code execution feature to run snippets
4. Add code formatting options
5. Implement a rating/voting system for snippets
6. Add pagination for the snippets list
7. Improve the search and filtering capabilities
8. Create a user profile page

## Backend API Endpoints

- `GET /api/snippets` - Get all snippets
- `GET /api/snippets/:id` - Get a specific snippet by ID
- `POST /api/snippets` - Create a new snippet

## Tech Stack

### Frontend
- React
- React Router
- Axios for API calls
- React Syntax Highlighter

### Backend
- Express.js
- CORS for cross-origin requests
- (Expandable for database integration)

## License

MIT 