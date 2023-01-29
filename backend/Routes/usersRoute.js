const express = require('express');
const { router } = require('../app');
const { registerUser, loginUser, logout, forgeotPassword, resetPassword, getUserDetail, updatePassword } = require('../controller/userContoller');
const { isAuthenticatedUser, authorizedRolls } = require('../middlewware/auth');
const routers = express.Router();


routers.route('/register').post(registerUser);

routers.route('/login').post(loginUser);
routers.route('/password/forgot').post(forgeotPassword);
routers.route('/password/reset/:token').put(resetPassword);
routers.route('/logout').get(logout);

routers.route('/me').get(isAuthenticatedUser,getUserDetail);

routers.route('/password/update').put(updatePassword);

module.exports = routers