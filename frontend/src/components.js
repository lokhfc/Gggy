import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  Star,
  GitFork,
  Eye,
  Code,
  GitBranch,
  Clock,
  Users,
  MapPin,
  Link as LinkIcon,
  Building,
  Settings as SettingsIcon,
  Moon,
  Sun,
  MessageCircle,
  Send,
  X,
  Menu,
  Home,
  Compass,
  User,
  Repository as RepoIcon,
  TrendingUp,
  Flame,
  Globe,
  Calendar,
  Book,
  Heart,
  Zap,
  Coffee,
  Sparkles
} from 'lucide-react';

// Mock data
const mockRepositories = [
  {
    id: 1,
    name: 'awesome-react-components',
    description: 'A collection of awesome React components for modern web development',
    language: 'JavaScript',
    stars: 2543,
    forks: 456,
    watchers: 89,
    isPrivate: false,
    updatedAt: '2 hours ago',
    owner: 'john_coder',
    topics: ['react', 'components', 'ui', 'frontend'],
    image: 'https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMHJlcG9zaXRvcnl8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MTJ8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 2,
    name: 'neural-network-py',
    description: 'Deep learning neural network implementation in Python with TensorFlow',
    language: 'Python',
    stars: 1876,
    forks: 324,
    watchers: 67,
    isPrivate: false,
    updatedAt: '1 day ago',
    owner: 'john_coder',
    topics: ['python', 'machine-learning', 'neural-networks', 'tensorflow'],
    image: 'https://images.unsplash.com/photo-1589585374338-20ef873a738a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxwcm9ncmFtbWluZyUyMHJlcG9zaXRvcnl8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MTJ8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 3,
    name: 'blockchain-wallet',
    description: 'Secure cryptocurrency wallet with multi-chain support',
    language: 'TypeScript',
    stars: 987,
    forks: 234,
    watchers: 45,
    isPrivate: false,
    updatedAt: '3 days ago',
    owner: 'john_coder',
    topics: ['blockchain', 'cryptocurrency', 'wallet', 'security'],
    image: 'https://images.unsplash.com/photo-1529661197280-63dc545366c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxwcm9ncmFtbWluZyUyMHJlcG9zaXRvcnl8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MTJ8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 4,
    name: 'api-gateway',
    description: 'High-performance API gateway with load balancing and caching',
    language: 'Go',
    stars: 1234,
    forks: 189,
    watchers: 56,
    isPrivate: false,
    updatedAt: '5 days ago',  
    owner: 'john_coder',
    topics: ['go', 'api', 'gateway', 'microservices'],
    image: 'https://images.unsplash.com/photo-1540597775766-09a0f60b4380?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxwcm9ncmFtbWluZyUyMHJlcG9zaXRvcnl8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MTJ8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 5,
    name: 'mobile-chat-app',
    description: 'Real-time chat application for iOS and Android',
    language: 'Dart',
    stars: 654,
    forks: 123,
    watchers: 34,
    isPrivate: true,
    updatedAt: '1 week ago',
    owner: 'john_coder',
    topics: ['flutter', 'mobile', 'chat', 'realtime'],
    image: 'https://images.pexels.com/photos/5185145/pexels-photo-5185145.jpeg'
  },
  {
    id: 6,
    name: 'data-visualization',
    description: 'Interactive data visualization library with D3.js',
    language: 'JavaScript',
    stars: 432,
    forks: 87,
    watchers: 23,
    isPrivate: false,
    updatedAt: '2 weeks ago',
    owner: 'john_coder',
    topics: ['d3js', 'visualization', 'charts', 'analytics'],
    image: 'https://images.unsplash.com/photo-1615716271919-683c8d0aa39e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxjb2RlJTIwYmFja2dyb3VuZHxlbnwwfHx8d2hpdGV8MTc1MzU1OTQxOHww&ixlib=rb-4.1.0&q=85'
  }
];

