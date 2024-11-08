const express = require('express');
const router = express.Router();
const controller = require('../../controller/Controller');
const decryptToken = require('../../util/tokenHandler')

router.get('/viewMultiple', async (req, res, next) => {
    const nrOfApplications = req.query.nrApps;
    try {
        const applications = await controller.get_applications(nrOfApplications);
        res.send(applications);
    } catch (error) {
        next(error);
    }
});

router.get('/view', async (req, res, next) => {
    const pnr = req.query.personal_number;
    try {
        const application = await controller.get_applicationByPNR(pnr);
        res.send(application);
    } catch (error) {
        next(error);
    }
});


router.get('/own', async (req, res, next)=>{
    
    try {
        const jwtPayload = decryptToken(req.cookies.auth);
        
        const app = await controller.get_applicationByExternalID(jwtPayload.person_id);

        console.log(jwtPayload);
        console.log(app);

        if (app){
            res.send(app);
        }
        else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        next(error);
    }
})

router.get('/competencies', async (req, res, next) => {
    try {
        const competencies = await controller.get_competencies();
        res.send(competencies);
    } catch (error) {
        next(error);
    }
});



module.exports = router;