
import React from 'react';
import { motion } from 'framer-motion';
import { GovernanceReport } from '../types';

interface HistoryViewProps {
  history: GovernanceReport[];
  onViewReport: (rep: GovernanceReport) => void;
  onClear: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onViewReport, onClear }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Governance Audit Logs</h1>
          <p className="text-slate-400">Review historical AI execution decisions and operator notes.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="text-slate-500 hover:text-red-400 transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            Purge Logs
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass border-dashed border-2 border-white/5 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center">
          <p className="text-slate-500 font-bold">No governance reports recorded.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => onViewReport(item)}
              className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-6 cursor-pointer hover:border-emerald-500/30 transition-all group"
            >
              <div className={`w-28 h-12 rounded-lg flex items-center justify-center font-black text-xs font-display tracking-widest flex-shrink-0 ${
                item.decision === 'BLOCK' ? 'bg-red-500/20 text-red-400' : 
                item.decision === 'ESCALATE' ? 'bg-amber-500/20 text-amber-400' : 
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                {item.decision}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-200 truncate">{item.input_summary}</h3>
                  {item.operator_notes && (
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" title="Operator note attached" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                   <span className={`text-[10px] font-black uppercase ${
                     item.confidence_band === 'Stable' ? 'text-emerald-500' : 
                     item.confidence_band === 'Caution' ? 'text-amber-500' : 'text-red-500'
                   }`}>
                     {item.confidence_band}
                   </span>
                   <span className="text-slate-700 text-[10px]">•</span>
                   <p className="text-slate-500 text-xs truncate">{item.reason}</p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  {new Date(item.timestamp).toLocaleDateString()}
                </p>
                <p className="text-xs font-bold text-emerald-500/50 mt-1">Audit Trail &rarr;</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
