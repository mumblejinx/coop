export type Mode = 'conversation' | 'story';

interface AIResponse {
  reflection: string;
  question: string;
  theme: string;
}

// prevent repeated questions
let lastQuestion = "";

function getVariedQuestion(options: string[]) {
  const filtered = options.filter(q => q !== lastQuestion);
  const choice = filtered[Math.floor(Math.random() * filtered.length)];
  lastQuestion = choice;
  return choice;
}

// simple story state
let storyState = {
  started: false
};

export async function analyzeReflection(
  input: string,
  modifiers: any,
  mode: Mode
): Promise<AIResponse> {

  const lower = input.toLowerCase();

  let reflection = '';
  let question = '';
  let theme = 'general';

  // =========================
  // 🧠 CONVERSATION MODE
  // =========================
  if (mode === 'conversation') {

    const responses = [
      {
        check: ['good', 'nice', 'happy'],
        reflection: `That sounds like a genuinely good moment.`,
        questions: [
          "What’s been contributing to that?",
          "What part of your day made it feel that way?",
          "Do you want more days like this?"
        ],
        theme: 'positivity'
      },
      {
        check: ['stress', 'anxious', 'worried'],
        reflection: `It sounds like something is weighing on you.`,
        questions: [
          "What feels most difficult right now?",
          "What’s causing the most pressure?",
          "What would help even a little?"
        ],
        theme: 'stress'
      },
      {
        check: ['bathroom'],
        reflection: `You're balancing something immediate with curiosity.`,
        questions: [
          "What made you stay instead of stepping away?",
          "What feels more important right now?"
        ],
        theme: 'conflict'
      }
    ];

    const match = responses.find(r =>
      r.check.some(word => lower.includes(word))
    );

    if (match) {
      reflection = match.reflection;
      question = getVariedQuestion(match.questions);
      theme = match.theme;
    } else {
      reflection = `You're noticing something about your experience right now.`;
      question = getVariedQuestion([
        "What stands out most to you?",
        "What feels important right now?",
        "What are you paying attention to?"
      ]);
      theme = 'reflection';
    }
  }

  // =========================
  // 🎮 STORY MODE
  // =========================
  if (mode === 'story') {

    if (!storyState.started) {
      storyState.started = true;

      reflection = `You wake up in a dimly lit room. A metal door stands to one side. Strange markings cover the wall. A low hum fills the air.`;

      question = "Do you look around, inspect the markings, or go to the door?";
      theme = 'mystery';
    }

    else if (lower.includes('look')) {
      reflection = `You scan the room. The light flickers overhead. The markings look intentional — not random.`;

      question = "Do you inspect the markings or approach the door?";
      theme = 'observation';
    }

    else if (lower.includes('mark')) {
      reflection = `The markings form a pattern. It feels like a warning — or instructions.`;

      question = "Do you try to decode it or ignore it?";
      theme = 'mystery';
    }

    else if (lower.includes('door')) {
      reflection = `You move toward the door. The humming grows louder, reacting to you.`;

      question = "Do you open it or step back?";
      theme = 'tension';
    }

    else if (lower.includes('who') || lower.includes('call')) {
      reflection = `Your voice echoes. Silence… then something shifts behind the door.`;

      question = "Do you move toward the sound or stay still?";
      theme = 'tension';
    }

    else if (lower.includes('what') || lower.includes('where')) {
      reflection = `You try to understand your surroundings, but something feels intentionally unclear.`;

      question = "What do you focus on next?";
      theme = 'mystery';
    }

    else {
      reflection = `You hesitate. The room remains still, but the hum continues.`;

      question = "Do you act or wait?";
      theme = 'unknown';
    }
  }

  await new Promise(res => setTimeout(res, 500));

  return { reflection, question, theme };
}