const express = require('express');
const { router } = require('../app');
const { registerUser, loginUser, logout, forgeotPassword, resetPassword, getUserDetail, updatePassword, updateProfile,getAllUser,getSingleUser,  updateUserRole, deleteUserProfile } = require('../controller/userContoller');
const { isAuthenticatedUser, authorizedRolls } = require('../middlewware/auth');
const routers = express.Router();


routers.route('/register').post(registerUser);

routers.route('/login').post(loginUser);
routers.route('/password/forgot').post(forgeotPassword);
routers.route('/password/reset/:token').put(resetPassword);
routers.route('/logout').get(logout);

routers.route('/me').get(isAuthenticatedUser,getUserDetail);

routers.route('/password/update').put(isAuthenticatedUser,updatePassword);
routers.route('/me/update').put(isAuthenticatedUser,updateProfile);

routers.route("/admin/users").get(isAuthenticatedUser,authorizedRolls('admin'),getAllUser);
routers.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRolls('admin'),getSingleUser).put(isAuthenticatedUser,authorizedRolls('admin'),updateUserRole).delete(isAuthenticatedUser,authorizedRolls('admin'),deleteUserProfile);


module.exports = routers