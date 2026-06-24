import React from 'react';
import { MessageSquare, ArrowRight, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProcessFlow() {
  const steps = [
    {
      num: '01',
      title: 'Pick Your Services',
      desc: 'Browse our specialized catalog and select from our Minecraft, Discord, hosting, design, or website development services.',
      color: 'from-blue-500/20 to-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    {
      num: '02',
      title: 'Generate Booking Code',
      desc: 'Use our interactive inquiry builder to compile your items, specify requirements, and generate an order ticket block.',
      color: 'from-purple-500/20 to-pink-500/10 text-pink-400 border-pink-500/20'
    },
    {
      num: '03',
      title: 'Open Discord Ticket',
      desc: 'Click Join, open a support ticket in our Discord server, and paste your compiled booking code for rapid confirmation.',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      num: '04',
      title: 'Quick Premium Delivery',
      desc: 'Our designated team gets to work immediately, providing updates directly in your private channel until you are 100% satisfied.',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/20'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="mb-8">
        <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 font-mono flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          WORKFLOW PIPELINE
        </h4>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">How DevGrid Services Works</h3>
        <p className="text-sm text-slate-400 mt-1">Get your premium setups and products in 4 simple steps.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx} 
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -4 }}
          >
            {/* Connection Line */}
            {idx < 3 && (
              <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[1px] bg-gradient-to-r from-slate-800 to-transparent z-0 group-hover:from-indigo-500/30 transition-all duration-350" />
            )}

            <div className="relative z-10 space-y-3.5">
              {/* Badge */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} border flex items-center justify-center font-mono font-bold text-sm shadow-md transition-transform duration-300 group-hover:rotate-6`}>
                {step.num}
              </div>

              {/* Text info */}
              <h5 className="font-bold text-white text-base leading-tight group-hover:text-indigo-300 transition-colors">
                {step.title}
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
