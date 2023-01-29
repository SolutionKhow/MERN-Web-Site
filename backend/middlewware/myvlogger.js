const myvlog=(req,res,next)=>{
    console.log('Vlogger');
    next();
}

module.exports=myvlog