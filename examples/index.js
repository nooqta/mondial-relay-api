// import mondialrelay;
const mondialRelay = require('../index'); // require('mondialrelay');


// 1. Search zip codes
const searchZipCodes = require('./data/searchZipCodes');
mondialRelay.searchZipCodes(searchZipCodes).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// 2. Search points relais
const searchPointsRelais = require('./data/searchPointsRelais');
mondialRelay.searchPointsRelais(searchPointsRelais).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// 3. Create a label
const label = require('./data/label');
mondialRelay.createLabel(label).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// 4. Get multiple labels
const labels = require('./data/labels');
mondialRelay.getLabels(labels).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});


// 5. Get stat message
const statMessage = require('./data/statMessage');
mondialRelay.getStatMessage(statMessage).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// 6. Track a parcel
const tracking = require('./data/tracking');
mondialRelay.getTracking(tracking).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});