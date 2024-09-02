const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware = (req, res, next)=> {

    //First check request headers has authorization or not
    const authorization =  req.headers.authorization;
    if(!authorization)  return res.status(401).json({err:  'Token not found'});

    //Extract the jwt token from the request headers
    const token = req.headers.authorization.split(" ")[1]
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //after verifying successfully it will return payload which we were created before at the time of token creation.
        req.user = decoded;// adding new key in req object.We are adding the key(which has payload i.e userdata) within the request which is going to the server.
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({error: 'Invalid Token'});
    }
}


//Function to generate jwt token
 const generateToken = (userData) =>{
    //Generate a new jwt token using user data
    return jwt.sign({userData}, process.env.JWT_SECRET_KEY, {expiresIn: 30000})
 }


module.exports = {jwtAuthMiddleware, generateToken};