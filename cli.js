import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import readline from 'readline';
import ora from 'ora';
import { pense } from './neraune/pense.js';
import { execute } from './SDK/tools.js';
import { learn, recall } from './AprentisSage/know.js';
import { searchQuery } from './engine/search.js';

const results = await searchQuery("Node.js tutorial");
console.log(results);

const program = new Command();
program.name('drn').version('1.0.0');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// --- Shell interactif ---
async function dragonShell() {
    console.clear();
    console.log(gradient.passion(figlet.textSync('DRAGON', { font: 'Standard' })));
    console.log(chalk.hex('#FF4500')('Bienvenue. Je suis Dragon. Tapez `exit` pour quitter.\n'));

    while (true) {
        const task = await askQuestion(chalk.bold.red('🐉 > '));
        if (task.toLowerCase() === 'exit') break;
        if (task.startsWith('learn ')) {
            const [, cmd, ...rest] = task.split(' ');
            const action = rest.join(' ');
            learn(cmd, action);
            console.log(chalk.cyan(`✅ Appris : ${cmd} -> ${action}`));
            continue;
        }

        const spinner = ora('Le dragon réfléchit...').start();
        try {
            const action = await pense(task);
            if (action.startsWith('exec:')) {
                const result = execute(action.replace('exec:', ''));
                spinner.succeed('✅ Terminé.');
                console.log(chalk.magenta(result));
            } else {
                spinner.succeed('✅ Réponse générée.');
                console.log(chalk.green(action));
            }
        } catch (err) {
            spinner.fail(chalk.red(`Erreur : ${err.message}`));
        }
    }

    rl.close();
}

// Commande par défaut : shell interactif
program.action(dragonShell);

program.parseAsync(process.argv);
