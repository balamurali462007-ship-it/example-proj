
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState, GovernanceSignal, ActionInput } from './types.ts';
import ControlCore from './components/ControlCore.tsx';
import SignalOverlay from './components/SignalOverlay.tsx';
import GovernanceTerminal from './components/GovernanceTerminal.tsx';
import PerspectiveOverlay from './components/PerspectiveOverlay.tsx';
import LandingPage from './components/LandingPage.tsx';
import PolicyCenter from './components/PolicyCenter.tsx';
import IntegrationsPage from './components/IntegrationsPage.tsx';
import ResearchPage from './components/ResearchPage.tsx';
import Sidebar from './components/Sidebar.tsx';
import AnalysisView from './components/AnalysisView.tsx';
import RevealView from './components/RevealView.tsx';
import { analyzeAction } from './geminiService.ts';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [signals, setSignals] = useState<GovernanceSignal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<GovernanceSignal | null>(null);
  const [showPerspective, setShowPerspective] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [pendingSignal, setPendingSignal] = useState<GovernanceSignal | null>(null);
  const [systemState, setSystemState] = useState<'IDLE' | 'EVALUATING' | 'RESOLVED' | 'RISK'>('IDLE');

  const handleIngest = async (input: ActionInput) => {
    setIsProcessing(true);
    setSystemState('EVALUATING');
    try {
      const result = await analyzeAction(input);
      const signal: GovernanceSignal = {
        id: crypto.randomUUID(),
        intent: input.action_description,
        decision: result.decision as any,
        risk_score: result.risk_score,
        analysis: result.analysis,
        ui_vfx_trigger: result.ui_vfx_trigger,
        recommended_action: result.recommended_action,
        timestamp: Date.now(),
      };
      
      // Deliberate pause for cinematic analysis effect
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      setSignals(prev => [signal, ...prev].slice(0, 30));
      setPendingSignal(signal);
      setShowReveal(true);
      setSystemState(signal.decision === 'BLOCK' ? 'RISK' : 'RESOLVED');
    } catch (e) {
      console.error("Governance Failure:", e);
      setSystemState('RISK');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRevealComplete = () => {
    if (pendingSignal) {
      setSelectedSignal(pendingSignal);
      setPendingSignal(null);
    }
    setShowReveal(false);
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.LIVING_PLANE:
        return (
          <ControlCore 
            signals={signals} 
            onSignalSelect={setSelectedSignal} 
            isProcessing={isProcessing} 
            onInitiate={() => setView(ViewState.GOVERNANCE_CONSOLE)} 
            explainMode={false} 
          />
        );
      case ViewState.AUDIT_LOGS:
        return (
          <div className="max-w-5xl mx-auto py-20">
            <h2 className="text-4xl font-black font-display text-white uppercase italic mb-12">Audit Flux Logs</h2>
            <div className="space-y-4">
              {signals.map(s => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={s.id} 
                  onClick={() => setSelectedSignal(s)} 
                  className="tech-panel p-6 rounded-2xl flex items-center gap-10 cursor-pointer hover:border-white/10 transition-all group"
                >
                  <div className={`w-24 py-2 rounded text-[9px] font-black uppercase text-center ${
                    s.decision === 'ALLOW' ? 'bg-emerald-500/10 text-emerald-400' : 
                    s.decision === 'BLOCK' ? 'bg-rose-500/10 text-rose-500' : 
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {s.decision}
                  </div>
                  <div className="flex-1 italic text-slate-300 group-hover:text-white transition-colors truncate">"{s.intent}"</div>
                  <div className="text-[10px] font-mono text-slate-600">{new Date(s.timestamp).toLocaleTimeString()}</div>
                </motion.div>
              ))}
              {signals.length === 0 && (
                <div className="text-center py-20 glass rounded-3xl border border-white/5 opacity-50">
                   <p className="text-slate-500 uppercase tracking-widest font-black italic">No records in the current audit sequence.</p>
                </div>
              )}
            </div>
          </div>
        );
      case ViewState.POLICY_CENTER: return <PolicyCenter />;
      case ViewState.INTEGRATIONS: return <IntegrationsPage />;
      case ViewState.ABOUT_RESEARCH: return <ResearchPage />;
      default: return null;
    }
  };

  if (view === ViewState.LANDING) return <LandingPage onLaunch={() => setView(ViewState.LIVING_PLANE)} />;

  return (
    <div className="flex h-screen w-full bg-[#020205] overflow-hidden relative">
      <Sidebar currentView={view} onNavigate={setView} />
      
      <main className="flex-1 relative overflow-y-auto p-12">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 z-[200] p-12 bg-black/40 backdrop-blur-sm">
            <AnalysisView />
          </div>
        )}
        
        {showReveal && pendingSignal && (
          <RevealView decision={pendingSignal.decision} onComplete={handleRevealComplete} />
        )}

        {selectedSignal && <SignalOverlay signal={selectedSignal} onClose={() => setSelectedSignal(null)} />}
        
        {view === ViewState.GOVERNANCE_CONSOLE && (
          <GovernanceTerminal onCancel={() => setView(ViewState.LIVING_PLANE)} onSubmit={handleIngest} isProcessing={isProcessing} />
        )}
        
        {showPerspective && <PerspectiveOverlay onClose={() => setShowPerspective(false)} />}
      </AnimatePresence>

      <button 
        onClick={() => setShowPerspective(true)} 
        className="fixed bottom-10 right-10 w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-2xl z-50 hover:bg-white/10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
