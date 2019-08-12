const Bundler = require('parcel-bundler');
const express = require('express');
const path = require('path');
const axios = require('axios');
const throttle = require('express-throttle');
const app = express();
const PORT = process.env.PORT || 5000;


//app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/profile', throttle({ "burst": 1, "rate": "1/2s" }), function(req, res, next) {
    axios.get('https://hn.algolia.com/api/v1/search?query=redux')
        .then(function (data) {
            res.status(200).json({ data: data.data });
        });
});

/*
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
*/

const file = 'src/index.html'; // Pass an absolute path to the entrypoint here
const options = {
    logLevel: 4
}; // See options section of api docs, for the possibilities

// Initialize a new bundler using a file and options
const bundler = new Bundler(file, options);

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.use(bundler.middleware());

app.listen(PORT);