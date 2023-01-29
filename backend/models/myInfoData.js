const mongoose=require("mongoose");

const mySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
      
    },
    Id:{
        type:Number,
        required:[true,"Id is Required"]
    
    }
});

module.exports=mongoose.model("MyInfoData",mySchema);