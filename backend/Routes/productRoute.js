const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProducts, getAllDetail,createProductReview, getProductAllReview, deleteProductReview } = require('../controller/productController');
const { createUser, getAllUsers } = require('../controller/userContoller');
const { isAuthenticatedUser } = require('../middlewware/auth');
const { authorizedRolls } = require('../middlewware/auth');


const routers = express.Router();


routers.route('/Product').get( getAllProducts);
routers.route('/admin/Products/new').post(isAuthenticatedUser, authorizedRolls('admin'), createProduct);
routers.route('/admin/Products/:id').put(isAuthenticatedUser, authorizedRolls('admin'), updateProduct).delete(isAuthenticatedUser, authorizedRolls('admin'), deleteProducts);

routers.route('/Products/:id').get(getAllDetail);
routers.route('/review').put(isAuthenticatedUser,createProductReview);
routers.route('/reviews').get(isAuthenticatedUser,getProductAllReview).delete(isAuthenticatedUser,deleteProductReview);


module.exports = routers;