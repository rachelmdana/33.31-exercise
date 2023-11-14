const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/mean', (req, res) => {
  const { nums } = req.query;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  res.json({ operation: 'mean', value: mean });
});

app.get('/median', (req, res) => {
  const { nums } = req.query;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  numbers.sort((a, b) => a - b);
  const middle = Math.floor(numbers.length / 2);
  const median =
    numbers.length % 2 === 0
      ? (numbers[middle - 1] + numbers[middle]) / 2
      : numbers[middle];

  res.json({ operation: 'median', value: median });
});

app.get('/mode', (req, res) => {
  const { nums } = req.query;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number provided' });
  }

  const numCount = {};
  numbers.forEach((num) => {
    numCount[num] = (numCount[num] || 0) + 1;
  });

  let mode = [];
  let maxCount = 0;
  for (const num in numCount) {
    if (numCount[num] > maxCount) {
      mode = [num];
      maxCount = numCount[num];
    } else if (numCount[num] === maxCount) {
      mode.push(num);
    }
  }

  res.json({ operation: 'mode', value: mode });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
