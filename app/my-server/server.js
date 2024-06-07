const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.get('/data', (req, res) => {
  const results = [];
  const filePath = path.join('/Users/linyufen/Downloads', '20240531_033400.csv');
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
