const fs = require('node:fs/promises');
const path = require('node:path');
const { makeSeedData } = require('./seed');

const filePath = path.join(__dirname, '..', 'data', 'db.json');

async function loadData() {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const seed = makeSeedData();
    await saveData(seed);
    return seed;
  }
}

async function saveData(data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

module.exports = { loadData, saveData, filePath };
