import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  setActivePage: (page: any) => void;
}

export default function Register({ setActivePage }: Props) {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await register(username, email, password);
      setActivePage('home');
    } catch (error) {
      setErrorMsg((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 bg-slate-900 text-white rounded-lg border border-slate-700 shadow-xl max-w-xs mx-auto mt-10">
      <h2 className="text-xl mb-4 font-bold text-center">Register</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full mb-3 p-2 bg-slate-950 border border-slate-800 rounded focus:border-indigo-500 outline-none" required disabled={isLoading} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 bg-slate-950 border border-slate-800 rounded focus:border-indigo-500 outline-none" required disabled={isLoading} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 bg-slate-950 border border-slate-800 rounded focus:border-indigo-500 outline-none" required disabled={isLoading} />
      
      {errorMsg && (
        <div className="mb-4 p-2 bg-indigo-500/20 border border-indigo-500/50 rounded text-xs text-indigo-300 text-center animate-fade-in">
          {errorMsg}
        </div>
      )}

      <button type="submit" className="w-full p-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition active:scale-95 disabled:opacity-50" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
    </form>
  );
}
