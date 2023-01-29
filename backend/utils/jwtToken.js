
//Creating Token and Saving in Cookies


const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    
   let date1=new Date( Date.now()+ process.env.COOKIE_EXPIRE*24*60*60*1000);
   
   //console.log(date1)

   
    const options = {
        expires: date1,
        httpOnly: true
    };


    res.status(statusCode).cookie('token', token, options).json({
        sucess: true,
        user,
        token
    });
};
module.exports = sendToken