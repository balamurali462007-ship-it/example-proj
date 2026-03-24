
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActionInput } from '../types';

interface GovernanceTerminalProps {
  onCancel: () => void;
  onSubmit: (input: ActionInput) => void;
  isProcessing: boolean;
}

const GovernanceTerminal: React.FC<GovernanceTerminalProps> = ({ onCancel, onSubmit, isProcessing }) => {
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('Data Retrieval');
  const [sensitivity, setSensitivity] = useState<'low' | 'medium' | 'high'>('high');
  const [dataOwner, setDataOwner] = useState('');
  const [impact, setImpact] = useState<'low' | 'medium' | 'high'>('low');
  const [complianceFlags, setComplianceFlags] = useState('');
  const [businessUnit, setBusinessUnit] = useState('Global Operations');
  const [region, setRegion] = useState('US-EAST-1');
  const [env, setEnv] = useState<'production' | 'staging' | 'development'>('production');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    
    onSubmit({
      action_type: type,
      action_description: desc,
      context: {
        source_system: 'PROJECT-Z-GATEWAY',
        user_role: 'System-Architect',
        data_sensitivity: sensitivity,
        data_owner: dataOwner || 'Infrastructure-Admin',
        target_system_impact: impact,
        compliance_flags: complianceFlags || 'Standard-Policy',
        business_unit: businessUnit,
        geographic_region: region,
        environment: env
      }
    });
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onCancel} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#08090a] border border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden shadow-[0_60px_150px_rgba(0,0,0,1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black font-display text-white uppercase tracking-tighter italic">Signal Ingestor</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.5em] mt-1 italic font-black">Autonomous Execution Ingestion Terminal</p>
          </div>
          <button onClick={onCancel} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all border border-white/5 interact-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Primary Intent Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Core Intent Deconstruction</label>
              <span className="text-[9px] font-mono text-slate-700">INPUT_REQUIRED</span>
            </div>
            <textarea 
              autoFocus
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe the proposed AI execution path in detail..."
              className="w-full bg-white/[0.01] border border-white/5 rounded-3xl p-8 text-lg focus:outline-none focus:border-blue-500/30 transition-all h-40 resize-none font-medium text-slate-200 leading-relaxed shadow-inner"
            />
          </div>

          {/* Granular Context Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Execution Environment</label>
              <div className="grid grid-cols-1 gap-2">
                {(['production', 'staging', 'development'] as const).map(e => (
                  <button 
                    key={e}
                    type="button"
                    onClick={() => setEnv(e)}
                    className={`px-4 py-3 rounded-xl border flex items-center justify-between text-[10px] font-black uppercase tracking-widest transition-all ${env === e ? 'border-blue-500/40 text-blue-400 bg-blue-500/5' : 'border-white/5 text-slate-600 hover:border-white/10'}`}
                  >
                    <span>{e}</span>
                    {env === e && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">System Impact & Risk</label>
              <div className="space-y-6 bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-700 uppercase font-black">Data Sensitivity</span>
                  <div className="flex gap-1">
                    {(['low', 'medium', 'high'] as const).map(l => (
                      <button 
                        key={l}
                        type="button"
                        onClick={() => setSensitivity(l)}
                        className={`flex-1 py-2 rounded-lg border text-[9px] font-black uppercase transition-all ${sensitivity === l ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-transparent border-white/5 text-slate-700'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-700 uppercase font-black">Target Impact</span>
                  <div className="flex gap-1">
                    {(['low', 'medium', 'high'] as const).map(l => (
                      <button 
                        key={l}
                        type="button"
                        onClick={() => setImpact(l)}
                        className={`flex-1 py-2 rounded-lg border text-[9px] font-black uppercase transition-all ${impact === l ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-transparent border-white/5 text-slate-700'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Data Owner / Custodian</label>
                <input 
                  type="text"
                  value={dataOwner}
                  onChange={(e) => setDataOwner(e.target.value)}
                  placeholder="EX: FINANCE_CORE_OPS"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500/20 font-bold uppercase"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Business Unit</label>
                <input 
                  type="text"
                  value={businessUnit}
                  onChange={(e) => setBusinessUnit(e.target.value)}
                  placeholder="EX: GLOBAL_REVENUE"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500/20 font-bold uppercase"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Compliance Flags & Protocols</label>
              <input 
                type="text"
                value={complianceFlags}
                onChange={(e) => setComplianceFlags(e.target.value)}
                placeholder="EX: GDPR-RTBF, SOX-CONTROLS-4, SOC2-TRUST-SERVICE..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-[11px] text-blue-400 focus:outline-none focus:border-blue-500/20 font-bold tracking-widest uppercase placeholder-slate-800"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Geographic Region</label>
              <input 
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="EX: US-EAST-1"
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500/20 font-bold tracking-widest uppercase"
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={!desc.trim() || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-black uppercase tracking-[0.5em] py-8 rounded-[2rem] transition-all shadow-[0_20px_60px_rgba(37,99,235,0.2)] interact-click flex items-center justify-center gap-6"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              <span>{isProcessing ? 'SYNCHRONIZING INTELLIGENCE...' : 'INITIATE PRE-EXECUTION SUPERVISION'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default GovernanceTerminal;
