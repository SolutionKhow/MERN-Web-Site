const mongoose = require('mongoose');
const Validator = require("Validator");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please Enter Name"]
        

    },
    description: {
        type: String,
        required: [true,"Please Enter Description"]
    },
    price: {
        type: Number,
        required: [true,"Please Enter Price"],
        maxLength: [6, "Price Can not exceed 8 Figure"]

    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    catogory: {
        type: String,
        required: true
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
        maxLength: [6, "Stock Can not Exced four Character"],
        default: 1


    },
    numOfRewies: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        },
    ],

   user:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:true,
   },


    CreatedAt:{
        type:Date,
        default:Date.now
    }

});
module.exports=mongoose.model("Product",productSchema);