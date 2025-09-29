let knowledge = [];

function learn(command, action) {
  knowledge.push({ input: command.toLowerCase(), output: action });
}

function recall() {
  // On renvoie des données formatées pour brain.js
  const data = knowledge.map(k => ({
    input: { [k.input]: 1 },
    output: { create: 1 }
  }));
  return data;
}

export { learn, recall };
