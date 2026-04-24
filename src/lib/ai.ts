export async function analyzeReflection(
  input: string,
  modifiers: any,
  mode: 'conversation' | 'story'
) {
  const themes = ['growth', 'fear', 'connection', 'identity', 'purpose', 'curiosity', 'conflict'];
  const theme = themes[Math.floor(Math.random() * themes.length)];

  let reflection = '';
  let question = '';

  if (mode === 'conversation') {
    const responses = [
      `It sounds like you're really thinking through "${input}".`,
      `I hear something meaningful in what you said about "${input}".`,
      `There's something important underneath "${input}".`
    ];

    const questions = [
      'What part of that stands out to you most?',
      'Why does that feel important right now?',
      'What do you think is underneath that feeling?',
      'How would you explain this to someone you trust?',
      'What would you want to change about this situation?'
    ];

    reflection = responses[Math.floor(Math.random() * responses.length)];
    question = questions[Math.floor(Math.random() * questions.length)];
  }

  if (mode === 'story') {
    const scenarios = [
      `You step forward. The world shifts slightly as you say: "${input}". Something reacts.`,
      `As you act, "${input}", the environment changes around you.`,
      `Your choice — "${input}" — echoes. Something unexpected begins to unfold.`
    ];

    const prompts = [
      'What do you do next?',
      'Do you continue, or change direction?',
      'Something is watching—how do you respond?',
      'Do you trust this situation?',
      'What’s your next move?'
    ];

    reflection = scenarios[Math.floor(Math.random() * scenarios.length)];
    question = prompts[Math.floor(Math.random() * prompts.length)];
  }

  await new Promise(res => setTimeout(res, 700));

  return {
    reflection,
    question,
    theme
  };
}