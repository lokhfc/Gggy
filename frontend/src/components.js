import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Search as SearchIcon,
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
  Folder as RepoIcon,
  TrendingUp,
  Flame,
  Globe,
  Calendar,
  Book,
  Heart,
  Zap,
  Coffee,
  Sparkles,
  Github,
  Lock,
  Unlock,
  UserPlus,
  Filter,
  SortDesc,
  Languages,
  PieChart,
  GitCommit,
  Activity,
  Shield,
  Mail,
  LogOut,
  Edit,
  Save,
  Trash2,
  Copy,
  ExternalLink,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';

// Enhanced Mock Data with language breakdown and collaborators
const mockRepositories = [
  {
    id: 1,
    name: 'awesome-react-components',
    description: 'A collection of awesome React components for modern web development',
    language: 'JavaScript',
    languages: {
      'JavaScript': 75.5,
      'TypeScript': 15.2,
      'CSS': 8.1,
      'HTML': 1.2
    },
    stars: 2543,
    forks: 456,
    watchers: 89,
    isPrivate: false,
    updatedAt: '2 hours ago',
    owner: 'john_coder',
    topics: ['react', 'components', 'ui', 'frontend'],
    image: 'https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMHJlcG9zaXRvcnl8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MTJ8MA&ixlib=rb-4.1.0&q=85',
    collaborators: [
      {
        id: 1,
        username: 'john_coder',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1564518534518-e79657852a1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85',
        role: 'owner'
      },
      {
        id: 2,
        username: 'sarah_dev',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/9017621/pexels-photo-9017621.jpeg',
        role: 'admin'
      }
    ]
  },
  {
    id: 2,
    name: 'neural-network-py',
    description: 'Deep learning neural network implementation in Python with TensorFlow',
    language: 'Python',
    languages: {
      'Python': 89.4,
      'Jupyter Notebook': 7.8,
      'Shell': 2.1,
      'Dockerfile': 0.7
    },
    stars: 1876,
    forks: 324,
    watchers: 67,
    isPrivate: false,
    updatedAt: '1 day ago',
    owner: 'john_coder',
    topics: ['python', 'machine-learning', 'neural-networks', 'tensorflow'],
    image: 'https://images.unsplash.com/photo-1589585374338-20ef873a738a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxwcm9ncmFtbWluZyUyMHJlcG9zaXRvcnl8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MTJ8MA&ixlib=rb-4.1.0&q=85',
    collaborators: [
      {
        id: 1,
        username: 'john_coder',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1564518534518-e79657852a1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85',
        role: 'owner'
      }
    ]
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
  Kotlin: '#F18E33',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  'Jupyter Notebook': '#DA5B0B',
  Solidity: '#AA6746',
  Makefile: '#427819'
};

// Auth Component
export const Auth = ({ onLogin, theme, toggleTheme }) => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const signupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
    username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
    fullName: yup.string().required('Full name is required')
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: 1,
        username: isLogin ? 'john_coder' : data.username,
        name: isLogin ? 'John Doe' : data.fullName,
        email: data.email,
        avatar: 'https://images.unsplash.com/photo-1564518534518-e79657852a1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBhdmF0YXJ8ZW58MHx8fHdoaXRlfDE3NTM1NTk0MDd8MA&ixlib=rb-4.1.0&q=85',
        bio: 'Full-stack developer passionate about open source',
        followers: 1234,
        following: 567,
        repositories: 89,
        location: 'San Francisco, CA',
        company: 'Tech Corp',
        website: 'https://johndoe.dev'
      };
      
      onLogin(user);
      setIsLoading(false);
    }, 1500);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Github className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold">GitHub</h1>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              {isLogin ? t('welcome_back') : t('join_github')}
            </h2>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {isLogin 
                ? 'Continue building the future with millions of developers worldwide'
                : 'Join the largest community of developers and start creating amazing projects'
              }
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-300" />
                <span>100M+ repositories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span>84M+ developers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>Free for open source</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-300" />
                <span>Enterprise security</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white dark:bg-gray-900">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                <Github className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GitHub</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? t('sign_in') : t('sign_up')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin 
                ? 'Welcome back! Sign in to your account'
                : 'Create an account and start your coding journey'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('full_name')}
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('username')}
                  </label>
                  <input
                    {...register('username')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    placeholder="Choose a username"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('email')}
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('password')}
              </label>
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('confirm_password')}
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{isLogin ? t('sign_in') : t('create_account')}</span>
              )}
            </motion.button>

            {isLogin && (
              <div className="text-center">
                <Link to="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  {t('forgot_password')}
                </Link>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? t('dont_have_account') : t('already_have_account')}
              <button
                onClick={toggleAuthMode}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {isLogin ? t('sign_up') : t('sign_in')}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Header Component with search and language selector
export const Header = ({ currentUser, theme, toggleTheme, onLanguageChange, onLogout }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: t('dashboard'), path: '/', icon: Home },
    { name: t('explore'), path: '/explore', icon: Compass },
    { name: t('profile'), path: `/profile/${currentUser.username}`, icon: User }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
                <Github className="w-5 h-5 text-white dark:text-gray-900" />
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
            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-1"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
                </span>
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          i18n.language === lang.code
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {i18n.language === lang.code && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                      {t('your_profile')}
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      {t('settings')}
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t('sign_out')}
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

// Enhanced Repository Card Component
const RepositoryCard = ({ repo, index }) => {
  const { t } = useTranslation();
  const primaryLanguage = Object.entries(repo.languages).sort(([,a], [,b]) => b - a)[0];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 repo-card"
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
              <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Private</span>
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
            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Collaborators */}
      {repo.collaborators && repo.collaborators.length > 1 && (
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-4 h-4 text-gray-500" />
          <div className="flex -space-x-2">
            {repo.collaborators.slice(0, 3).map((collaborator) => (
              <img
                key={collaborator.id}
                src={collaborator.avatar}
                alt={collaborator.name}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                title={`${collaborator.name} (${collaborator.role})`}
              />
            ))}
            {repo.collaborators.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  +{repo.collaborators.length - 3}
                </span>
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {repo.collaborators.length} {t('collaborators').toLowerCase()}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColors[primaryLanguage[0]] || '#gray' }}
            ></div>
            <span>{primaryLanguage[0]}</span>
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
  const { t } = useTranslation();
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
            {t('welcome_back_user', { name: currentUser.name })}
          </h1>
          <p className="text-blue-100 mb-6">
            {t('ready_to_build')}
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>{t('new_repository')}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center space-x-2"
            >
              <Code className="w-5 h-5" />
              <span>{t('import_repository')}</span>
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
                  {t(`${filterType}_repositories`)}
                </motion.button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated">{t('recently_updated')}</option>
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
              {t('recent_activity')}
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
              {t('your_stats')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('total_repositories')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentUser.repositories}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('total_stars')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">6,726</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('followers')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentUser.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('following')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{currentUser.following}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Simplified components for now
export const Search = ({ theme }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('search_results')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Search functionality with translations
      </p>
    </div>
  );
};

export const Explore = ({ theme }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('explore_github')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Explore functionality with translations
      </p>
    </div>
  );
};

