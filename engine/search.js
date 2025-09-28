const fetch = require('node-fetch');

// Exemple moteur gratuit : DuckDuckGo API
async function searchQuery(query) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  return data.RelatedTopics.slice(0,3); // renvoie 3 premiers résultats
}

module.exports = { searchQuery };
