import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { NewPost } from './pages/NewPost';
import { Post } from './pages/Post';
import { Auth } from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Street Chronicles - Documenting Life's Journey
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App