const csv = require('csv-parser');
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
  // let dataProcessed;

  fs.createReadStream('data/data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // // console.log('results :', results);
      fs.writeFileSync('data/real.json', JSON.stringify(processData(results), null, 2));
    });
}

main();
