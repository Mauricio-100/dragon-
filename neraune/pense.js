import brain from "brain.js";
import { recall } from "../AprentisSage/know.js";

const net = new brain.NeuralNetwork();

function pense(input) {
  // Récupère les données apprises
  const trainedData = recall();

  // Entraînement du réseau
  net.train(trainedData);

  // Test avec un input simplifié
  const result = net.run({ [input]: 1 });

  if (result.create) {
    return "exec:echo 'Création fichier...'";
  }
  return "Je ne sais pas encore quoi faire...";
}

export { pense };
