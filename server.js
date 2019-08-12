const express = require('express');
const path = require('path');
const axios = require('axios');
const throttle = require('express-throttle');
const app = express();
const PORT = process.env.PORT || 5000;

const API =  require('./src/server/api');

// 3-party FortniteTracker has a limit of 1 request every 2 seconds
// Hence, we need to throttle in order to not get banned :)
const throttleOptions = {
    key: () => 'fst',
    burst: 1,
    rate: "1/3s"
}

// Secret TRN-Api-Key must be provided as ENV variable
const ftOptions = {
    "headers": {
        'TRN-Api-Key': process.env.FT_KEY
    }
};

app.get('/api/profile/:username', throttle(throttleOptions), function(req, res, next) {
    const username = req.params.username;
    const path = API.profile(username);

    axios.get(path, ftOptions)
        .then((response) => {
            // Throw 404 if player not found
            if (response.data.error === 'Player Not Found') {
                res.status(404).json({
                    errorType: 'PLAYER_NOT_FOUND'
                });
                return;
            }

            res.status(200).json({ profile: response.data });
        })
        .catch((err) => {
            console.log("[ERROR: /api/profile", err);
            res.status(500).json({ message: 'Something went wrong when fetching profile' })
        })
});

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
if (process.env.NODE_ENV !== 'production') {
    const Bundler = require('parcel-bundler');
    const file = 'src/client/index.html'; // Pass an absolute path to the entrypoint here
    const options = {
        logLevel: 4
    }; // See options section of api docs, for the possibilities
    
    // Initialize a new bundler using a file and options
    const bundler = new Bundler(file, options);    
    app.use(bundler.middleware());
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT);