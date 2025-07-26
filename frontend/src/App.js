import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';
import { 
  Header, 
  Dashboard, 
  UserProfile, 
  Repository, 
  Explore, 
  Settings,
  AIChat,
  Auth,
  Search,
  Collaborators
} from './components';

function App() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState('dark');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to false for login flow
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
    website: 'https://johndoe.dev',
    timezone: 'America/Los_Angeles',
    preferredLanguage: 'en'
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentUser(prev => ({ ...prev, preferredLanguage: lng }));
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

  if (!isAuthenticated) {
    return (
      <div className={`App min-h-screen ${theme}`}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <Auth 
            onLogin={(user) => {
              setCurrentUser(user);
              setIsAuthenticated(true);
            }}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`App min-h-screen ${theme}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Router>
          <Header 
            currentUser={currentUser} 
            theme={theme} 
            toggleTheme={toggleTheme}
            onLanguageChange={changeLanguage}
            onLogout={() => setIsAuthenticated(false)}
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
                path="/search" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Search theme={theme} />
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
                    <Repository theme={theme} currentUser={currentUser} />
                  </motion.div>
                } 
              />
              <Route 
                path="/repository/:owner/:name/collaborators" 
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Collaborators theme={theme} currentUser={currentUser} />
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
                    <Settings 
                      currentUser={currentUser} 
                      theme={theme} 
                      onThemeChange={toggleTheme}
                      onLanguageChange={changeLanguage}
                      onUserUpdate={setCurrentUser}
                    />
                  </motion.div>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <AIChat theme={theme} currentUser={currentUser} />
        </Router>
      </div>
    </div>
  );
}

export default App;