const { json } = require('express');
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // Check if there is token
        if (!token) {
          return res.status(401).json({
            ok: false,
            message: 'Authentication required'
          });
        }
    
        // Validate token
        jwt.verify(token, process.env.SECRET_KEY,
          async (err, decodedToken) => {
            // catch the error
            if (err) {
              return res.status(401).json({
                ok: false,
                message: 'Token is invalid'
              });
            }
    
    
            if (!decodedToken) {
              return res.status(401).json({
                ok: false,
                message: 'User not found'
              });
            }
    
            const user = decodedToken;
    
            // append the user object to the request(req) object
            req.user = user;
    
            // move on next i.e the controller will now take over
            next();
          });
      } catch (error) {
        return res.status(500).json({
          ok: false,
          message: `Server error: ${error.message}`
        });
      }
    };
module.exports = authMiddleware