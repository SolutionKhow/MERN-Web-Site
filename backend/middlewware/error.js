const ErrorHandler1 = require("../utils/Errorhandler");



module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internaml Server Error';

   

    res.status(err.statusCode).json({
        sucess: false,
        error:err.message,

       
    });

}


