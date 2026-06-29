import React, { useState } from 'react';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DevGridLogo from './DevGridLogo';

export default function Navbar({ setActivePage, activePage }: { setActivePage: any, activePage: any }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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

          <div className="flex-1 flex justify-center items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setActivePage('home')}
            className={`transition-colors ${activePage === 'home' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
          >
            Homes
          </button>
          <button
            onClick={() => setActivePage('services')}
            className={`transition-colors ${activePage === 'services' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'} cursor-pointer`}
          >
            Services Catalog
          </button>
          <button
            onClick={() => setActivePage('inquiry')}
            className={`transition-colors ${activePage === 'inquiry' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'} cursor-pointer`}
          >
            Inquiry Desk
          </button>
          {user?.isAdmin && (
            <button
              onClick={() => setActivePage('admin-logs')}
              className={`transition-colors ${activePage === 'admin-logs' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'} cursor-pointer font-bold text-indigo-300`}
            >
              Admin Logs
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
              >
                <User className="w-4 h-4" />
                {user.username}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-1 z-50">
                  <button
                    onClick={() => { logout(); setShowDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-slate-800 rounded transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3 h-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => setActivePage('login')}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Login
              </button>
              <button
                onClick={() => setActivePage('register')}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
