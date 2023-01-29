const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProducts, getAllDetail } = require('../controller/productController');
const { createUser, getAllUsers } = require('../controller/userContoller');
const { isAuthenticatedUser } = require('../middlewware/auth');
const { authorizedRolls } = require('../middlewware/auth');


const routers = express.Router();


routers.route('/Products').get(isAuthenticatedUser, getAllProducts);
routers.route('/admin/Products/new').post(isAuthenticatedUser, authorizedRolls('admin'), createProduct);
routers.route('/admin/Products/:id').put(isAuthenticatedUser, authorizedRolls('admin'), updateProduct).delete(isAuthenticatedUser, authorizedRolls('admin'), deleteProducts);

routers.route('/Products/:id').get(getAllDetail);

module.exports = routers;