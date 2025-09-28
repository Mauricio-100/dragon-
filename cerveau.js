const { pense } = require('./neraune/pense');
const { execute } = require('./SDK/tools');
const { searchQuery } = require('./engine/search');
const { learn, recall } = require('./AprentisSage/know');

async function main() {
  console.log("🤖 Ledge mini cerveau démarré...");

  // Exemple d’apprentissage
  learn("créer readme", "exec:echo '# Mon projet' > README.md");

  // Raisonner et agir
  const input = "créer readme";
  const action = await pense(input);

  if (action.startsWith("exec:")) {
    const result = execute(action.replace("exec:", ""));
    console.log(result);
  } else if (action.startsWith("search:")) {
    const query = action.replace("search:", "");
    const result = await searchQuery(query);
    console.log(result);
  } else {
    console.log("Action:", action);
  }
}

main();
