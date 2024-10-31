const express = require('express');
const Exception = require('../util/Exception');
const controller = require('../controller/controller');
const logger = require('../util/Logger');
const router = express.Router();
const {checkAuth} = require('../util/cookieHandler');
const { credentials } = require('amqplib');
// es6 syntax
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const entry = router.get('/', async (req, res, next) => {
    try {
        res.send("Hello from applcreate!");
    } catch (error) {
        next(error);
    }
});



const createApplication = router.post('/createApp', async (req, res, next) => {
    try {
        console.log(req.body);
        const application = req.body?.application;
        const token = req.cookies.auth;
        const MAX_WAIT_TIME = 5000;
        /*const acheck = await checkAuth(req, application?.username);
        console.log(acheck);
        if(!acheck){
            throw new Exception("No auth token in request", "No auth token", 401);
        }*/
        if(!application){
            throw new Exception("No application in request body", "No application data", 400);
        }
        const opts = {
            method:"GET",
            headers: {
                "Cookie": "auth=" + token
            },
            redirect: "follow",
            credentials: "include"
        }
        console.log(opts);
        const authcheck = await fetch(process.env.AUTH_MICRO_URL + "userinfo", opts);
        const checkJSON = await authcheck.json();
        console.log(JSON.stringify(checkJSON));
        if(checkJSON.status !== "success"){
            throw new Exception("Unauthorized", "Unauthorized", 401);
        }
        const user = checkJSON.user;
        application.username = user.username;
        application.name = user.name;
        application.surname = user.surname;
        application.email = user.email;
        application.pnr = user.pnr;


        const response = await controller.createApplication(application, token, MAX_WAIT_TIME);
        res.send(response);
    } catch (error) {
        logger.log(error);
        next(new Exception(error.message, "Failed to create application", 400));
    }
});


/*
    expected body: 
    data: {
        username: ...,
        deletions: [{descriptor:..., id:...}]
    }
*/
const deletePart = router.delete('/createApp', async (req, res, next) => {
    try {
        const body = req.body?.data;
        const aCheck = await checkAuth(req, body?.username);
        if (!aCheck){
            throw new Exception("Unauthorized", "Unauthorized", 401);
        }
        console.log("CHECK SUCCESS");
        const response = await controller.deletePartofApplication(body.deletions, req.cookies.auth);
        res.send(response);
    } catch (error) {
        logger.log(error);
        next(new Exception(error.message, "Failed to delete part of application", 400));
    }
});


router.use('/', entry);
router.use('/', createApplication);
router.use('/', deletePart);

router.all('*', async (req, res) => {
    res.status(404).send('404 not found');
});


module.exports = router;