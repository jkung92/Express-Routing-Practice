const express = require('express');
const app = express();
const fs = require('fs');

// Route should calc mean(avg)
app.get('/mean', function(req, res, next) {
  let nums = req.query.nums.split(',');
  let total = 0;
  for (let num of nums) {
    total += parseInt(num);
  }
  let mean = total / nums.length;
  let resultString = `The mean of ${req.query.nums} is ${mean}.\n`;
  sendToTextFile(resultString);
  return res.send(resultString);
});

// Route should get the median(midpoint))
app.get('/median', function(req, res, next) {
  let nums = req.query.nums
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);
  let median;
  if (nums.length % 2 === 0) {
    if (nums.length === 2) {
      median = (Number(nums[0]) + Number(nums[1])) / 2;
      let resultString = `The median of ${req.query.nums} is ${median}.\n`;
      sendToTextFile(resultString);
      return res.send(resultString);
    }
    let midIdx = nums.length / 2;
    let lowerMid = Math.floor(midIdx);
    let higherMid = lowerMid + 1;
    median = (Number(nums[lowerMid]) + Number(nums[higherMid])) / 2;
  } else {
    let midIdx = Math.floor(nums.length / 2);
    median = nums[midIdx];
  }
  let resultString = `The median of ${req.query.nums} is ${median}.\n`;
  sendToTextFile(resultString);
  return res.send(resultString);
});

// Route should get the mode(most frequent)

// Route for /results that reads results.txt
app.get('/results', function(req, res, next) {
  let results;
  try {
    results = fs.readFileSync('results.txt', 'utf8');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  return res.send(results);
});

// Helper function to send results to result.txt
function sendToTextFile(data) {
  fs.appendFile('results.txt', data, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Successfully wrote to file');
  });
}

// app.listen should be at the bottom of the file
app.listen(3000, () => console.log('App on port 3000'));
