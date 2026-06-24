import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Terminal, 
  Sparkles, 
  HelpCircle, 
  Info, 
  Gamepad2, 
  Paintbrush, 
  MessageSquare, 
  Globe, 
  Cloud, 
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isRichContent?: boolean;
  richType?: 'info' | 'help';
}

export default function DevGridAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am DevGrid AI, your direct systems assistant. Type `/info` or `/help` to begin, or click one of the quick command buttons below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = Math.random().toString(36).substring(7);
    const aiMsgId = Math.random().toString(36).substring(7);

    // Add User Command message
    setMessages(prev => [...prev, {
      id: userMsgId,
      sender: 'user',
      text: command,
      timestamp
    }]);

    const cleanedCmd = command.trim().toLowerCase();

    // Generate AI response
    setTimeout(() => {
      if (cleanedCmd === '/info') {
        setMessages(prev => [...prev, {
          id: aiMsgId,
          sender: 'ai',
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRichContent: true,
          richType: 'info'
        }]);
      } else if (cleanedCmd === '/help') {
        setMessages(prev => [...prev, {
          id: aiMsgId,
          sender: 'ai',
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRichContent: true,
          richType: 'help'
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: aiMsgId,
          sender: 'ai',
          text: `I'm sorry, I didn't recognize that command. Please type \`/info\` to see our catalog of professional services or \`/help\` to learn how to place an order.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleCommand(inputText);
    setInputText('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="devgrid-ai-toggle"
          className="relative px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-indigo-400/20 group"
        >
          {/* Unread dot */}
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[9px] font-extrabold text-white animate-bounce">
              1
            </span>
          )}

          {/* Pulse ring animation */}
          <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping group-hover:animate-none pointer-events-none" />

          <Bot className="w-4.5 h-4.5 text-indigo-100 animate-pulse" />
          <span className="text-xs tracking-tight">DevGrid AI</span>
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 text-[8px] font-mono border border-indigo-500/30">
            /command
          </span>
        </button>
      </div>

      {/* Floating Chat/Console Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            id="devgrid-ai-panel"
            className="fixed bottom-22 right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] bg-slate-950 border border-slate-900 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            
            {/* Header */}
            <div className="bg-slate-950 px-4 py-3.5 border-b border-slate-900/85 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white tracking-wide uppercase font-mono flex items-center gap-1.5">
                    DevGrid AI Desk
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">Interactive Systems Command Center</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Screen */}
            <div className="flex-1 min-h-[300px] max-h-[420px] overflow-y-auto p-4 space-y-4 bg-slate-950/40 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] rounded-xl px-3 py-2.5 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none font-mono font-bold'
                      : 'bg-slate-900 border border-slate-850 text-slate-300 rounded-bl-none'
                  }`}>
                    
                    {/* Normal Text Content */}
                    {!msg.isRichContent && <p className="leading-relaxed">{msg.text}</p>}

                    {/* Rich Response: /info */}
                    {msg.isRichContent && msg.richType === 'info' && (
                      <div className="space-y-4">
                        <div className="border-b border-slate-800 pb-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" />
                            Our Premium Services
                          </span>
                          <p className="text-slate-400 mt-1 leading-relaxed">
                            We provide industry-leading configurations, graphic arts, and cloud computing for client systems:
                          </p>
                        </div>

                        {/* Minecraft Setup */}
                        <div className="space-y-1">
                          <span className="font-extrabold text-white text-xs flex items-center gap-1.5">
                            <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
                            🎮 Minecraft Server Setup
                          </span>
                          <ul className="pl-5 list-disc text-slate-400 text-[11px] space-y-0.5">
                            <li>Basic Setup</li>
                            <li>Plugin Setup</li>
                            <li>Permissions Setup</li>
                            <li>Full Server Setup</li>
                          </ul>
                        </div>

                        {/* Creative Design */}
                        <div className="space-y-1">
                          <span className="font-extrabold text-white text-xs flex items-center gap-1.5">
                            <Paintbrush className="w-3.5 h-3.5 text-purple-400" />
                            🎨 Creative Design Works
                          </span>
                          <ul className="pl-5 list-disc text-slate-400 text-[11px] space-y-0.5">
                            <li>Logo Design</li>
                            <li>Server Banner</li>
                            <li>Discord Advertisement</li>
                            <li>Full Branding Pack</li>
                          </ul>
                        </div>

                        {/* Discord Community */}
                        <div className="space-y-1">
                          <span className="font-extrabold text-white text-xs flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                            🤖 Discord Community Services
                          </span>
                          <ul className="pl-5 list-disc text-slate-400 text-[11px] space-y-0.5">
                            <li>Bot Setup</li>
                            <li>AutoMod Setup</li>
                            <li>Ticket System</li>
                            <li>Full Discord Setup</li>
                          </ul>
                        </div>

                        {/* Website Development */}
                        <div className="space-y-1">
                          <span className="font-extrabold text-white text-xs flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-emerald-400" />
                            🌐 Website Development Services
                          </span>
                          <ul className="pl-5 list-disc text-slate-400 text-[11px] space-y-0.5">
                            <li>Standard Web Design</li>
                            <li>Animated Web Design</li>
                            <li>Premium Animated & Professional Web Design (with Contact Integration)</li>
                            <li>Contact Us Page & Form Setup</li>
                          </ul>
                        </div>

                        {/* Hosting Services */}
                        <div className="space-y-1">
                          <span className="font-extrabold text-white text-xs flex items-center gap-1.5">
                            <Cloud className="w-3.5 h-3.5 text-amber-400" />
                            ☁️ Hosting Services
                          </span>
                          <ul className="pl-5 list-disc text-slate-400 text-[11px] space-y-0.5">
                            <li>Minecraft Server Hosting Low Cost</li>
                            <li>VPS Configuration & Setup</li>
                            <li>Pterodactyl Panel Installation</li>
                            <li>Custom Domain & Cloudflare Security Setup</li>
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                          Type <code className="text-indigo-400">/help</code> to learn how to place your order!
                        </div>
                      </div>
                    )}

                    {/* Rich Response: /help */}
                    {msg.isRichContent && msg.richType === 'help' && (
                      <div className="space-y-3">
                        <div className="border-b border-slate-800 pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Order Placement Guidelines
                          </span>
                          <p className="text-slate-400 mt-1 leading-relaxed">
                            Follow these simple steps to place an order with our deployment engineers:
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-1">
                          <div className="flex gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-indigo-400 shrink-0">1</span>
                            <p className="text-[11px] text-slate-300">
                              Go into the <strong className="text-white">Services Catalog</strong> tab at the top of the page.
                            </p>
                          </div>
                          <div className="flex gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-indigo-400 shrink-0">2</span>
                            <p className="text-[11px] text-slate-300">
                              Choose your reason / desired configuration tier (e.g. Minecraft Setup or Premium Web Design).
                            </p>
                          </div>
                          <div className="flex gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-indigo-400 shrink-0">3</span>
                            <p className="text-[11px] text-slate-300">
                              Go to our Discord server and open a support ticket from the <strong className="text-indigo-400">#order-here</strong> channel.
                            </p>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-800 flex justify-end">
                          <a
                            href="https://discord.gg/EJSvQU8cn9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer"
                          >
                            <span>Join Discord Server</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    <span className="text-[9px] text-slate-500 block text-right mt-1.5 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center gap-2">
              <button
                onClick={() => handleCommand('/info')}
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-indigo-400 hover:text-indigo-300 text-[10px] font-extrabold rounded-lg border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer font-mono"
              >
                <Info className="w-3 h-3" />
                <span>/info</span>
              </button>
              <button
                onClick={() => handleCommand('/help')}
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 text-[10px] font-extrabold rounded-lg border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer font-mono"
              >
                <HelpCircle className="w-3 h-3" />
                <span>/help</span>
              </button>
            </div>

            {/* Text Form Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-slate-900 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type command /info or /help..."
                className="flex-1 bg-slate-900 border border-slate-850 text-xs text-white rounded-xl py-2.5 px-3.5 outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
