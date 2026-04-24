import { useState } from 'react';
import { Section } from '../components/layout/Section';
import { useCIS } from '../state/cisStore';
import { analyzeReflection } from '../lib/ai';
import { Sparkles, Eye, Brain, Zap } from 'lucide-react';
import { useFirebase } from '../components/FirebaseProvider';

export default function MirrorScreen() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [output, setOutput] = useState<{
    reflection: string;
    question: string;
    theme: string;
  } | null>(null);
  const [xpGained, setXpGained] = useState<number | null>(null);

  const { user } = useFirebase();
  const {
    addReflectionToFirebase,
    updateXPInFirebase,
    getHeuristicModifiers
  } = useCIS();

  const handleReflect = async () => {
    if (!input.trim() || !user) return;

    setIsAnalyzing(true);
    setXpGained(null);

    try {
      const res = await analyzeReflection(input, getHeuristicModifiers());

      console.log("AI RESPONSE:", res);

      // 🔥 Show result immediately (fixes frozen UI)
      setOutput(res);
      setIsAnalyzing(false);

      // 🔁 Background work (doesn't block UI)
      await addReflectionToFirebase(user.uid, {
        input,
        reflection: res.reflection,
        question: res.question,
        theme: res.theme as any
      });

      await updateXPInFirebase(user.uid, 50);

      setXpGained(50);
      setInput('');

    } catch (e) {
      console.error("Mirror error:", e);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">

      {/* HEADER */}
      <Section title="FRIENDLY MIRROR">
        <div className="flex items-center gap-4 mb-4">
          <Sparkles className="text-tertiary-container w-10 h-10" />
          <p className="font-bold uppercase">
            How are you feeling right now?
          </p>
        </div>
      </Section>

      {/* INPUT */}
      <div className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full border-[4px] border-black p-4 font-bold min-h-[120px]"
          placeholder="Tell me how your day is going..."
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleReflect}
            disabled={isAnalyzing || !input.trim()}
            className="bg-[#e9003a] border-[4px] border-black px-12 py-4 text-white font-black uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            {isAnalyzing ? "THINKING..." : "SHARE"}
          </button>
        </div>
      </div>

      {/* OUTPUT (GAME TURN RESULT) */}
      {output && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">

          {/* AI REFLECTION */}
          <div className="border-[4px] border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-4 border-b-[4px] border-black pb-2">
              <Eye className="w-6 h-6" />
              <h3 className="text-sm font-black uppercase">
                THE MIRROR SAYS...
              </h3>
            </div>
            <p className="font-bold italic text-lg">
              {output.reflection}
            </p>
          </div>

          {/* THEME IMPACT */}
          <div className="border-[4px] border-black bg-yellow-400 p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5" />
              <span className="font-black uppercase text-sm">
                Theme Detected
              </span>
            </div>
            <div className="text-2xl font-black uppercase">
              {output.theme}
            </div>
          </div>

          {/* SYSTEM FEEDBACK */}
          <div className="border-[4px] border-black bg-black text-green-400 p-6 font-mono text-sm shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <p>&gt; MEMORY STORED</p>
            <p>&gt; TRUST NETWORK UPDATED</p>
            <p>&gt; PATTERN RECOGNITION ACTIVE</p>
          </div>

          {/* NEXT PROMPT (GAME LOOP) */}
          <div className="border-[4px] border-black bg-white p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase mb-2">
              NEXT MOVE
            </h3>
            <p className="font-bold">
              {output.question}
            </p>
          </div>

          {/* XP FEEDBACK */}
          {xpGained && (
            <div className="flex items-center gap-2 text-green-400 font-black animate-bounce">
              <Zap className="w-5 h-5" />
              +{xpGained} XP
            </div>
          )}

        </div>
      )}
    </div>
  );
}