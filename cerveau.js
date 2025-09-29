import { pense } from "./neraune/pense.js";
import { execute } from "./SDK/tools.js";
import { searchQuery } from "./engine/search.js";
import { learn, recall } from "./AprentisSage/know.js";

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
