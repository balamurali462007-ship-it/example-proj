
import React from 'react';
import { motion } from 'framer-motion';

const PolicyCenter: React.FC = () => {
  const policies = [
    { id: 'GP-01', title: 'Intent Alignment', status: 'Enforced', desc: 'Verifies proposed execution against original session intent deconstruction.' },
    { id: 'GP-02', title: 'Data Sovereignty', status: 'Enforced', desc: 'Prevents cross-border data flows not explicitly authorized by governance.' },
    { id: 'GP-03', title: 'Financial Threshold', status: 'Monitoring', desc: 'Auto-gates transactions exceeding $5,000 for human escalation.' },
    { id: 'GP-04', title: 'Credential Isolation', status: 'Enforced', desc: 'Enforces strictly ephemeral identity access for autonomous agents.' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="mb-20">
        <h2 className="text-4xl font-black font-display text-white tracking-tighter uppercase italic">Control Policies</h2>
        <p className="text-slate-500 font-medium text-lg mt-2">Deterministic execution boundaries for autonomous agents.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="tech-panel p-10 rounded-[2.5rem] border border-white/5 group hover:border-blue-500/20 transition-all"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 italic">{p.id}</span>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === 'Enforced' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'bg-slate-900 text-slate-500 border border-white/5'}`}>
                {p.status}
              </span>
            </div>
            <h4 className="text-3xl font-black font-display text-white mb-6 tracking-tight italic uppercase">{p.title}</h4>
            <p className="text-slate-400 leading-relaxed font-medium text-lg pr-4">{p.desc}</p>
            <div className="mt-10 pt-10 border-t border-white/5 flex gap-4">
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Edit Parameters</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Audit History</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PolicyCenter;
