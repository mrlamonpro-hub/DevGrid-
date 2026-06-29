import { useEffect, useState } from 'react';
import { Users, Activity, Clock, Mail, Shield } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface LogEntry {
  id: string;
  email: string;
  timestamp: string;
  type?: string;
  ipAddress?: string;
  category?: string;
}

interface UserEntry {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  isAdmin?: boolean;
}

export default function AdminPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'client-logs' | 'admin-logs'>('client-logs');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch users
        const usersSnapshot = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserEntry[];
        setUsers(usersList);

        // Fetch logs
        const logsSnapshot = await getDocs(query(collection(db, 'logs'), orderBy('timestamp', 'desc')));
        const logsList = logsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
        })) as LogEntry[];
        setLogs(logsList);
      } catch (err) {
        console.error("Failed to fetch admin data from Firestore", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-500" />
            Admin Logs
          </h1>
          <p className="text-slate-400 mt-1">Monitor system growth and client registration activity.</p>
        </div>

        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 self-start">
          <button 
            onClick={() => setActiveTab('client-logs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'client-logs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            <Users className="w-4 h-4" />
            Client Logs
          </button>
          <button 
            onClick={() => setActiveTab('admin-logs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'admin-logs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            <Activity className="w-4 h-4" />
            System Access
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Decrypting Records...</p>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
          {activeTab === 'client-logs' ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, idx) => (
                  <div key={user.id || user.email || idx} className="bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${user.isAdmin ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                        {user.isAdmin ? 'Admin' : 'Client'}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">{user.username}</h3>
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-mono tracking-tighter">
                        <Clock className="w-3 h-3" />
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Legacy'}
                      </div>
                      <div className="text-[10px] text-indigo-500/60 font-bold uppercase tracking-widest">Active Entry</div>
                    </div>
                  </div>
                ))}
              </div>
              {users.length === 0 && (
                <div className="py-20 text-center space-y-3">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-700">
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 italic text-sm">No client registration logs identified.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Admin/User Identity</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Access Timestamp</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source IP</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Log Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {logs.map((log, idx) => (
                    <tr key={log.id || idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-slate-300 font-mono text-sm">{log.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-500 text-sm">{new Date(log.timestamp).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-500 font-mono text-xs">{log.ipAddress || '127.0.0.1'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-1 rounded ${log.type === 'registration' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-indigo-500 border-indigo-500/20 bg-indigo-500/5'}`}>
                          {log.type === 'registration' ? 'Client Registration' : 'System Authentication'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr key="empty-logs">
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-500 italic">Admin logs are currently empty.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
