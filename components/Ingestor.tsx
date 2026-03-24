
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActionInput } from '../types';

interface IngestorProps {
  onAnalyze: (input: ActionInput) => void;
  onCancel: () => void;
}

const Ingestor: React.FC<IngestorProps> = ({ onAnalyze, onCancel }) => {
  // Fixed: Added missing required context properties (data_owner, target_system_impact, etc.) and initialized state correctly
  const [formData, setFormData] = useState<ActionInput>({
    action_type: 'Data Retrieval',
    action_description: '',
    context: {
      source_system: 'CRM-Core-01',
      user_role: 'Agent',
      time: new Date().toLocaleTimeString(),
      frequency: 'low',
      data_sensitivity: 'low',
      data_owner: 'System-Admin',
      target_system_impact: 'low',
      compliance_flags: 'Standard',
      business_unit: 'Operations',
      geographic_region: 'US-EAST',
      environment: 'production'
    },
    historical_baseline: {
      is_normal_behavior: true,
      previous_similar_actions: 'low'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.action_description.trim()) {
      onAnalyze(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Action Ingestor</h1>
          <p className="text-slate-400">Ingest AI execution proposals for governance review.</p>
        </div>
        <button 
          onClick={onCancel}
          className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          Abort
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass rounded-[2rem] p-10 border border-white/5 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Action Type</label>
              <select 
                value={formData.action_type}
                onChange={(e) => setFormData({...formData, action_type: e.target.value})}
                className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50"
              >
                <option>Data Retrieval</option>
                <option>System Configuration</option>
                <option>Financial Transaction</option>
                <option>Permission Escalation</option>
                <option>Bulk Deletion</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Data Sensitivity</label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({...formData, context: {...formData.context, data_sensitivity: lvl as any}})}
                    className={`flex-1 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                      formData.context.data_sensitivity === lvl 
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' 
                        : 'bg-slate-900 border-white/5 text-slate-500'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Action Description & Proposed Content</label>
            <textarea
              required
              value={formData.action_description}
              onChange={(e) => setFormData({...formData, action_description: e.target.value})}
              placeholder="Describe what the AI is proposing to execute..."
              className="w-full h-40 bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none font-medium leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">User Role Context</label>
                <input 
                   type="text"
                   value={formData.context.user_role}
                   onChange={(e) => setFormData({...formData, context: {...formData.context, user_role: e.target.value}})}
                   className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-slate-200"
                />
             </div>
             <div className="flex items-center gap-4 pt-6">
                <button
                  type="button"
                  // Fixed: Added optional chaining and proper property updates for historical_baseline
                  onClick={() => setFormData({...formData, historical_baseline: {
                    is_normal_behavior: !formData.historical_baseline?.is_normal_behavior,
                    previous_similar_actions: formData.historical_baseline?.previous_similar_actions || 'low'
                  }})}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${formData.historical_baseline?.is_normal_behavior ? 'bg-emerald-600' : 'bg-slate-700'}`}
                >
                  <motion.div 
                    animate={{ x: formData.historical_baseline?.is_normal_behavior ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full shadow-lg" 
                  />
                </button>
                <span className="text-xs font-bold text-slate-400">Behavior matches historical baseline</span>
             </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full py-6 rounded-3xl font-black text-2xl transition-all relative overflow-hidden group bg-emerald-600 shadow-2xl shadow-emerald-500/20"
        >
          <span className="relative z-10">Initiate Governance Analysis</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </form>
    </div>
  );
};

export default Ingestor;
