const express = require('express');
const router = express.Router();
const logger = require('../../util/Logger');
const ctrl = require('../../controller/Controller');

router.get('/',async (req, res, next) => {
    const RECRUITER = 1;
    const APPLICANT = 2;
 
    try {
        const user = req.auth;
        if(user && user?.role_id === APPLICANT){
            res.status(200).send({status: "success", user: {
                username: user.username,
                name: user.name,
                surname: user.surname,
                pnr: user.pnr,
                email: user.email,
            }});
        } else {
            res.status(403).send({status: "error", message: "Unauthorized"});
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;