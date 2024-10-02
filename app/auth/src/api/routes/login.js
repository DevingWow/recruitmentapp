const express = require('express');
const router = express.Router();
const controller = require('../../controller/Controller');
const cookiehandler = require('../../util/cookiehandler');


router.post("/", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await controller.loginUser(username, password);
        if (user && user.password){
            cookiehandler.sendAuthCookie(user, res);
            res.send({login_status: 'success', username: user.username, name: user.name, role_id: user.role_id});
        }
        else {
            res.send({login_status: 'fail'});
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;