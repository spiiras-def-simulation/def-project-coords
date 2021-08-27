const fs = require('fs');
const config = require('config');

const getProjection = require('./projection');
const simplify = require('./simpify');

const args = process.argv.slice(2);
const command = args[0];

const projection = getProjection(config.projCenter);
try {
  switch (command) {
    case 'projLocal': {
      if (args[1]) {
        console.log(args[1]);
        const point = JSON.parse(args[1]);
        const result = projection.project(point);
        console.log(result);
      } else {
        const data = fs.readFileSync('input.json');
        const { points } = JSON.parse(data);
        const result = points.map((point) => projection.project(point));
        writeResult({ points: result });
        console.log('Данные преобразованы');
      }
      process.exit();
    }
    case 'projGlobal': {
      if (args[1]) {
        console.log(args[1]);
        const point = JSON.parse(args[1]);
        const result = projection.unproject(point);
        console.log(result);
      } else {
        const data = fs.readFileSync('input.json');
        const { points } = JSON.parse(data);
        const result = points.map((point) => projection.unproject(point));
        writeResult({ points: result });
        console.log('Данные преобразованы');
      }
      process.exit();
    }
    case 'simplify': {
      const data = fs.readFileSync('input.json').toString().split('\n');
      const { points } = JSON.parse(data);
      const k = args[1] || null;
      const result = simplify(points, k);
      writeResult({ points: result });
      console.log('Данные преобразованы');
      process.exit();
    }
    case 'parse': {
      const parsedPoints = fs.readFileSync('input.txt').toString().split('\n');
      const result = parsedPoints
        .filter((point) => point.length)
        .map((point) => {
          const [x, y] = JSON.parse(point);
          return [parseFloat(x), parseFloat(y)];
        });
      writeResult({ points: result });
      console.log('Данные преобразованы');
      process.exit();
    }
    default: {
      console.log('Неизвестная команда');
      process.exit();
    }
  }
} catch (error) {
  console.error('Произошла ошибка');
  console.error(error.message);
}

function writeResult(result) {
  fs.writeFileSync('output.json', JSON.stringify(result));
}
