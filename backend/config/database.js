const mongoose = require('mongoose');
mongoose.set('strictQuery', true);



// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true
//            // useCreateIndex: true,
//            // useFindAndModify: false
//         });

//         console.log("Mongo DB connected");
//     } catch (err) {
//         console.error(err.massage);

//         //exit if failure
//         process.exit(1);
//     }
// }
// module.exports = connectDB;


const connectDataBase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true}).then((data)=>{
        console.log(`mongoDb connected with ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err );
    });
}

module.exports=connectDataBase

