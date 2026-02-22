
import React, { useState, useEffect, useRef } from 'react';
import { AppStep, TerminalEntry, WindowState } from './types';
import MatrixBackground from './components/MatrixBackground';
import PredictorBox from './components/PredictorBox';
import WindowFrame from './components/WindowFrame';

const REG_LINK = "https://hgnice.cc/#/register?invitationCode=76572765676";

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.JOIN_CHANNELS);
  const [keyInput, setKeyInput] = useState('');
  const [loginStatus, setLoginStatus] = useState<{msg: string, type: 'error' | 'success' | 'none'}>({msg: '', type: 'none'});
  
  // Windows Management - State for windows in the Desktop Environment
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'predictor', title: 'Neural Predictor Core', isOpen: false, zIndex: 10, icon: '⚛️' },
    { id: 'stats', title: 'Network Statistics', isOpen: false, zIndex: 11, icon: '📊' },
    { id: 'terminal', title: 'System Security Console', isOpen: false, zIndex: 12, icon: '⌨️' }
  ]);

  const [terminalLogs, setTerminalLogs] = useState<TerminalEntry[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Toggle window visibility and manage focus (z-index)
  const toggleWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const newIsOpen = !w.isOpen;
        // When opening, bring to the highest z-index
        const maxZ = prev.length > 0 ? Math.max(...prev.map(win => win.zIndex)) : 10;
        return { ...w, isOpen: newIsOpen, zIndex: newIsOpen ? maxZ + 1 : w.zIndex };
      }
      return w;
    }));
  };

  // Bring a clicked window to the front
  const focusWindow = (id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const addLog = (text: string, type: TerminalEntry['type'] = 'info') => {
    const newLog: TerminalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setTerminalLogs(prev => [...prev, newLog].slice(-50));
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  /**
   * Automatic Boot Sequence Logic:
   * When the user enters the DASHBOARD step, we trigger a staggered
   * opening of all core windows to create a high-tech terminal feel.
   */
  useEffect(() => {
    if (step === AppStep.DASHBOARD) {
      // Preliminary boot logs
      addLog('HGNICE KERNEL: v4.0.18 STABLE', 'info');
      addLog('SECURE_NODE_ID: 76572765676 CONNECTED', 'success');
      addLog('INITIALIZING DESKTOP SUBSYSTEMS...', 'info');
      
      const bootSequence = [
        { id: 'stats', delay: 300, log: 'DIAGNOSTIC CLUSTER MOUNTED' },
        { id: 'predictor', delay: 800, log: 'NEURAL PREDICTOR ONLINE' },
        { id: 'terminal', delay: 1300, log: 'SECURITY TERMINAL READY' }
      ];

      bootSequence.forEach((item) => {
        setTimeout(() => {
          setWindows(prev => prev.map(w => 
            w.id === item.id ? { ...w, isOpen: true } : w
          ));
          addLog(item.log, 'success');
        }, item.delay);
      });
    }
  }, [step]);

  const handleJoinDone = () => {
    setStep(AppStep.LOGIN);
    addLog('Verification clear. Establishing secure handshake...', 'info');
  };

  const handleLogin = () => {
    if (loginStatus.type !== 'none') return;
    
    // Core login logic
    if (keyInput.toLowerCase() === 'ontor') {
      setLoginStatus({msg: 'ACCESS GRANTED. BOOTING...', type: 'success'});
      addLog('Neural Key Verified. Decrypting environment...', 'success');
      setTimeout(() => setStep(AppStep.DASHBOARD), 1500);
    } else {
      setLoginStatus({msg: 'AUTH_FAILURE: INVALID RSA TOKEN.', type: 'error'});
      addLog('Unauthorized access attempt detected.', 'danger');
      setTimeout(() => setLoginStatus({msg: '', type: 'none'}), 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <MatrixBackground />

      {/* Step 1: Channel Verification Screen */}
      {step === AppStep.JOIN_CHANNELS && (
        <div className="w-full max-w-lg bg-black/95 border border-cyan-500/50 rounded-2xl p-10 shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <span className="text-5xl animate-pulse">🛰️</span>
          </div>
          <h2 className="text-4xl font-black text-center mb-8 glitch text-white uppercase tracking-tighter">HGNICE v4.0 PRO</h2>
          
          <div className="space-y-4 mb-8">
            <button onClick={() => window.open('https://t.me/mrrax1', '_blank')} className="w-full py-4 bg-cyan-950/30 border border-cyan-500/50 rounded-xl font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2">
              <span>📡</span> Join Telegram Group
            </button>
            <button onClick={() => window.open(REG_LINK, '_blank')} className="w-full py-4 bg-black border border-amber-500/50 text-amber-500 rounded-xl font-bold hover:bg-amber-500 hover:text-black transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2">
              <span>💎</span> Register Account
            </button>
          </div>
          
          <button onClick={handleJoinDone} className="w-full py-6 border-2 border-cyan-500 rounded-xl font-black text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] uppercase text-lg tracking-tighter">Enter Environment</button>
        </div>
      )}

      {/* Step 2: Neural Key Login Screen */}
      {step === AppStep.LOGIN && (
        <div className="w-full max-w-sm bg-black/95 border border-cyan-500/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-2xl animate-in slide-in-from-bottom duration-300">
          <div className="text-center mb-8">
            <span className="text-3xl">🔑</span>
            <h2 className="text-xl font-black text-cyan-400 uppercase tracking-[0.2em] mt-2">Neural Key</h2>
          </div>
          
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="TOKEN_ID"
            className="w-full bg-black border border-cyan-500/50 rounded-xl py-5 px-4 text-cyan-400 text-center font-mono text-3xl tracking-[0.4em] mb-6 focus:outline-none focus:border-cyan-400 transition-all shadow-inner"
          />
          
          {loginStatus.msg && (
            <div className={`mb-6 text-[10px] text-center font-mono font-bold uppercase p-2 border ${loginStatus.type === 'error' ? 'text-red-500 border-red-500/30 bg-red-500/5' : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5'}`}>
              {loginStatus.msg}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleLogin} className="py-4 bg-cyan-500 text-black font-black rounded-xl uppercase text-xs hover:shadow-[0_0_20px_#22d3ee] transition-all">Verify</button>
            <button onClick={() => window.open(REG_LINK, '_blank')} className="py-4 border border-amber-500/50 text-amber-500 font-bold rounded-xl uppercase text-xs hover:bg-amber-500/10 transition-all">Sign Up</button>
          </div>
        </div>
      )}

      {/* Step 3: Main Desktop Dashboard */}
      {step === AppStep.DASHBOARD && (
        <div className="fixed inset-0 w-full h-full pointer-events-none">
          {/* Main Workspace Layer */}
          <div className="relative w-full h-full pointer-events-auto">
            
            {/* Neural Core Window - Positioned center-top */}
            {windows.find(w => w.id === 'predictor')?.isOpen && (
              <WindowFrame 
                title="Neural Core Interface" 
                icon="⚛️"
                zIndex={windows.find(w => w.id === 'predictor')!.zIndex}
                onClose={() => toggleWindow('predictor')}
                onFocus={() => focusWindow('predictor')}
                initialPos={{ x: window.innerWidth / 2 - 160, y: 100 }}
                width="320px"
              >
                <PredictorBox />
              </WindowFrame>
            )}

            {/* Network Statistics Window - Positioned top-left */}
            {windows.find(w => w.id === 'stats')?.isOpen && (
              <WindowFrame 
                title="Cluster Diagnostics" 
                icon="📊"
                zIndex={windows.find(w => w.id === 'stats')!.zIndex}
                onClose={() => toggleWindow('stats')}
                onFocus={() => focusWindow('stats')}
                initialPos={{ x: 30, y: 30 }}
                width="280px"
              >
                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                    <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center text-xl bg-cyan-500/10">📈</div>
                    <div>
                      <div className="text-[10px] font-black text-cyan-400 uppercase">Packet Health</div>
                      <div className="text-[9px] text-white/40 font-mono">NODE_76572765676</div>
                    </div>
                  </div>

                  {[
                    { label: 'Neural Latency', val: '8.2ms', pct: 12, color: 'bg-cyan-400' },
                    { label: 'Signal Integrity', val: '99.9%', pct: 99, color: 'bg-[#00ff00]' },
                    { label: 'Prediction Entropy', val: '0.002', pct: 4, color: 'bg-amber-400' }
                  ].map((s, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-white/60 uppercase">
                        <span>{s.label}</span>
                        <span className="font-bold text-white">{s.val}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full ${s.color} shadow-[0_0_10px_currentColor]`} style={{ width: `${s.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/5 flex flex-col items-center gap-2">
                    <div className="text-[8px] text-white/30 font-mono uppercase italic text-center">Neural data feed is encrypted and synchronized across 12 global nodes.</div>
                    <button onClick={() => window.open(REG_LINK, '_blank')} className="w-full py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[9px] font-black rounded uppercase hover:bg-amber-500 hover:text-black transition-all">Upgrade Node Privileges</button>
                  </div>
                </div>
              </WindowFrame>
            )}

            {/* Security Terminal Window - Positioned bottom-right */}
            {windows.find(w => w.id === 'terminal')?.isOpen && (
              <WindowFrame 
                title="System Security Console" 
                icon="⌨️"
                zIndex={windows.find(w => w.id === 'terminal')!.zIndex}
                onClose={() => toggleWindow('terminal')}
                onFocus={() => focusWindow('terminal')}
                initialPos={{ x: window.innerWidth - 380, y: window.innerHeight - 380 }}
                width="350px"
              >
                <div className="h-56 bg-black/60 p-4 font-mono text-[10px] flex flex-col shadow-inner">
                  <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar pr-2">
                    {terminalLogs.map(log => (
                      <div key={log.id} className="flex gap-3 hover:bg-white/5 px-1 rounded transition-colors group">
                        <span className="text-white/20 font-black">[{log.timestamp}]</span>
                        <span className={
                          log.type === 'success' ? 'text-cyan-400' : 
                          log.type === 'danger' ? 'text-red-500 font-bold' : 
                          log.type === 'warn' ? 'text-amber-500' : 'text-[#00ff00]'
                        }>
                          {log.type === 'danger' ? '[FATAL] ' : log.type === 'warn' ? '[WARN] ' : '> '}{log.text}
                        </span>
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                </div>
              </WindowFrame>
            )}
          </div>

          {/* Desktop Taskbar (Hacker Style) */}
          <div className="fixed bottom-0 left-0 w-full h-14 bg-black/90 border-t border-cyan-500/30 backdrop-blur-3xl flex items-center px-6 gap-3 pointer-events-auto z-[9999] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            {/* Register Shortcut */}
            <div 
              className="flex items-center gap-2 border-r border-cyan-500/20 pr-5 mr-3 group cursor-pointer hover:bg-amber-500/10 px-3 py-1.5 rounded-lg transition-all" 
              onClick={() => window.open(REG_LINK, '_blank')}
            >
               <span className="text-2xl group-hover:scale-125 transition-transform duration-300">💎</span>
               <div className="flex flex-col">
                  <span className="text-[11px] font-black text-amber-500 uppercase leading-none tracking-tighter">Register</span>
                  <span className="text-[8px] text-amber-500/50 font-mono tracking-widest">SECURE_NODE</span>
               </div>
            </div>
            
            {/* Window Task Icons */}
            {windows.map(win => (
              <button
                key={win.id}
                onClick={() => toggleWindow(win.id)}
                className={`h-10 px-4 rounded-xl flex items-center gap-3 border transition-all duration-300 ${win.isOpen ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-transparent border-white/5 text-white/30 hover:bg-white/5'}`}
              >
                <span className={`text-lg ${win.isOpen ? 'animate-pulse' : ''}`}>{win.icon}</span>
                <span className="text-[10px] font-black uppercase hidden md:block tracking-widest">{win.title}</span>
              </button>
            ))}

            {/* Desktop Clock & System Meta */}
            <div className="ml-auto flex items-center gap-6 border-l border-cyan-500/20 pl-6">
              <div className="flex flex-col items-end">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-ping"></span>
                    <span className="text-[10px] text-cyan-400 font-black font-mono tracking-widest">76572765676</span>
                 </div>
                 <span className="text-[10px] text-white/40 font-mono font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-cyan-500/20 flex items-center justify-center bg-black overflow-hidden group">
                 <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=76572765676`} alt="User" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.4); border-radius: 10px; border: 1px solid rgba(0,0,0,0.5); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.7); }
      `}</style>
    </div>
  );
};

export default App;