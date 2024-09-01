const jwt = require('jsonwebtoken');
const JWT_SECRET = 'iAmAV$ryGoodBoy';


const fetchUser = (req, res, next) => {
  // Get the user id from the authentication token 
  const token = req.header('auth-token');
  if(!token)
    return res.status(401).json({error: 'Invalid token', message: 'Please authenticate using a valid token'});
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err){
    return res.status(401).json({error: 'Invalid token', message: 'Please authenticate using a valid token'});
  } 

}

module.exports = fetchUser;