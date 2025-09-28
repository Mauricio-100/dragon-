const readline = require('readline');
const chalk = require('chalk');
const { pense } = require('./neraune/pense');
const { execute } = require('./SDK/tools');
const { searchQuery } = require('./engine/search');
const { learn, recall } = require('./AprentisSage/know');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.green('🧠 Ledge> ')
});

console.log(chalk.blueBright("Bienvenue dans Ledge CLI - ton mini cerveau IA"));
console.log(chalk.yellow("Tape 'exit' pour quitter.\n"));

rl.prompt();

rl.on('line', async (line) => {
  const input = line.trim();

  if (input.toLowerCase() === 'exit') {
    console.log(chalk.red("Au revoir ! 👋"));
    return rl.close();
  }

  // Vérifie si l'utilisateur veut apprendre quelque chose de nouveau
  if (input.startsWith('learn ')) {
    const [, cmd, ...rest] = input.split(' ');
    const action = rest.join(' ');
    learn(cmd, action);
    console.log(chalk.cyan(`✅ Appris : ${cmd} -> ${action}`));
    rl.prompt();
    return;
  }

  // Raisonner avec le cerveau
  const action = await pense(input);

  if (action.startsWith("exec:")) {
    const cmd = action.replace("exec:", "");
    const result = execute(cmd);
    console.log(chalk.magenta(result));
  } else if (action.startsWith("search:")) {
    const query = action.replace("search:", "");
    const results = await searchQuery(query);
    console.log(chalk.yellow("Résultats de recherche :"));
    results.forEach((r, i) => console.log(`${i + 1}. ${r.Text || r.Result}`));
  } else {
    console.log(chalk.green(action));
  }

  rl.prompt();
}).on('close', () => {
  console.log(chalk.red("Fermeture du CLI."));
  process.exit(0);
});
