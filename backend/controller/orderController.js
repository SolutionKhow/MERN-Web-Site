const MyOrder = require('../models/orderModel')
const product = require('../models/productModels');
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
        const ordering =await MyOrder.findById(req.params.id).populate("user","name email");
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


























