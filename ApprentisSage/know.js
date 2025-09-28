let knowledge = [];

function learn(command, action) {
  knowledge.push({ input: command.toLowerCase(), output: action });
}

function recall() {
  const data = knowledge.map(k => ({ input: { [k.input]: 1 }, output: { create: 1 } }));
  return data;
}

module.exports = { learn, recall };
