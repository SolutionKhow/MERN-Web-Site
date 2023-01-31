const express=require('express');
const { newOrder, getSingleOrder, myOrders,getAllOrder,updateOrderStatus,deleteOrder} = require('../controller/orderController');
const router=express.Router();

const{isAuthenticatedUser,authorizedRolls }=require('../middlewware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/me').get(isAuthenticatedUser,myOrders);


router.route('/order/:id').get(isAuthenticatedUser,authorizedRolls("admin"),getSingleOrder);

router.route('/admin/orders').get(isAuthenticatedUser,authorizedRolls('admin'),getAllOrder); 

router.route('/admin/order/:id').put(isAuthenticatedUser,authorizedRolls("admin"),updateOrderStatus).delete(isAuthenticatedUser,authorizedRolls("admin"),deleteOrder);





module.exports=router;