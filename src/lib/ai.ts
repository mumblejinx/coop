export async function analyzeReflection(input: string, modifiers: any, mode: 'conversation' | 'story') {

  const prompt = `
You are an intelligent AI system operating in ${mode} mode.

USER INPUT:
"${input}"

INSTRUCTIONS:

If mode = conversation:
- Reflect the user's thoughts emotionally and intelligently
- Keep it concise (1–2 sentences)
- Ask a NATURAL follow-up question
- Vary your phrasing
- DO NOT repeat generic questions

If mode = story:
- Continue a narrative based on the user's input
- Add detail, tension, or curiosity
- Make the user feel inside a world
- End with a question about what they do next

Avoid repetition.

Return ONLY valid JSON:

{
  "reflection": "...",
  "question": "...",
  "theme": "growth | fear | connection | identity | purpose | curiosity | conflict"
}
`;

  const response = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  return data;
}