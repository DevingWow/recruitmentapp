const Exception = require("../util/Exception")


const errorHandler = (error, req, res, next) => {
    if (error instanceof Exception){
        res.status(error.errResponseCode).json(error.clientMessage);
    }
    else{
        res.status(500).json("Internal server error");
    }
    next(res);
}

module.exports = errorHandler;