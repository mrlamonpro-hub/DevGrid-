import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  setActivePage: (page: any) => void;
}

export default function Login({ setActivePage }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await login(email, password);
      console.log('User logged in:', email);
      if (email.toLowerCase().trim() === 'mr.lamonpro@gmail.com') {
        setActivePage('admin-logs');
      } else {
        setActivePage('home');
      }
    } catch (error) {
      setErrorMsg((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 bg-slate-900 text-white rounded-lg border border-slate-700 shadow-xl max-w-xs mx-auto mt-10">
      <h2 className="text-xl mb-4 font-bold text-center">Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 bg-slate-950 border border-slate-800 rounded focus:border-indigo-500 outline-none" required disabled={isLoading} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 bg-slate-950 border border-slate-800 rounded focus:border-indigo-500 outline-none" required disabled={isLoading} />
      
      {errorMsg && (
        <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded text-xs text-red-300 text-center">
          {errorMsg}
        </div>
      )}

      <button type="submit" className="w-full p-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition active:scale-95 disabled:opacity-50" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}