const mockTrendingRepos = [
  {
    id: 101,
    name: 'ai-code-assistant',
    owner: 'ai-tools',
    description: 'AI-powered code completion and generation tool',
    language: 'Python',
    stars: 15400,
    forks: 2100,
    todayStars: 245,
    avatar: 'https://images.unsplash.com/photo-1604690442662-32b84e6ebc8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 102,
    name: 'nextjs-dashboard',
    owner: 'frontend-masters',
    description: 'Modern dashboard template built with Next.js 14',
    language: 'TypeScript',
    stars: 8900,
    forks: 1200,
    todayStars: 189,
    avatar: 'https://images.unsplash.com/photo-1610210162763-6c4d6da47c8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 103,
    name: 'rust-web-framework',
    owner: 'rust-community',
    description: 'Fast and secure web framework for Rust',
    language: 'Rust',
    stars: 12300,
    forks: 890,
    todayStars: 156,
    avatar: 'https://images.unsplash.com/photo-1619016708406-7c9a4f676f2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 104,
    name: 'kubernetes-operator',
    owner: 'cloud-native',
    description: 'Advanced Kubernetes operator for database management',
    language: 'Go',
    stars: 6700,
    forks: 567,
    todayStars: 98,
    avatar: 'https://images.pexels.com/photos/8407042/pexels-photo-8407042.jpeg'
  }
];

const mockUsers = [
  {
    id: 2,
    username: 'sarah_dev',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/9017621/pexels-photo-9017621.jpeg',
    bio: 'Frontend developer & UI/UX enthusiast',
    followers: 987,
    following: 234,
    repositories: 45
  },
  {
    id: 3,
    username: 'mike_fullstack',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1604690442662-32b84e6ebc8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85',
    bio: 'Full-stack engineer building the future',
    followers: 1543,
    following: 789,
    repositories: 78
  }
];

// Language colors
const languageColors = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  TypeScript: '#2b7489',
  Go: '#00ADD8',
  Rust: '#dea584',
  Dart: '#00B4AB',
  Java: '#b07219',
  'C++': '#f34b7d',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#F18E33'
};

