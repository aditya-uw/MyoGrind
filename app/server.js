//json
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/data', (req, res) => {
  const jsonFilePath = path.join('/Users/linyufen/Downloads', 'test_app.json'); // Use the correct path

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send(`Error reading data: ${err.message}`);
      return;
    }
    console.log('Data read from file:', data); // Log the raw data
    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON data:', jsonData); // Log the parsed data
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send(`Error parsing data: ${parseError.message}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// csv
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');

// const app = express();
// const port = 3000; // You can choose any available port

// // Middlewares
// app.use(cors()); // Use CORS to handle cross-origin requests
// app.use(bodyParser.json()); // Parse JSON bodies

// // Route to handle GET Request for CSV data
// app.get('/data', (req, res) => {
//   console.log("Received request for /data");
//   const results = [];
//   const csvFilePath = path.join('/Users/linyufen/Downloads', 'test_app.csv'); // Adjust the path to your CSV file

//   fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//       console.log("Sending response with data: ", results);
//       res.json(results);
//     });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


//original
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Knex = require('knex');

// const app = express();
// const port = 3000; // You can choose any available port

// // KNEX Configuration
// const knex = Knex({
//   client: 'pg',
//   connection: {
//     host: 'your-database-host',
//     user: 'your-database-user',
//     password: 'your-database-password',
//     database: 'your-database-name'
//   }
// });

// // Middlewares
// app.use(cors()); // Use CORS to handle cross-origin requests
// app.use(bodyParser.json()); // Parse JSON bodies

// // Route to handle GET Request
// app.get('/data', async (req, res) => {
//   try {
//     const results = await knex.select('*').from('your_table_name');
//     res.json(results);
//   } catch (error) {
//     console.error('Error fetching data', error);
//     res.status(500).send('Error fetching data');
//   }
// });

// // Route to handle POST Request
// app.post('/data', async (req, res) => {
//   try {
//     await knex('your_table_name').insert(req.body);
//     res.status(201).send('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data', error);
//     res.status(500).send('Error inserting data');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
