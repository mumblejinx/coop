import { useCIS } from '../state/cisStore';
import { Cpu, Zap } from 'lucide-react';

export default function HeuristicsScreen() {
  const { xp, level } = useCIS();

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-black uppercase italic text-[#FF0040]">LOGIC SYSTEM</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex items-center gap-4">
          <div className="bg-zinc-100 p-3 border-[2px] border-black">
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <div className="text-3xl font-black">{xp}</div>
            <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Total Harmony XP</div>
          </div>
        </div>

        <div className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex items-center gap-4">
          <div className="bg-zinc-100 p-3 border-[2px] border-black">
            <Cpu className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-black">LVL {level}</div>
            <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">System Intelligence Level</div>
          </div>
        </div>
      </div>

      <div className="bg-black text-[#7eff51] p-6 border-[4px] border-black font-mono text-sm shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <p>&gt; ANALYZING_COOPERATIVE_DATA...</p>
        <p>&gt; HEURISTIC_SYNC: STABLE</p>
        <p>&gt; XP_OFFSET: {(xp % 1000)}/1000</p>
        <p className="animate-pulse">&gt; WAITING_FOR_SYNC_CYCLES...</p>
      </div>
    </div>
  );
}
