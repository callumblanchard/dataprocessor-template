const xlsx = require('xlsx');
const fs = require('fs');
const { processData } = require('./dataProcessor');

// Can specify a list of sheets to include/exclude in the data

const excludeSheets = [];
// const includeSheets = [];

function main() {
  const results = {};
  // Change `data/sample.xlsx` to the path to your data spreadsheet
  const wb = xlsx.readFile('data/sample.xlsx', { type: 'buffer' });

  wb.SheetNames.forEach((name) => {
    if (excludeSheets.indexOf(name) !== -1) return;
    // if (includeSheets.indexOf(name) === -1) return;

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