export const UserProfile = ({ currentUser, theme }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('profile')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Profile functionality with translations
      </p>
    </div>
  );
};

export const Repository = ({ theme, currentUser }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Repository
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Repository functionality with translations
      </p>
    </div>
  );
};

export const Collaborators = ({ theme, currentUser }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('collaborators')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Collaborators functionality with translations
      </p>
    </div>
  );
};

export const Settings = ({ currentUser, theme, onThemeChange, onLanguageChange, onUserUpdate }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('settings')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Settings functionality with translations
      </p>
    </div>
  );
};

// Enhanced AI Chat Component
export const AIChat = ({ theme, currentUser }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `${t('ai_assistant')}: Hello! I'm your AI coding assistant. How can I help you today?`,
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

    // Enhanced AI responses based on context
    setTimeout(() => {
      const responses = [
        'I can help you with coding questions, repository management, and GitHub best practices!',
        'That\'s a great question! Let me help you with that. Here are some suggestions...',
        'I understand what you\'re looking for. Based on your repositories, I recommend...',
        'Here\'s what I think would work best for your project. You might want to consider...',
        'That\'s an interesting challenge! Here\'s how I would approach it...',
        'Рад помочь! Давайте разберём этот вопрос подробнее...',
        'Based on your current repositories, I suggest focusing on...'
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
                  <h3 className="font-semibold">{t('ai_assistant')}</h3>
                  <p className="text-xs text-blue-100">{t('always_here')}</p>
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
                  placeholder={t('ask_anything')}
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