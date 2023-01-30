

const MyProduct = require('../models/productModels');
const ErrorHandler = require('../utils/Errorhandler');
const ErrorHandler1 = require('../middlewware/error');
const Apifeatures = require('../utils/apifeatures');



//Create Products

// exports.createProduct = async (req, res, next) => {
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success: true,
//         product
//     });
// }

// create Product with Post Method


exports.createProduct = async (req, res, next) => {
    try {

        req.body.user = req.user.id;
        const myproduct = await MyProduct.create(req.body);
        res.status(201).json({
            sucess: true,
            myproduct
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).send("Server Error");

    }

}


//-----------------------------------------------------------------------


//GET Product Detail

exports.getAllProducts = async (req, res) => {
    try {
        const resultPerPage = 5;
        const productCount = await MyProduct.countDocuments();
        const MyApifeatures = new Apifeatures(MyProduct.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
        //const apifeatures=new Apifeatures(MyProduct.find(),req.query).search().filter();
        //console.log(Apifeatures);
        //const products = await MyProduct.find();
        const products = await MyApifeatures.query;

        res.status(200).json({
            message: "Sucess",
            data: {
                products,
                productCount
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send("Server Error");


    }


}
//-----------------------------------------------------------------------------

//Update Database

exports.updateProduct = async (req, res, next) => {


    try {


        let product = await MyProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));


            //res.status(500).json({
            //         sucess: false,
            //         message: "Product not Here"
            //     });
        }
        product = await MyProduct.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            sucess: true,
            product
        })



    } catch (error) {
        console.log(error.message);
        res.status(404).send("Server Error");

    }



}
//---------------------------------------------------------------------------------------
//delete Product

exports.deleteProducts = async (req, res, next) => {

    try {
        //const MyProductDelete=new Apifeatures(MyProduct.findById,req.query);
        const product = await MyProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        await product.remove();
        res.status(200).json({
            sucess: true,
            message: "product deleted"
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send("Server Error");

    }

}
//--------------------------------------------------------------------------------------

//GET all Product Detail by ID

exports.getAllDetail = async (req, res, next) => {

    try {
        let product = await MyProduct.findById(req.params.id);
        //console.log(product);
        if (!product) {
            return next(new ErrorHandler());
        }

        res.status(200).json({
            status: true,
            product
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).send("Server Error");
    }



}

//------------------------------------------------------------------------------------------------------
//Create new review and Update Review....


exports.createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,


        }

        const product = await MyProduct.findById(productId);
        const isRevied = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

        if (isRevied) {
            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString())
                    rev.rating = rating,
                        rev.comment = comment
            })

        }





        else {
            product.reviews.push(review);
            product.numOfRewies = product.reviews.length
        }


        let avg = 0;

        product.reviews.forEach(rev => {
            avg += rev.rating
        });

        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
        });


    } catch (error) {
        res.status(404).send(error);

    }
}
//-------------------gET All Review of Product

exports.getProductAllReview = async (req, res, next) => {
    try {

        const product = await MyProduct.findById(req.query.id);

        if (!product) {
            return next(new ErrorHandler("Product not Found", 404));
        }
        res.status(200).json({
            status: true,
            reviews: product.reviews
        });


    } catch (error) {
        res.status(404).send(error);
    }
}


//-----------------------------Delete Product-------


exports.deleteProductReview = async (req, res, next) => {
    try {
        const product = await  MyProduct.findById(req.query.productId);

        if (!product) {
             return next(new ErrorHandler("Product not Found"), 404);
        }

        // //    const reviews=product.reviews.filter(rev=>rev._id.toString() !==req.query.id.toString());
        // //    console.log(reviews);

         const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())
       
       
         let avg = 0;

         reviews.forEach(rev => {
             avg = avg + rev.rating
         });

        const ratings = avg / reviews.length;
        const numOfRewies = reviews.length;

        await MyProduct.findByIdAndUpdate(req.query.productId,
            {
                reviews,
                ratings,
                numOfRewies
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }

        );






        res.status(200).json({
            status: true,
            product

        });



    } catch (error) {
        res.status(404).send(error);
    }
}