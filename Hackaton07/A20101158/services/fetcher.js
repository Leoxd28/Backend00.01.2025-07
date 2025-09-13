const fetch = require('node-fetch');

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching ${url}`);
  return await response.json();
}

module.exports = fetchData;
