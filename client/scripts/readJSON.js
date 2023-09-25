const fs = require('fs').promises;

async function readJSONFile(filePath) {
  const rawData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(rawData);
}

module.exports = readJSONFile;