module.exports = {
    Logger: {
        logRequest: function(req, res, next) {
            console.info('[api]', req.method.toUpperCase(), req.url);
            next();
        }
    }
};