const express = require('express');
const router = express.Router();
const logger = require('../../util/Logger');
const ctrl = require('../../controller/Controller');

router.get('/',async (req, res, next) => {
    const RECRUITER = 1;
    const APPLICANT = 2;
 
    try {
        const originalUri = req.get('X-Original-URI');

        const user = req.auth;
        if (originalUri){
            console.log(JSON.stringify(user))
            console.log(originalUri);
            if (originalUri.startsWith('/applications')){
                
                if (user?.role_id === RECRUITER){
                    res.status(200).send({auth_status: 'Authorized'});
                }
                else {
                    if (user?.role_id === APPLICANT && originalUri.startsWith('/applications/own')){
       
                    
                            res.status(200).send({auth_status: 'Authorized'});
                            return;
                   
                    }
                    
                    res.status(401).send({auth_status: 'Unauthorized'});
                    
                }
                return;
            }

            if(originalUri.startsWith('/createApp')){
                if (user?.role_id === APPLICANT){
                    res.status(200).send({auth_status: 'Authorized'});
                }
                else {
                    res.status(401).send({auth_status: 'Unauthorized'});
                }
                return;
            }
        }

        if (req.auth){
            res.status(200).send({auth_status: 'Authorized', username: user.username,  name: user.name, role_id: user.role_id});
        } else {
            res.status(401).send({auth_status: 'Unauthorized', });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;