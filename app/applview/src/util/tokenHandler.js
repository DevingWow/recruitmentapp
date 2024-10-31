const jwt = require('jsonwebtoken');


const decryptToken = (token) => {
  try {
    if (!token) return null;
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    return jwtPayload;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

module.exports = decryptToken;