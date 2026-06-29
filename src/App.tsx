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
  FileText,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DiscordWidget from './components/DiscordWidget';
import ServicesPanel from './components/ServicesPanel';
import ProcessFlow from './components/ProcessFlow';
import DevGridAIWidget from './components/DevGridAIWidget';
import DevGridLogo from './components/DevGridLogo';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminPanel from './components/admin/AdminPanel';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [activePage, setActivePage] = useState<'home' | 'services' | 'inquiry' | 'account' | 'login' | 'register' | 'admin-logs'>('home');

  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const [supportQuestion, setSupportQuestion] = useState('');
  const [supportChat, setSupportChat] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Welcome to DevGrid Services! I am your automated assistant. Ask me anything about our setups, pricing, VPS hosting, or how to order custom configurations!',
      time: 'Just now'
    }
  ]);

  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest animate-pulse">Initializing DevGrid Core...</p>
      </div>
    );
  }

  const currentUser = user;

  // Simulated Google SSO Handler (Disabled for now, will integrate with Firebase later)
  const handleGoogleSSO = (email: string, name: string) => {
    setAuthError('Google SSO is temporarily disabled. Please use email/password.');
  };

  const handleLogOut = async () => {
    await logout();
    setActivePage('home');
  };

  // Navigation and UI handlers
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
      <Navbar setActivePage={setActivePage} activePage={activePage} />
      
      {/* Dynamic Ambient Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[45vw] h-[45vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />



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
                            {currentUser.username.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{currentUser.username}</span>
                            <span className="text-[10px] text-indigo-400 block font-mono">{currentUser.email}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActivePage(user?.isAdmin ? 'admin-logs' : 'account')}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          View {user?.isAdmin ? 'Admin' : 'Account'} Panel
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
                            onClick={() => setActivePage('admin-login')}
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

          {/* 5. AUTH PAGES */}
          {activePage === 'login' && <Login setActivePage={setActivePage} />}
          {activePage === 'register' && <Register setActivePage={setActivePage} />}
          {activePage === 'admin-logs' && user?.isAdmin ? <AdminPanel /> : null}

          {/* 6. INQUIRY DESK PAGE */}
          {activePage === 'inquiry' && (
            <motion.div
              key="inquiry-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Inquiry & Support Desk</h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                  Have a custom requirement? Need a specialized bot or server setup? Our team is standing by to help you build your digital infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Options */}
                <div className="space-y-6">
                  <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl text-center space-y-4">
                    <p className="text-sm text-slate-300 font-semibold mb-2">Join our growing community!</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      "For the fastest response time, join our Discord community and open a support ticket. We usually respond within 15-30 minutes."
                    </p>
                    <a
                      href="https://discord.gg/EJSvQU8cn9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                      Join DevGrid Discord
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Interactive Bot */}
                <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col h-full min-h-[400px]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-white font-bold text-sm">Quick Assist Bot</h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Interactive</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-hide">
                    {supportChat.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'bot' ? 'bg-slate-950 text-slate-300 border border-slate-900' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10'}`}>
                          {msg.text}
                          <span className="block text-[9px] mt-1 opacity-50 text-right font-mono">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSupportSubmit} className="relative">
                    <input
                      type="text"
                      value={supportQuestion}
                      onChange={(e) => setSupportQuestion(e.target.value)}
                      placeholder="Ask a question..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 pr-12"
                    />
                    <button type="submit" className="absolute right-2 top-2 p-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
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
                    {currentUser ? currentUser.username.substring(0, 2).toUpperCase() : 'DG'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{currentUser?.username || 'Valued Client'}</h2>
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