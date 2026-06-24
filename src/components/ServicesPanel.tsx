import React, { useState } from 'react';
import { Gamepad2, Cloud, Palette, Users, Globe, Check, ShoppingBag, Plus, Info, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceCategory, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data';

export default function ServicesPanel() {
  const [activeCategory, setActiveCategory] = useState<string>('minecraft');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Map icon names to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-violet-400" />;
      default: return <Gamepad2 className="w-5 h-5 text-slate-400" />;
    }
  };

  const currentCategory = SERVICES_DATA.find(cat => cat.id === activeCategory) || SERVICES_DATA[0];

  return (
    <div id="services-section" className="space-y-8">
      {/* Category Navigation Menu */}
      <div className="flex flex-col items-center text-center space-y-3">
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Our Service Catalog
        </h2>
        <p className="text-slate-400 max-w-2xl text-base leading-relaxed">
          Select from our 5 specialized categories below. Pick professional configurations, graphics, setups, or premium hosting solutions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none justify-start lg:justify-center gap-2 border-b border-slate-800">
        {SERVICES_DATA.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              id={`category-tab-${category.id}`}
              onClick={() => setActiveCategory(category.id)}
              className={`relative flex items-center gap-2.5 px-5 py-3.5 rounded-t-xl text-sm font-semibold transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-indigo-500 text-white bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
              }`}
            >
              <span className="text-lg leading-none">{category.emoji}</span>
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Current Category Banner */}
      <div className="bg-slate-950/40 rounded-2xl border border-slate-800/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
            {getIcon(currentCategory.iconName)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {currentCategory.emoji} {currentCategory.name}
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">{currentCategory.description}</p>
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 text-slate-400 text-xs px-3.5 py-1.5 rounded-lg font-mono">
          CATEGORY: {currentCategory.id.toUpperCase()}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {currentCategory.items.map((item) => {
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className="group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/60 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative glow on hover */}
                {hoveredItemId === item.id && (
                  <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none opacity-50 transition-opacity" />
                )}

                <div>
                  {/* Item Header */}
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </h4>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Price</span>
                      <span className="text-2xl font-extrabold text-white tracking-tight">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mt-3.5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Features / Specifications List */}
                  {item.features && item.features.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">What's included:</span>
                      <ul className="space-y-1.5">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Order & Cart Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Info className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Instant Discord delivery</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://discord.gg/EJSvQU8cn9"
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`order-service-${item.id}`}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Order on Discord</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
