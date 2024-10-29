

const jwt = require('jsonwebtoken');
const logger = require('./Logger');



/**
 * Check client authorization using JWT token in client cookie.
 * @param {*} contr controller to check database if client is logged in or not, to be implemented
 * @param {*} req request object
 * @param {*} res response object
 * @returns 
 */
const checkAuth = async (req, expectedUsername) => {
    const cookie = req.cookies.auth;
    if (!cookie || !expectedUsername){
        return false;
    }
    try {
        const jwtUserPayload = jwt.verify(cookie, process.env.JWT_SECRET);
        logger.log("\n\n\n\n\n////PAYLOAD JTW: " + JSON.stringify(jwtUserPayload))
        //Implement function which calls controller for a database check for user if user is logged
        logger.log("expected username: " + expectedUsername);
        logger.log("actual username: " + jwtUserPayload.username);
        if (jwtUserPayload.username === expectedUsername) return true;
        return false;
    } catch (error) {
        //if verification or controller call failed
        console.log(error)
        return false;
    }
}



module.exports = { checkAuth}