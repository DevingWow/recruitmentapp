const logger = require('../util/Logger');

const errorLogger = async (err, req, res, next) => {
    logger.log("ERROR-LOG source: " +
        req.method + " " + req.url + " " + err.stack);

    next(err);
}

const requestLogger = (req, res, next) => {
    logger.log(`INCOMING REQUEST: \nMethod: ${req.method}\nURL: ${req.url}\nHeaders: ${JSON.stringify(req.headers)}\nBody: ${JSON.stringify(req.body)}`);
    next();    
}



module.exports = {errorLogger, requestLogger};