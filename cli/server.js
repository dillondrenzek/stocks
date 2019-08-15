const server = require('../dist/src');

module.exports = async function(input) {

    switch (input._[1]) {
        case 'start':
            await server();
            break;
        default:
            console.log('[stocks server] usage');
    }
}