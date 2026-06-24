import React from 'react';

export default function DevGridLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg 
      className={`${className} transition-transform duration-300 hover:scale-105`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dynamic bright neon gradients matching our premium aesthetic */}
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* Indigo 500 */}
          <stop offset="50%" stopColor="#8b5cf6" /> {/* Purple 500 */}
          <stop offset="100%" stopColor="#ec4899" /> {/* Pink 500 */}
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
        </linearGradient>
        {/* Subtle drop shadow filter */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Beautiful High-Tech Slate Glassmorphic Base */}
      <rect 
        x="6" 
        y="6" 
        width="88" 
        height="88" 
        rx="22" 
        fill="#020617" 
        stroke="#1e293b" 
        strokeWidth="2" 
      />

      {/* Cyberpunk Grid Mesh Background */}
      <line x1="28" y1="6" x2="28" y2="94" stroke="#0f172a" strokeWidth="1.5" />
      <line x1="50" y1="6" x2="50" y2="94" stroke="#1e1b4b" strokeWidth="1.5" />
      <line x1="72" y1="6" x2="72" y2="94" stroke="#0f172a" strokeWidth="1.5" />
      
      <line x1="6" y1="28" x2="94" y2="28" stroke="#0f172a" strokeWidth="1.5" />
      <line x1="6" y1="50" x2="94" y2="50" stroke="#1e1b4b" strokeWidth="1.5" />
      <line x1="6" y1="72" x2="94" y2="72" stroke="#0f172a" strokeWidth="1.5" />

      {/* Futuristic Isometric Cube/Network Structure with Glowing Connections */}
      <g filter="url(#logoGlow)">
        
        {/* Connection tracks/paths */}
        <path 
          d="M 28 50 L 50 28 L 72 50 L 50 72 Z" 
          stroke="url(#logoGradient)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Diagonal inner matrix links representing the Dev 'Grid' */}
        <path 
          d="M 50 28 L 50 72 M 28 50 L 72 50" 
          stroke="url(#logoGradient)" 
          strokeWidth="1.5" 
          strokeOpacity="0.7"
          strokeLinecap="round" 
        />

        {/* Interactive glowing center node */}
        <circle cx="50" cy="50" r="7" fill="url(#logoGradient)" className="animate-pulse" />
        <circle cx="50" cy="50" r="1.5" fill="#ffffff" />

        {/* Peripheral Node Pins */}
        <circle cx="28" cy="50" r="4.5" fill="#6366f1" stroke="#020617" strokeWidth="1.5" />
        <circle cx="50" cy="28" r="4.5" fill="#8b5cf6" stroke="#020617" strokeWidth="1.5" />
        <circle cx="72" cy="50" r="4.5" fill="#ec4899" stroke="#020617" strokeWidth="1.5" />
        <circle cx="50" cy="72" r="4.5" fill="#8b5cf6" stroke="#020617" strokeWidth="1.5" />

        {/* Small bright core coordinates */}
        <circle cx="28" cy="28" r="2" fill="#334155" />
        <circle cx="72" cy="28" r="2" fill="#334155" />
        <circle cx="28" cy="72" r="2" fill="#334155" />
        <circle cx="72" cy="72" r="2" fill="#334155" />

        {/* Outer orbital decorative ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="36" 
          stroke="url(#logoGradient)" 
          strokeWidth="1" 
          strokeDasharray="4 8" 
          strokeOpacity="0.4"
        />
      </g>
    </svg>
  );
}