// Header Component
export const Header = ({ currentUser, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Profile', path: `/profile/${currentUser.username}`, icon: User }
  ];

  return (
    <motion.header 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center"
              >
                <Code className="w-5 h-5 text-white dark:text-gray-900" />
              </motion.div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                GitHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories, users, organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Create New */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                  >
                    <Link
                      to={`/profile/${currentUser.username}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Your profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Repository Card Component
const RepositoryCard = ({ repo, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Link
              to={`/repository/${repo.owner}/${repo.name}`}
              className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {repo.name}
            </Link>
            {repo.isPrivate && (
              <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                Private
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {repo.description}
          </p>
        </div>
        <img
          src={repo.image}
          alt={repo.name}
          className="w-16 h-16 rounded-lg object-cover ml-4"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {repo.topics.map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColors[repo.language] || '#gray' }}
            ></div>
            <span>{repo.language}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{repo.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="w-4 h-4" />
            <span>{repo.forks}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Updated {repo.updatedAt}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Dashboard Component
export const Dashboard = ({ currentUser, theme }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  const filteredRepos = mockRepositories.filter(repo => {
    if (filter === 'private') return repo.isPrivate;
    if (filter === 'public') return !repo.isPrivate;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/6800935/pexels-photo-6800935.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-blue-100 mb-6">
            Ready to build something amazing today? Your repositories are waiting.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Repository</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center space-x-2"
            >
              <Code className="w-5 h-5" />
              <span>Import Repository</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Repository Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              {['all', 'public', 'private'].map((filterType) => (
                <motion.button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg capitalize font-medium transition-colors ${
                    filter === filterType
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filterType} repositories
                </motion.button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated">Recently updated</option>
              <option value="name">Name</option>
              <option value="stars">Most stars</option>
              <option value="created">Recently created</option>
            </select>
          </div>

          {/* Repository Grid */}
          <div className="grid gap-6">
            {filteredRepos.map((repo, index) => (
              <RepositoryCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Pushed to <span className="font-medium">awesome-react-components</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Created pull request in <span className="font-medium">neural-network-py</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Starred <span className="font-medium">kubernetes-operator</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Your Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total repositories</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentUser.repositories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total stars received</span>
                <span className="font-semibold text-gray-900 dark:text-white">6,726</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Followers</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentUser.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Following</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentUser.following}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Explore Component
export const Explore = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('trending');
  const [timeRange, setTimeRange] = useState('today');

  const tabs = [
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'repositories', name: 'Repositories', icon: RepoIcon },
    { id: 'users', name: 'Users', icon: Users }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore GitHub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover trending repositories, amazing developers, and exciting projects from around the world
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <motion.button
              key={range}
              onClick={() => setTimeRange(range)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range === 'today' ? 'Today' : `This ${range}`}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'trending' && (
          <motion.div
            key="trending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            {mockTrendingRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={repo.avatar}
                    alt={repo.owner}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Link
                        to={`/repository/${repo.owner}/${repo.name}`}
                        className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {repo.owner}/{repo.name}
                      </Link>
                      <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-sm">
                        <Flame className="w-4 h-4" />
                        <span>Trending</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{repo.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || '#gray' }}
                        ></div>
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>{repo.todayStars} stars today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {user.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">@{user.username}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{user.bio}</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {user.followers}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {user.repositories}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Repos</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Follow
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// User Profile Component
export const UserProfile = ({ currentUser, theme }) => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('repositories');

  const tabs = [
    { id: 'repositories', name: 'Repositories', count: currentUser.repositories },
    { id: 'stars', name: 'Stars', count: 45 },
    { id: 'followers', name: 'Followers', count: currentUser.followers },
    { id: 'following', name: 'Following', count: currentUser.following }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center mb-6">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {currentUser.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">@{currentUser.username}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Edit profile
              </motion.button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{currentUser.bio}</p>
              
              {currentUser.company && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Building className="w-4 h-4" />
                  <span>{currentUser.company}</span>
                </div>
              )}
              
              {currentUser.location && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              
              {currentUser.website && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <LinkIcon className="w-4 h-4" />
                  <a href={currentUser.website} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {currentUser.website}
                  </a>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-6 text-center">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {currentUser.followers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">followers</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {currentUser.following}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">following</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="capitalize">{tab.name}</span>
                <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Repository Grid */}
          <AnimatePresence mode="wait">
            {activeTab === 'repositories' && (
              <motion.div
                key="repositories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-6"
              >
                {mockRepositories.map((repo, index) => (
                  <RepositoryCard key={repo.id} repo={repo} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Repository Component
export const Repository = ({ theme }) => {
  const { owner, name } = useParams();
  const [activeTab, setActiveTab] = useState('code');

  const tabs = [
    { id: 'code', name: 'Code', icon: Code },
    { id: 'issues', name: 'Issues', count: 12 },
    { id: 'pulls', name: 'Pull requests', count: 3 },
    { id: 'actions', name: 'Actions' },
    { id: 'security', name: 'Security' },
    { id: 'insights', name: 'Insights' }
  ];

  const mockRepo = mockRepositories[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Repository Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <RepoIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {owner}/{name}
                </h1>
                {mockRepo.isPrivate && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                    Private
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{mockRepo.description}</p>
              <div className="flex flex-wrap gap-2">
                {mockRepo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <img
              src={mockRepo.image}
              alt={mockRepo.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColors[mockRepo.language] || '#gray' }}
              ></div>
              <span>{mockRepo.language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{mockRepo.stars.toLocaleString()} stars</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{mockRepo.forks} forks</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{mockRepo.watchers} watching</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Star</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <GitFork className="w-4 h-4" />
              <span>Fork</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Code className="w-4 h-4" />
              <span>Code</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.name}</span>
              {tab.count && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* File Explorer (Code Tab) */}
      <AnimatePresence mode="wait">
        {activeTab === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">main</span>
                  <span className="text-gray-600 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last commit {mockRepo.updatedAt}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clone
                </motion.button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { name: '.github', type: 'folder', updated: '3 days ago' },
                { name: 'src', type: 'folder', updated: '2 hours ago' },
                { name: 'public', type: 'folder', updated: '1 week ago' },
                { name: 'package.json', type: 'file', updated: '2 hours ago' },
                { name: 'README.md', type: 'file', updated: '1 day ago' },
                { name: 'LICENSE', type: 'file', updated: '1 month ago' }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 text-gray-600 dark:text-gray-400">
                      {item.type === 'folder' ? '📁' : '📄'}
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.updated}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Settings Component
export const Settings = ({ currentUser, theme }) => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Globe }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Settings
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <nav className="space-y-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ scale: 1.02 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.name}</span>
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Profile Settings
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Change avatar
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentUser.name}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue={currentUser.username}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={currentUser.bio}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save changes
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// AI Chat Component
export const AIChat = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI coding assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I can help you with coding questions, repository management, and GitHub best practices!',
        'That\'s a great question! Let me help you with that. Here are some suggestions...',
        'I understand what you\'re looking for. Based on your repositories, I recommend...',
        'Here\'s what I think would work best for your project. You might want to consider...',
        'That\'s an interesting challenge! Here\'s how I would approach it...'
      ];
      
      const botResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-blue-100">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isBot
                        ? 'text-gray-500 dark:text-gray-400'
                        : 'text-blue-100'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about coding..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <motion.button
                  onClick={sendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};