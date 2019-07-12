const minimist = require('minimist');
const db = require('./db');

module.exports = async function() {
    const input = minimist(process.argv.slice(2));
    const args = input._;

    switch (args[0]) {
        case 'db':
            await db(input);
            break;
        default:
            console.log('No args provided.');
    }

    // console.log('Exiting');
    process.exit();
}