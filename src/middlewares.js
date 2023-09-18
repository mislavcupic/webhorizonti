const authPage = (permissions) => {
return (req,res,next) => {
    const userRole = req.body.role;
    if(permissions.includes(userRole)){
        next();
    }
    else{
    return res.status(401).json("you don't have permission!");
}
}
}

const authPred = (req,res,next) => {
   res.json("You are not permitted to enter pred...")
}

module.exports=(authPage,authPred);