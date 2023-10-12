const fs = require('fs').promises;

async function writeJSONFile(filePath, data) {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData, 'utf8');
}

module.exports = writeJSONFile;