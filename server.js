const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the data from data.json
app.get('/api/data', (req, res) => {
    const dataPath = path.join(__dirname, 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Endpoint to add new data
app.post('/api/data', (req, res) => {
    const dataPath = path.join(__dirname, 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }

        const jsonData = JSON.parse(data);
        const newData = req.body;

        // Ensure newData has the required properties
        if (!newData.name || !newData.interest || !newData.location) {
            res.status(400).send('Invalid data format');
            return;
        }

        // Add an id to new data
        newData.id = jsonData.length ? jsonData[jsonData.length - 1].id + 1 : 1;

        // Add new data to the array
        jsonData.push(newData);

        // Write updated data back to the file
        fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Error writing data file');
                return;
            }
            res.status(201).send(newData);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
