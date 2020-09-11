const xlsx = require('xlsx');
const fs = require('fs');
const { processData } = require('./dataProcessor');

const includeSheets = [];
// const excludeSheets = [];

function main() {
  const results = {};

  const wb = xlsx.readFile('data/data.xlsx', { type: 'buffer' });

  wb.SheetNames.forEach((name) => {
    if (includeSheets.indexOf(name) === -1) return;
    // if (excludeSheets.indexOf(name) !== -1) return;

    const ws = wb.Sheets[name];
    results[name] = xlsx.utils.sheet_to_json(ws);
  });

  if (Object.keys(results).length === 1) {
    fs.writeFileSync('data/real.json', JSON.stringify(processData(Object.values(results)[0]), null, 2));
  } else {
    fs.writeFileSync('data/real.json', JSON.stringify(processData(results), null, 2));
  }
}

main();
