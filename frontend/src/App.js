import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { 
  Header, 
  Dashboard, 
  UserProfile, 
  Repository, 
  Explore, 
  Settings,
  AIChat 
} from './components';

function App() {
  const [theme, setTheme] = useState('dark');
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    username: 'john_coder',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1564518534518-e79657852a1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85',
    bio: 'Full-stack developer passionate about open source',
    followers: 1234,
    following: 567,
    repositories: 89,
    location: 'San Francisco, CA',
    company: 'Tech Corp',
    website: 'https://johndoe.dev'
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className={`App min-h-screen ${theme}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Router>
          <Header 
            currentUser={currentUser} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Dashboard currentUser={currentUser} theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="/explore" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Explore theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="/profile/:username" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <UserProfile currentUser={currentUser} theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="/repository/:owner/:name" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Repository theme={theme} />
                  </motion.div>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Settings currentUser={currentUser} theme={theme} />
                  </motion.div>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <AIChat theme={theme} />
        </Router>
      </div>
    </div>
  );
}

export default App;