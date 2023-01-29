const ErrorHandler = require("../utils/Errorhandler");
const jwt = require('jsonwebtoken');
const MyUser = require('../models/userModel');
const product = require('../models/productModels');



exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        let jwt_secret = process.env.JWT_SECRET;
        const { token } = req.cookies;




        if (!token) {
            return next(new ErrorHandler('Please login to access this resource'), 401);
        }


        const decodeData = jwt.verify(token, jwt_secret);

       
        req.user = await MyUser.findById(decodeData.id);


        next();



    } catch (error) {
        res.status(404).send("error.message");
    }
};
//------------------------------------------------------------------------------------------
//let roles=[22,21,25,26,28]


exports.authorizedRolls = (...roles) => {
    return (req, res, next) => {
        let val1 = req.user.Role;
       // console.log(val1);
        if (!roles.includes(val1)) {
            return next(
                new ErrorHandler(`Role: ${req.user.Role} is not allow to access this resource` , 403)
            );
        }


        next();
    };

}


//------------------------------------------------------------------------------------








