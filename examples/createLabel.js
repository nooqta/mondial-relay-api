// import mondialrelay;
const mondialRelay = require('../index'); // require('mondialrelay');


const label = require('./data/label');
mondialRelay.createLabel(label).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
