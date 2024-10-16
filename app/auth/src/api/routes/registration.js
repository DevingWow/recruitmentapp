const express = require('express');
const router = express.Router();
const controller = require('../../controller/Controller');
const validator= require('../../util/Validator');

router.post("/", async (req, res, next) => { 
    try {
        const body = req.body;
        const validitystatus = validator.validateRegisterForm(
            body.username,
            body.password,
            body.pnr,
            body.email,
            body.name,
            body.surname
        );

        if (validitystatus.length > 0){
            res.status(400).send({register_status: 'fail', user: body.username, causes: validitystatus.map(cause => cause.msg)});
            return;
        }

        const regStatus = await controller.registerUser(
            body.username,
            body.password,
            body.pnr,
            body.email,
            body.name,
            body.surname
        );
        if(regStatus === false) res.status(409).send({register_status: 'fail', user: undefined, causes:['account with these credentials already exists']});
        else res.send({register_status: 'success', user: body.username});
    } catch (error) {
        next(error);
    }
});

module.exports = router;