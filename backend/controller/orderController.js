const MyOrder = require('../models/orderModel')
const MyProduct = require('../models/productModels');
const ErrorHandler = require("../utils/Errorhandler");


//------------------------Create New Order-----------------------
exports.newOrder = async (req, res, next) => {
    try {

        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingsPrice, TotalPrice } = req.body;

        const order = await MyOrder.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingsPrice,
            TotalPrice,
            paidAt: Date.now(),
            user: req.user._id,

        });

        res.status(200).json({
            status: true,
            order,
        });




    } catch (error) {
        res.status(404).send("Server Error");

    }


}
//-------------------------Get Locked in User Order---------------------

exports.myOrders = async (req, res, next) => {
    try {

        const order = await MyOrder.find({ user: req.user._id });

        //console.log(order);



        res.status(200).json({
            status: true,
            order
        });


    } catch (error) {
        res.status(404).send("Server Error");
    }

}
//---------get Logged in single Order------------------


exports.getSingleOrder = async (req, res, next) => {
    try {
        const ordering = await MyOrder.findById(req.params.id).populate("user", "name email");
        // console.log(ordering);

        if (!ordering) {
            return next(new ErrorHandler("order not found with this id", 400));
        }

        res.status(200).json({
            status: true,
            ordering
        });







    } catch (error) {
        res.status(404).send("Server Error");
    }
}

//---------------------------------------------------------------------------------------------------
exports.getAllOrder = async (req, res, next) => {
    try {

        const orders = await MyOrder.find();

        //console.log(order);
        let totalAmount = 0;
        orders.forEach(order => { totalAmount += order.TotalPrice });

        res.status(200).json({
            status: true,
            totalAmount,
            orders
        });


    } catch (error) {
        res.status(404).send("Server Error");
    }

}
//-----------------------update Order Status Admin---------------------------------------------------


exports.updateOrderStatus = async (req, res, next) => {
    try {

        const order = await MyOrder.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("order not found with this id", 400));
        }

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("you already deliverd this product", 404));
        }

        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);

        });


        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliverdAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });




        res.status(200).json({
            status: true,


        });

        async function updateStock(id, quantity) {

            const product = await MyProduct.findById(id);
            product.Stock = product.Stock - quantity;
            await product.save({ validateBeforeSave: false });

        }





    } catch (error) {
        res.status(404).send("Server Error");
    }

}
//-------------------------------Delete Order--------------------------------------------

exports.deleteOrder = async (req, res, next) => {
    try {

        const order = await MyOrder.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("order not found with this id", 400));
        }
   
        await order.remove();

        res.status(200).json({
            status: true

        });


    } catch (error) {
        res.status(404).send("Server Error");
    }

}






















