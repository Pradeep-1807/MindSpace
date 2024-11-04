import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
    const token = req.cookies.authToken;  // Get token from cookie
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
      req.user = verifiedUser; // Store the user info in req.user
      next(); // Pass to the next middleware
    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
}



function verifyTokenAtHome(req, res) {
    const token = req.cookies.authToken;  // Get token from cookies
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });  // No token present
    }
  
    try {
      const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY); 
      return res.status(200).json({ message: 'Token is valid', user: verifiedUser });  // Token valid
    } catch (error) {
      return res.status(401).json({ message: 'Token is invalid' });  // Invalid token
    }
}


export {verifyTokenAtHome}
export default verifyToken