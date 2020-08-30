const xlsx = require('xlsx');
const fs = require('fs');
const { processData } = require('./dataProcessor');

// Promise.delay = (t, val) => new Promise((resolve) => {
//   setTimeout(resolve.bind(null, val), t);
// });

// Promise.raceAll = (promises, timeoutTime, timeoutVal) => Promise.all(
//   promises.map((p) => Promise.race([p, Promise.delay(timeoutTime, timeoutVal)])),
// );

const includeSheets = ['Data All'];
// const excludeSheets = [];

function main() {
  const results = {};

  const wb = xlsx.readFile('data/Talent Factories Analysis.xlsx', { type: 'buffer' });

  wb.SheetNames.forEach((name) => {
    if (includeSheets.indexOf(name) === -1) return;
    // if (excludeSheets.indexOf(name) !== -1) return;

    const ws = wb.Sheets[name];
    results[name] = xlsx.utils.sheet_to_json(ws);
  });

  fs.writeFileSync('data/real.json', JSON.stringify(processData(results), null, 2));
}

main();
