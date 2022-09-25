const express = require("express");
const router = express.Router();

const yogaController = require('../controllers/yogaController');
const guest = require('../middlewares/guest')
const notLoggedIn = require('../middlewares/notLoggedIn')
const admin = require('../middlewares/admin')

router.get('/',yogaController.homepage)
router.get('/aboutus',yogaController.aboutus)
router.get('/contact',yogaController.contact)
router.get('/onlineClass',notLoggedIn,yogaController.onlineClass)
router.get('/calender',yogaController.calender)

router.get('/calender/addMonth',admin,yogaController.calenderMonth)
router.get('/calender/updateMonth',admin,yogaController.calenderUMonth)

//API
router.post('/calender/api/month',yogaController.create)
router.get('/calender/api/month',yogaController.find)
router.put('/calender/api/month/:id',yogaController.update)
router.delete('/calender/api/month/:id',yogaController.delete)


router.get('/login', guest,yogaController.login)
router.post('/login',yogaController.postlogin)

router.post('/logout',yogaController.logout)


router.get('/signup', guest,yogaController.signup)
router.post('/signup', yogaController.postsignup)


module.exports = router;