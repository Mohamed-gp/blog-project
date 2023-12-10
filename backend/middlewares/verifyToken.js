const jwt = require("jsonwebtoken")




// verifyToken 

function verifyToken (req,res,next) {
    // authorization == in upper case
    const authToken = req.headers.authorization
    if (authToken) {
        const token = authToken.split(" ")[1]

        try {
            const decodedPayload = jwt.verify(token,process.env.JWT_KEY)
            req.user= decodedPayload
            next()  
        } catch (error) {
            return res.status(401).json({message : "invalid token,access denied"})
        }
    }else{
        // 401 unauthorized
        res.status(401).json({message : "no token provided,access denied"})
    }
}
// to do i speak components and js > php > python


function verifyTokenAndAdmin (req,res,next) {
    verifyToken(req,res,() => {
        if (req.user.isAdmin) {
            next()
        }else{
            return res.status(403).json({message : "you are not allowed only admin"})
        }
    })
}


function verifyTokenAndUser (req,res,next) {
    verifyToken(req,res,() => {
        if (req.user.id != req.params.id) {
            return res.status(403).json({message : "you are not allowed only user himself"})
        }
        next()
    })
}


module.exports = {
    verifyTokenAndAdmin,
    verifyTokenAndUser
}