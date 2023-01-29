
const app=require('./app.js');
const dotenv=require('dotenv');
const path = require('path');

const connectDataBase=require('./config/database');



//config

dotenv.config({path:'backend/config/config.env'});

//Connectiong to database

connectDataBase();



app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});