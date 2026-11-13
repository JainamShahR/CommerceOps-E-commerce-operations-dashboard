const fs = require('node:fs/promises');
const { filePath } = require('../src/db');

fs.unlink(filePath)
  .then(() => console.log('Demo data removed. Restart the API to regenerate it.'))
  .catch(err => {
    if (err.code === 'ENOENT') console.log('Demo data is already reset.');
    else { console.error(err); process.exitCode = 1; }
  });
