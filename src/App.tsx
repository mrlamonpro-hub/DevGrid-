import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Terminal,
  Shield,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Clock,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronRight,
  Send,
  User,
  Activity,
  Award,
  Lock,
  Mail,
  Copy,
  Check,
  LogOut,
  Info,
  Layers,
  Heart,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DiscordWidget from './components/DiscordWidget';
import ServicesPanel from './components/ServicesPanel';
import ProcessFlow from './components/ProcessFlow';
import DevGridAIWidget from './components/DevGridAIWidget';
import DevGridLogo from './components/DevGridLogo';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'inquiry' | 'account'>('home');

  const [supportQuestion, setSupportQuestion] = useState('');
  const [supportChat, setSupportChat] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Welcome to DevGrid Services! I am your automated assistant. Ask me anything about our setups, pricing, VPS hosting, or how to order custom configurations!',
      time: 'Just now'
    }
  ]);

  // Auth States
  const [isAdminLoginVisible, setIsAdminLoginVisible] = useState(false);
  const [users, setUsers] = useState<Array<{ email: string; name: string; password?: string; isGoogle?: boolean }>>(() => {
    const saved = localStorage.getItem('devgrid_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return [
      { email: 'mr.lamonpro@gmail.com', name: 'LamonPro', password: 'devgrid70' },
      { email: 'mat576907@gmail.com', name: 'Mat', password: 'devgrid70' }
    ];
  });

  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; isGoogle?: boolean } | null>(() => {
    const saved = localStorage.getItem('devgrid_logged_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return null;
  });

  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Google Login Popup Simulation
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  // Contact Us email copies
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Contact Page Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem('devgrid_registered_users', JSON.stringify(users));
  }, [users]);

  // Save logged user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('devgrid_logged_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('devgrid_logged_user');
    }
  }, [currentUser]);

  // Handle Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const emailNorm = authEmail.trim().toLowerCase();
    if (!emailNorm || !authName.trim() || !authPassword) {
      setAuthError('Please fill in all standard fields.');
      return;
    }

    // Check if email already exists
    const exists = users.some(u => u.email.toLowerCase() === emailNorm);
    if (exists) {
      setAuthError('Email is already registered, please try to login.');
      return;
    }

    const newUser = {
      email: emailNorm,
      name: authName.trim(),
      password: authPassword
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthSuccess('Account registered successfully! Redirecting you to your account panel...');
    
    // Clear form
    setAuthEmail('');
    setAuthName('');
    setAuthPassword('');

    // Redirect to account dashboard
    setTimeout(() => {
      setAuthSuccess(null);
      setActivePage('account');
    }, 1500);
  };

  // Handle Admin Login
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const emailNorm = authEmail.trim().toLowerCase();
    const isAdminEmail = emailNorm === 'mr.lamonpro@gmail.com' || emailNorm === 'mat576907@gmail.com';

    if (!isAdminEmail) {
      setAuthError('Access denied. This portal is restricted to authorized Administrators only.');
      return;
    }

    if (authPassword !== 'devgrid70') {
      setAuthError('Incorrect administrator password. Access denied.');
      return;
    }

    const adminUser = {
      email: emailNorm,
      name: emailNorm === 'mr.lamonpro@gmail.com' ? 'LamonPro' : 'Mat',
      role: 'Administrator'
    };

    setCurrentUser(adminUser);
    setAuthSuccess('Administrator authenticated successfully! Redirecting you to the system panel...');
    setAuthEmail('');
    setAuthPassword('');

    setTimeout(() => {
      setAuthSuccess(null);
      setActivePage('account');
    }, 1500);
  };

  // Google Login Simulation
  const handleGoogleSSO = (email: string, name: string) => {
    setAuthError(null);
    setShowGooglePopup(false);

    // If exists, login, otherwise register on-the-fly
    const emailNorm = email.trim().toLowerCase();
    const exists = users.find(u => u.email.toLowerCase() === emailNorm);

    if (exists) {
      setCurrentUser(exists);
      setAuthSuccess(`Welcome back, logged in as ${name}!`);
    } else {
      const newUser = {
        email: emailNorm,
        name: name,
        isGoogle: true
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setAuthSuccess(`Account registered via Google! Welcome ${name}.`);
    }

    setTimeout(() => {
      setAuthSuccess(null);
      setActivePage('account');
    }, 1500);
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setActivePage('home');
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) {
      setContactStatus('Please fill in all contact form fields.');
      return;
    }

    setContactStatus('Sending...');
    setTimeout(() => {
      setContactStatus('Thank you! Your message has been routed to our support team. We will write back to you shortly.');
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 1000);
  };

  // Support Chat replies
  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportQuestion.trim()) return;

    const userMsg = supportQuestion.trim();
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSupportChat((prev) => [...prev, { sender: 'user', text: userMsg, time: nowStr }]);
    setSupportQuestion('');

    setTimeout(() => {
      let botResponse = "For custom configurations, setups, or dedicated inquiries, please open a direct 1-on-1 support ticket in our Discord server.";
      const lower = userMsg.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('rs') || lower.includes('₹')) {
        botResponse = "Our premium professional services start from just ₹39! For example, basic setup is ₹39, Minecraft low-cost hosting is ₹79, while animated web designs are ₹99. Go to the 'Services Catalog' tab above to view exact prices!";
      } else if (lower.includes('minecraft') || lower.includes('mc') || lower.includes('survival') || lower.includes('plugins')) {
        botResponse = "We design advanced Minecraft server configurations! This includes custom plugin setups (₹49), LuckPerms permissions configurations (₹59), and full custom survival setups (₹149).";
      } else if (lower.includes('hosting') || lower.includes('vps') || lower.includes('pterodactyl')) {
        botResponse = "We configure enterprise Linux nodes! VPS configuration & hardening is ₹99, and clean Pterodactyl Panel installation with custom subdomains is ₹159.";
      } else if (lower.includes('discord') || lower.includes('bot') || lower.includes('ticket')) {
        botResponse = "We deploy fully functional Discord networks. Automated bot configuration is ₹39, AutoMod auto-filter setup is ₹49, and complete custom server decoration is ₹149.";
      } else if (lower.includes('web') || lower.includes('website') || lower.includes('design')) {
        botResponse = "We code immersive responsive websites. Standard landing page is ₹59, animated layouts are ₹99, and premium pages with live status integrations and contact webhooks are ₹199.";
      } else if (lower.includes('register') || lower.includes('email') || lower.includes('account')) {
        botResponse = "You can register your account using your email or with Google Single Sign-on! Just click the 'Inquiry Desk' or the 'My Account' link in the top menu.";
      }

      setSupportChat((prev) => [...prev, { sender: 'bot', text: botResponse, time: nowStr }]);
    }, 850);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Ambient Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[45vw] h-[45vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Navigation (Homes, Services Catalog, Live Status, Inquiry Desk) */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer animate-fade-in" onClick={() => setActivePage('home')}>
            <DevGridLogo className="w-10 h-10 shadow-lg shadow-indigo-500/10" />
            <div>
              <span className="font-display font-extrabold text-base tracking-tight text-white block">
                DevGrid <span className="text-indigo-400">Services</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase leading-none">
                Elite Setup Agency
              </span>
            </div>
          </div>

          {/* Navigation Categories */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <button
              id="nav-homes"
              onClick={() => setActivePage('home')}
              className={`transition-colors ${activePage === 'home' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
            >
              Homes
            </button>
            <button
              id="nav-services"
              onClick={() => setActivePage('services')}
              className={`transition-colors ${activePage === 'services' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'} cursor-pointer`}
            >
              Services Catalog
            </button>
            <button
              id="nav-inquiry"
              onClick={() => setActivePage('inquiry')}
              className={`transition-colors ${activePage === 'inquiry' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'} cursor-pointer`}
            >
              Inquiry Desk
            </button>
          </div>

          {/* Right actions (Account, Join Discord) */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => setActivePage('account')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/50 text-indigo-300 text-xs font-semibold border border-indigo-500/20 hover:bg-indigo-900/30 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                Hi, {currentUser.name}
              </button>
            ) : (
              <button
                onClick={() => { setIsAdminLoginVisible(true); setActivePage('inquiry'); }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800 hover:bg-slate-850 hover:text-white transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Admin Portal
              </button>
            )}

            <a
              href="https://discord.gg/EJSvQU8cn9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/25 active:scale-[0.98]"
            >
              Join Discord
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex-grow w-full relative z-10 space-y-12">
        
        {/* Dynamic Page Views */}
        <AnimatePresence mode="wait">
          
          {/* 1. HOMES PAGE */}
          {activePage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-14"
            >
              {/* Hero Segment */}
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto border-b border-slate-900/60 pb-12">
                
                {/* Text Column */}
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.12 }
                    }
                  }}
                  className="space-y-6 w-full flex flex-col items-center"
                >
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                    <span>THE BEST SERVICES COMPANY</span>
                  </motion.div>

                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-none"
                  >
                    DevGrid <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Services</span>
                  </motion.h1>

                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed"
                  >
                    We engineer beautiful Discord communities, configure high-performance Minecraft game servers, deploy low-cost cloud hosting configs, custom build stunning graphic design visual brandings, and code elite responsive website systems with smooth transitions.
                  </motion.p>

                  {/* Redesigned CTAs based on requirements */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="flex flex-wrap justify-center gap-3.5 pt-2"
                  >
                    <button
                      onClick={() => setActivePage('services')}
                      id="view-services-cta"
                      className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
                    >
                      View Services Catalog
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="https://discord.gg/EJSvQU8cn9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 rounded-xl text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Join Discord
                      <ExternalLink className="w-4 h-4 text-indigo-400" />
                    </a>
                  </motion.div>

                  {/* Quick Benefits Tags */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className="flex flex-wrap justify-center gap-3.5 pt-6 w-full"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="flex items-center gap-2 p-2.5 px-4 rounded-xl bg-slate-900/40 border border-slate-900 cursor-pointer transition-colors hover:border-indigo-500/20"
                    >
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">100% Secure Setup</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="flex items-center gap-2 p-2.5 px-4 rounded-xl bg-slate-900/40 border border-slate-900 cursor-pointer transition-colors hover:border-indigo-500/20"
                    >
                      <Zap className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">Ultra-Fast Delivery</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="flex items-center gap-2 p-2.5 px-4 rounded-xl bg-slate-900/40 border border-slate-900 cursor-pointer transition-colors hover:border-indigo-500/20"
                    >
                      <Clock className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">24/7 Priority Support</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Steps Flow Workflow */}
              <ProcessFlow />

              {/* Two Column Layout (Bot Chat Agent + Live Metrics Overview) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                
                {/* Bot Chat Widget (Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.005 }}
                  className="lg:col-span-7 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                        DevGrid Interactive Support Agent
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-950 text-slate-500 px-2 py-0.5 rounded border border-slate-850">
                      ONLINEBOT
                    </span>
                  </div>

                  {/* Chat Log */}
                  <div className="space-y-3 max-h-[170px] overflow-y-auto pr-1 mb-4 text-xs">
                    {supportChat.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2.5 rounded-lg max-w-[90%] leading-relaxed ${
                          msg.sender === 'bot'
                            ? 'bg-slate-950 text-slate-300 mr-auto border border-slate-900'
                            : 'bg-indigo-600/15 text-indigo-200 ml-auto border border-indigo-500/20'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-[9px] text-slate-500 block text-right mt-1 font-mono">{msg.time}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chat Input form */}
                  <form onSubmit={handleSupportSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={supportQuestion}
                      onChange={(e) => setSupportQuestion(e.target.value)}
                      placeholder="Ask our agent (e.g. 'How much for bot setup?')"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-sans"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </motion.div>

                {/* Account Login Portal Overview Card (Right) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.005 }}
                  className="lg:col-span-5 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 font-mono flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      ADMIN & SUPPORT PORTAL
                    </h4>
                    <h3 className="text-lg font-bold text-white">Client Project Pipelines</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Custom server setups and order specifications are processed directly through support tickets on our secure Discord server.
                    </p>

                    {currentUser ? (
                      <div className="bg-slate-950/60 rounded-xl border border-slate-850 p-4 mt-5 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                            {currentUser.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                            <span className="text-[10px] text-indigo-400 block font-mono">{currentUser.email}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActivePage('account')}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          View Admin Panel
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-3.5">
                        <div className="text-xs text-slate-300">
                          ⚙️ Standard installations are managed entirely on our Discord server. If you are an administrator, you can access the system panel here.
                        </div>
                        <div className="flex flex-col gap-2">
                          <a
                            href="https://discord.gg/EJSvQU8cn9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>Open support ticket on Discord</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => { setIsAdminLoginVisible(true); setActivePage('inquiry'); }}
                            className="w-full py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition-all border border-slate-800 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Lock className="w-3 h-3 text-indigo-400" />
                            <span>If you are an admin click here</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-800/60 pt-4 mt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>STATUS: ALL ENGINES UP</span>
                    <span>© 2026</span>
                  </div>
                </motion.div>

              </div>



              {/* FAQ Accordion Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-slate-950/40 rounded-2xl border border-slate-900 p-8 space-y-6"
              >
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
                  <p className="text-sm text-slate-400">Everything you need to know about purchasing and deploying our systems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <motion.div 
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="bg-slate-900/20 p-5 rounded-xl border border-slate-900 hover:border-slate-800 transition-all cursor-pointer"
                  >
                    <h4 className="font-bold text-white text-sm">How do I order services?</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Simply visit our <strong>Services Catalog</strong> tab above, select any configuration tier (e.g. Minecraft Setup or Animated Design), and click <strong>Order here</strong>. It will route you directly to our Discord server where we can build it custom for you!
                    </p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="bg-slate-900/20 p-5 rounded-xl border border-slate-900 hover:border-slate-800 transition-all cursor-pointer"
                  >
                    <h4 className="font-bold text-white text-sm">Do you offer hosting?</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Yes! We offer a dedicated Low-Cost Minecraft Server hosting setup for ₹79. We also install the Pterodactyl admin game panel on your own virtual private servers (VPS) and secure your domains using Cloudflare enterprise routing.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* 2. SERVICES CATALOG PAGE */}
          {activePage === 'services' && (
            <motion.div
              key="services-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <ServicesPanel />
            </motion.div>
          )}

          {/* 4. INQUIRY DESK & CONTACT US PAGE */}
          {activePage === 'inquiry' && (
            <motion.div
              key="inquiry-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-10"
            >
              
              {/* Top Dual Cards: Auth State/Gate + Inquiry Desk */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Contact Form & Emails Display */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Contact Emails Card */}
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-indigo-400" />
                      Contact Us Direct Support
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Have personal questions or custom setup contracts? Reach out to us directly at either of our official emails.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Email 1 */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 flex flex-col justify-between group">
                        <div>
                          <span className="text-[10px] font-mono text-indigo-400 font-bold block uppercase tracking-wider">Primary Email</span>
                          <span className="text-sm font-semibold text-white block mt-1.5 truncate">Mr.lamonpro@gmail.com</span>
                        </div>
                        <button
                          onClick={() => handleCopyEmail('Mr.lamonpro@gmail.com')}
                          className="mt-4 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5"
                        >
                          {copiedEmail === 'Mr.lamonpro@gmail.com' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Email 2 */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 flex flex-col justify-between group">
                        <div>
                          <span className="text-[10px] font-mono text-purple-400 font-bold block uppercase tracking-wider">Administration</span>
                          <span className="text-sm font-semibold text-white block mt-1.5 truncate">mat576907@gmail.com</span>
                        </div>
                        <button
                          onClick={() => handleCopyEmail('mat576907@gmail.com')}
                          className="mt-4 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5"
                        >
                          {copiedEmail === 'mat576907@gmail.com' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Standard Contact Us Form */}
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6">
                    <h3 className="text-lg font-bold text-white mb-2">Send Secure Message</h3>
                    <p className="text-xs text-slate-400 mb-5">Have custom specifications? Drop us a line and we will review immediately.</p>
                    
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Your Name:</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="e.g. John Doe"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Your Email:</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="e.g. customer@domain.com"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Inquiry Details:</label>
                        <textarea
                          required
                          rows={3}
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="Write your custom Minecraft plugin, VPS, graphics design, or website development requirements here..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
                        />
                      </div>

                      {contactStatus && (
                        <div className={`p-3 rounded-lg text-xs font-semibold ${
                          contactStatus.includes('Thank') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-400'
                        }`}>
                          {contactStatus}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        Send Inquiry
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>

                </div>

                {/* Right: Registration System Block */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    {currentUser ? (
                      // Logged In Dashboard Overview
                      <div className="space-y-6 py-2">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xl mx-auto mb-3 shadow-lg shadow-indigo-600/30">
                            {currentUser.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
                            Administrator Profile
                          </span>
                          <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
                          <p className="text-xs text-slate-400 mt-0.5 font-mono">{currentUser.email}</p>
                        </div>

                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-3.5">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Your DevGrid Status</h4>
                          <div className="grid grid-cols-2 gap-3.5 text-xs">
                            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                              <span className="text-[10px] text-slate-500 block">Total Orders</span>
                              <span className="text-base font-extrabold text-indigo-400 block mt-0.5">0 Active</span>
                            </div>
                            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                              <span className="text-[10px] text-slate-500 block">Service Tier</span>
                              <span className="text-base font-extrabold text-emerald-400 block mt-0.5">Premium</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => setActivePage('account')}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            Enter Account Desk
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleLogOut}
                            className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all border border-slate-900 flex items-center justify-center gap-1.5"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Log Out
                          </button>
                        </div>
                      </div>
                    ) : !isAdminLoginVisible ? (
                      // Support Hub Panel for ordinary clients
                      <div className="space-y-5">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center">
                          <Terminal className="w-6 h-6" />
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1 font-mono">
                            CLIENT SUPPORT & SETUP CODES
                          </h4>
                          <h3 className="text-lg font-bold text-white">How To Order Configurations</h3>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          We do not accept standard sign-ups. All custom server build configurations, deployment requests, and graphics orders are handled securely through direct tickets on our Discord server.
                        </p>

                        <div className="bg-slate-950/60 rounded-xl border border-slate-850 p-4 space-y-3">
                          <div className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="text-indigo-400 font-mono font-bold mt-0.5">01.</span>
                            <span>Design your setup order or configuration via the <strong>Services Catalog</strong>.</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="text-indigo-400 font-mono font-bold mt-0.5">02.</span>
                            <span>Copy the inquiry details or setup specs from the <strong>Inquiry Desk</strong>.</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="text-indigo-400 font-mono font-bold mt-0.5">03.</span>
                            <span>Join Discord and open an instant ticket. Share the specs with engineers!</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <a
                            href="https://discord.gg/EJSvQU8cn9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow"
                          >
                            <span>Join DevGrid Discord Server</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="text-center pt-3 border-t border-slate-850/60">
                          <button
                            onClick={() => { setIsAdminLoginVisible(true); setAuthError(null); setAuthSuccess(null); }}
                            className="text-xs font-semibold text-slate-500 hover:text-indigo-400 transition-colors"
                          >
                            If you are an admin click here
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Admin Login Form
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Lock className="w-4 h-4 text-indigo-400" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">
                            ADMINISTRATOR ACCESS
                          </h4>
                        </div>
                        
                        <h3 className="text-base font-bold text-white mb-1.5">Secure Admin Console</h3>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                          Please sign in with your authorized administrator email and password key to access deployment logs.
                        </p>

                        <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Admin Email Address:</label>
                            <input
                              type="email"
                              required
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              placeholder="e.g. mr.lamonpro@gmail.com"
                              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Security Password Key:</label>
                            <input
                              type="password"
                              required
                              value={authPassword}
                              onChange={(e) => setAuthPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-750 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          {/* Error & Success Alerts */}
                          {authError && (
                            <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold leading-relaxed">
                              ⚠️ {authError}
                            </div>
                          )}

                          {authSuccess && (
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold leading-relaxed animate-pulse">
                              ✅ {authSuccess}
                            </div>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/15"
                          >
                            Authenticate Admin
                          </button>
                        </form>

                        <div className="text-center pt-5 mt-4 border-t border-slate-850/60">
                          <button
                            onClick={() => { setIsAdminLoginVisible(false); setAuthError(null); setAuthSuccess(null); }}
                            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto"
                          >
                            ← Back to Client Info
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* 5. USER ACCOUNT DASHBOARD */}
          {activePage === 'account' && (
            <motion.div
              key="account-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              
              {/* Account Header Banner */}
              <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-inner shrink-0">
                    {currentUser ? currentUser.name.substring(0, 2).toUpperCase() : 'DG'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{currentUser?.name || 'Valued Client'}</h2>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase font-mono">
                        Active Profile
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{currentUser?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="https://discord.gg/EJSvQU8cn9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                  >
                    Open Discord Ticket
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleLogOut}
                    className="px-3.5 py-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all border border-slate-850"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Account Core Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Interactive Client Activity Panel */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Active Setup Logs */}
                  <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
                    <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                      <Terminal className="w-4.5 h-4.5 text-indigo-400" />
                      Client Deployment Pipelines
                    </h3>
                    <p className="text-xs text-slate-400 mb-5">Track active setups and configurations custom ordered on Discord.</p>

                    <div className="border border-slate-850 rounded-xl overflow-hidden text-xs">
                      <div className="grid grid-cols-3 bg-slate-950 px-4 py-3 font-semibold text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-850">
                        <span>Project Setup</span>
                        <span>Billing Status</span>
                        <span>Uptime Status</span>
                      </div>
                      
                      <div className="divide-y divide-slate-850/60">
                        <div className="grid grid-cols-3 px-4 py-3.5 hover:bg-slate-900/30 transition-colors">
                          <span className="font-bold text-white">Full Minecraft Server Setup</span>
                          <span className="text-amber-400 font-mono font-semibold">Awaiting Discord Ticket</span>
                          <span className="text-slate-500 font-mono">Not Initiated</span>
                        </div>
                        <div className="grid grid-cols-3 px-4 py-3.5 hover:bg-slate-900/30 transition-colors">
                          <span className="font-bold text-white">Standard Web Design</span>
                          <span className="text-amber-400 font-mono font-semibold">Awaiting Discord Ticket</span>
                          <span className="text-slate-500 font-mono">Not Initiated</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl mt-5 flex items-start gap-3">
                      <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white mb-1">To commence immediate development:</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Simply copy your configuration codes from the Inquiry Desk, join our Discord server (<strong>https://discord.gg/EJSvQU8cn9</strong>), open a support ticket, and share it with our staff. We will update your panel state immediately!
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right: Personal Discount Tier card */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Discount / Level Tier */}
                  <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3.5">
                      <Award className="w-6 h-6" />
                    </div>

                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Client Level</h4>
                    <h3 className="text-lg font-extrabold text-white mt-1">Tier 1 Elite Member</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Enjoy a standard flat <strong className="text-emerald-400">10% discount</strong> on your next web development order. Valid on Discord tickets.
                    </p>

                    <div className="mt-5 pt-4 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-500">PROMO CODE: DEVGRIDT1</span>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Global Interactive simulated Google Sign-in Popup Modal */}
      <AnimatePresence>
        {showGooglePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span className="text-xs font-bold text-white font-mono">Sign in with Google</span>
                </div>
                <button
                  onClick={() => setShowGooglePopup(false)}
                  className="text-slate-400 hover:text-white font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              <span className="text-xs text-slate-400 block mb-3">Choose an account to continue to DevGrid Services:</span>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleGoogleSSO('mr.lamonpro@gmail.com', 'LamonPro')}
                  className="w-full p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">LP</div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block">LamonPro</span>
                    <span className="text-[10px] text-slate-500 block truncate font-mono">mr.lamonpro@gmail.com</span>
                  </div>
                </button>

                <button
                  onClick={() => handleGoogleSSO('mat576907@gmail.com', 'Mat')}
                  className="w-full p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs">M</div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block">Mat</span>
                    <span className="text-[10px] text-slate-500 block truncate font-mono">mat576907@gmail.com</span>
                  </div>
                </button>

                <button
                  onClick={() => handleGoogleSSO('anonymous.client@gmail.com', 'DevGrid Client')}
                  className="w-full p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl flex items-center gap-3 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">DC</div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block">DevGrid Client</span>
                    <span className="text-[10px] text-slate-500 block truncate font-mono">anonymous.client@gmail.com</span>
                  </div>
                </button>
              </div>

              <div className="text-[9px] text-slate-500 text-center mt-5 leading-relaxed font-sans">
                By continuing, Google shares your profile name and email address with DevGrid Services safely. See our Terms of Use.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950 py-10 px-4 mt-16 text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActivePage('home')}>
            <DevGridLogo className="w-8 h-8" />
            <div>
              <span className="font-bold text-white block">DevGrid Services</span>
              <p className="text-[10px] text-slate-600 mt-0.5">&copy; 2026 DevGrid Services. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap gap-6 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>99.9% Server Uptime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>The Best Services Company</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Verified Discord Vendor</span>
            </div>
          </div>

          <div>
            <a
              href="https://discord.gg/EJSvQU8cn9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline flex items-center gap-1"
            >
              Open Discord Support Ticket
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      <DevGridAIWidget />

    </div>
  );
}
