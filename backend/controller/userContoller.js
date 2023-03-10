

const MyUser = require('../models/userModel')

const ErrorHandler = require('../utils/Errorhandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


//Register User

exports.registerUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        const user = await MyUser.create({
            name, email, password, avatar: {
                public_id: "this is sample id",
                url: "profileURL"
            }
        });
        const token = user.getJWTToken();

        sendToken(user, 201, res);
        // res.status(201).json({
        //     status: "sucess",
        //     token,
        // })

    } catch (error) {
        //console.log(error.message);
        res.status(404).send(error.message);

    }
}
//Login User

exports.loginUser = async (req, res, next) => {



    try {

        const { email, password } = req.body;

        //Checkinhg if user Has Given Password and Email Both

        if (!email || !password) {
            return next(new ErrorHandler("please enter email and password", 401));
        }

        const user = await MyUser.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }


        const isPasswordMatched = await user.comparedPassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const token = user.getJWTToken();


        // res.status(200).json({
        //     status: "sucess",
        //     token,
        // })

        sendToken(user, 200, res);

    } catch (error) {

        res.status(404).send(error.message);

    }
}
//--------------------------logout-------------------------------


exports.logout = async (req, res, next) => {
    try {


        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            sucess: true,
            message: "Logged Out"
        });

    } catch (error) {
        res.status(404).send(error.message);
    }
}

//Forgot Password---

exports.forgeotPassword = async (req, res, next) => {


    const user = await MyUser.findOne({ email: req.body.email });
    // console.log(user);

    if (!user) {
        return next(new ErrorHandler("USer not Found", 404))
    }

    //Get Reset Password Token

    const resetToken = user.getResetPasswordToken();
    //console.log(resetToken)

    await user.save({ validateBeforeSave: false });



    const resetPasswordURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `your password reset token is :-\n\n ${resetPasswordURL} \n\n if you have not requested this email than please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: 'E commerce Password Recover',
            message,

        });

        res.status(200).json({
            success: true,
            message: `Email Send to ${user.email} sucessfully`
        });





    } catch (error) {

        user.resetPasswordTokken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))


    }


}


//Reset Password

exports.resetPassword = async (req, res, next) => {
    try {

        const resetPasswordTokken = crypto.createHash('sha256').update(req.params.token).digest("hex");

        const user = await MyUser.findOne({
            resetPasswordTokken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorHandler('Reset password is is invalid or has been expired', 404));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler('Pasword not Matched', 404));
        }

        user.password = req.body.password;
        user.resetPasswordTokken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user, 200, res);

    } catch (error) {
        res.status(404).send(error.message);
    }
}

//------------------------------------------------------------------------------------

//GET USER   DETAIL
exports.getUserDetail = async (req, res, next) => {
    try {
        const user = await MyUser.findById(req.user.id);


        res.status(200).json({
            sucess: true,
            user,
        });

    } catch (error) {
        res.status(404).send(error.message);
    }
}

//---------------------------------------------------------------------------
//----UPDATE USER PASSWORD-----

exports.updatePassword = async (req, res, next) => {
    try {

        const user = await MyUser.findById(req.user.id).select("+password");
        // console.log(user);
        const isPasswordMatched = await user.comparedPassword(req.body.oldPassword);
        //console.log(isPasswordMatched);
        if (!isPasswordMatched) {
            return next(new ErrorHandler('Old Password is in correct'), 400);
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler('Password does not matched'), 400);


        };
        user.password = req.body.newPassword;

        await user.save();
        sendToken(user, 200, res);



        // res.status(200).json({
        //     sucess: true,
        //     user,
        // });

    } catch (error) {
        res.status(404).send(error.message);

    }


}
//---------------------------------------------------------------------------------------------------------------

//Update User Profile

exports.updateProfile = async (req, res, next) => {
    try {

        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        const user = await MyUser.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            sucess: true
        })





    } catch (error) {
        res.status(404).send(error.message);

    }
}
//-------------------------------------------------------------------------------------------------------------
// GET  User By Admin watch

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await MyUser.find();
        res.status(200).json({
            Sucess: true,
            users,
        });

    } catch (error) {
        res.status(404).send(error.message);
    }

}
//------------------------------------------------------------------------------------------------------------------
// GET  User By Admin watch

exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await MyUser.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler(`User Does not exists with id :${req.params.id}`))
        }
        res.status(200).json({
            Sucess: true,
            user,
        });

    } catch (error) {
        res.status(404).send(error.message);
    }

}
//-----------------------------------------------------------------------------------------------------------
//Update USER ROle Admin-------------------------------

exports.updateUserRole = async (req, res, next) => {
    try {

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            Role: req.body.Role
        }

        const user = await MyUser.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            sucess: true
        })





    } catch (error) {
        res.status(404).send(error.message);

    }
}

//--------------------------------------------------------------------------------------------------------------
//Delete User ----ADmin-----------------------------------
exports.deleteUserProfile = async (req, res, next) => {
    try {


        const user = await MyUser.findById(req.params.id)

        if (!user) {
            return next(new ErrorHandler(`USer does not exist with ${req.params.id}`))
        }

        await user.remove();
        res.status(200).json({
            sucess: true,
            message:"User Deleted Sucessfully"
        })





    } catch (error) {
        res.status(404).send(error.message);

    }
}






