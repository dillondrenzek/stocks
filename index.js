const minimist = require('minimist');

const db = require('./db');

module.exports = () => {
    const args = minimist(process.argv.slice(2));

    console.log(args);

    // const connectionString = 'mongodb://localhost/test';

    // db(connectionString);
};