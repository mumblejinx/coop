import { useState } from 'react';
import { useFirebase } from '../core/FirebaseProvider';
import { useCIS } from '../state/cisStore';
import { ShieldAlert, Terminal } from 'lucide-react';

export default function MirrorScreen() {
  const [text, setText] = useState('');
  const { user } = useFirebase();
  const { addXP } = useCIS();

  const handleReflect = () => {
    if (!text.trim() || !user) return;
    addXP(user.uid);
    setText('');
    alert("Reflection recorded! XP Gained +50.");
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FF0040] p-1 border-l-[4px] border-b-[4px] border-black font-black text-[8px] text-white uppercase">Active_Mirror</div>
         <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-[#FF0040]">THE_MIRROR</h1>
         <p className="font-bold text-sm uppercase leading-tight max-w-sm mb-6">Input your current headspace to sync with the collective intelligence system.</p>
         
         <div className="flex gap-2">
            <div className="bg-yellow-400 border-[2px] border-black px-2 py-1 font-black text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">SYNCING</div>
            <div className="bg-cyan-400 border-[2px] border-black px-2 py-1 font-black text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">ENCRYPTION: AES-256</div>
         </div>
      </div>

      <div className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            Entry Terminal
          </label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)} 
            className="w-full bg-zinc-50 border-[4px] border-black p-6 font-bold text-lg min-h-[220px] focus:outline-none focus:bg-white transition-all placeholder:text-zinc-300"
            placeholder="What's your core focus today?"
          />
        </div>

        <button 
          onClick={handleReflect}
          disabled={!text.trim()}
          className="w-full group relative bg-[#FF0040] text-white border-[4px] border-black py-6 font-black uppercase text-2xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-red-500 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
             SEND MIRROR DATA
          </span>
        </button>
      </div>

      <div className="bg-yellow-400 border-[4px] border-black p-4 flex gap-4 items-center shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
         <ShieldAlert className="w-8 h-8 shrink-0" />
         <p className="text-[10px] font-black uppercase italic leading-none">Your thoughts remain private and are only used to calculate heuristic team stability coefficients.</p>
      </div>
    </div>
  );
}
