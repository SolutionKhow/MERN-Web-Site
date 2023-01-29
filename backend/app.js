

const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const errorMiddleWare=require('../backend/middlewware/error');
const cookieParser=require('cookie-parser');








const app=express();


app.use(express.json());
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





//Routes imports

const products=require('./Routes/productRoute');
const Users=require('./Routes/usersRoute');


app.use('/api/v1',products);
app.use('/api/v1',Users);


//Middle for eRROR
app.use(errorMiddleWare);


 


module.exports=app