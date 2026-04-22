import { avatars } from './avatarData';
import { X, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

interface AvatarPickerProps {
  level: number;
  onSelect: (avatar: any) => void;
  onClose: () => void;
}

export default function AvatarPicker({ level, onSelect, onClose }: AvatarPickerProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)] max-w-lg w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black text-white p-1 border-[2px] border-black hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-3xl font-black uppercase italic italic mb-8 tracking-tighter">SELECT_AVATAR</h2>

        <div className="grid grid-cols-3 gap-6">
          {avatars.map(a => {
            const isLocked = level < a.unlock;
            return (
              <button 
                key={a.id} 
                disabled={isLocked}
                onClick={() => onSelect(a)}
                className={cn(
                  "relative group aspect-square border-[4px] border-black transition-all",
                  isLocked 
                    ? "bg-zinc-200 cursor-not-allowed opacity-50 grayscale" 
                    : "bg-tertiary-fixed hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                )}
              >
                <img src={a.src} className="w-full h-full object-cover" alt={`Avatar ${a.id}`} />
                
                {isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/20">
                    <Lock className="w-6 h-6 text-black" />
                    <span className="text-[10px] font-black uppercase bg-black text-white px-1">LVL {a.unlock}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-xs font-bold uppercase text-zinc-500 italic">Gain more XP to unlock new intelligence avatars!</p>
      </div>
    </div>
  );
}
