const parse = require('csv-parser');
const fs = require('fs');
const { processData } = require('./dataProcessor');

Promise.delay = (t, val) => new Promise((resolve) => {
  setTimeout(resolve.bind(null, val), t);
});

Promise.raceAll = (promises, timeoutTime, timeoutVal) => Promise.all(
  promises.map((p) => Promise.race([p, Promise.delay(timeoutTime, timeoutVal)])),
);

function main() {
  const results = [];
  // Change `data/sample.csv` to the path to your csv data
  fs.createReadStream('data/sample.csv')
    .pipe(parse())
    .on('data', (row) => results.push(row))
    .on('end', () => {
      // // console.log('results :', results);
      fs.writeFileSync('data/real.json', JSON.stringify(processData(results), null, 2));
    });
}

main();
