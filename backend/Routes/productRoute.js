const express = require('express');
const { getAllProducts, createProduct, updateProduct ,deleteProducts,getAllDetail} = require('../controller/productController');
const {createUser, getAllUsers}=require('../controller/userContoller');
const { isAuthenticatedUser } = require('../middlewware/auth');
const {authorizedRolls}=require('../middlewware/auth');


const routers = express.Router();


routers.route('/Products').get(isAuthenticatedUser,getAllProducts);
routers.route('/Products/new').
                post(
                    isAuthenticatedUser,
                    authorizedRolls('admin'),
                    createProduct);
routers.route('/Products/:id').
                put(
                    isAuthenticatedUser,authorizedRolls('admin'),
                    updateProduct).delete(isAuthenticatedUser,authorizedRolls('admin'),
                    deleteProducts).
                    get(getAllDetail);


module.exports =routers ;