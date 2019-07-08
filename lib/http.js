const mapHttpResults = (d, key = 'results') => {
    if (!d || !d[key]) return [];
    return d[key];
};

module.exports = {
    mapHttpResults
};