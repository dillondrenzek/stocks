const db = require('./cli/db');
const server = require('./cli/server');

import minimist from 'minimist';
import db from './cli/db';
import server from './cli/server';

module.exports = async function() {
    const input = minimist(process.argv.slice(2));
    const args = input._;

    switch (args[0]) {
        case 'db':
            await db(input);
            break;
        case 'server':
            await server(input);
            break;
        default:
            console.log('[stocks] usage');
    }

    // process.exit();
};
