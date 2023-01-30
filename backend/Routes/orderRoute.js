const express=require('express');
const { newOrder, getOrder, getSingleOrder, myOrders } = require('../controller/orderController');
const router=express.Router();

const{isAuthenticatedUser,authorizedRolls }=require('../middlewware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/me').get(isAuthenticatedUser,myOrders);
router.route('/order/:id').get(isAuthenticatedUser,authorizedRolls("admin"),getSingleOrder);




module.exports=router;