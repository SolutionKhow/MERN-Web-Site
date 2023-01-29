// middleware function to attach user's role to request object
const attachRole = (req, res, next) => {
    // assume user object has a property called "role"
    req.user = { ...req.user, Role: req.user.Role };
    next();
  };
  
 
  
  module.exports=attachRole