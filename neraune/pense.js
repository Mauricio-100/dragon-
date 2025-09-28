const brain = require('brain.js');
const { recall } = require('../AprentisSage/know');

const net = new brain.NeuralNetwork();

function pense(input) {
  // Convertir le texte en input simplifié
  const trainedData = recall();
  net.train(trainedData); // on peut améliorer plus tard pour entraîner progressivement

  const result = net.run({ [input]: 1 });
  if (result.create) return "exec:echo 'Création fichier...'";
  return "Je ne sais pas encore quoi faire...";
}

module.exports = { pense };
