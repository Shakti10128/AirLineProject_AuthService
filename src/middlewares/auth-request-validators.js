const validateUserAuth = (req,res,next)=>{
    const requiredFields = ["email","password"];
    requiredFields.forEach((field)=>{
        if(!req.body[field]) {
            return res.status(400).json({
                success:false,
                message:`Required field ${field} is missing`,
                data:{},
                err: "Invalid data"
            });
        }
    });

    next();
}

const validateIsAdminRequest = (req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success:false,
            message:`Required field id is missing`,
            data:{},
            err: "Invalid data"
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}