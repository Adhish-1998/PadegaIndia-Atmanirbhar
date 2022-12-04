const express = require('express');
const router = express.Router();
//const {login} = require("../Controllers/login")
const {otpGenerator,otpVerify} = require("../Controllers/otpController")



// ==================[ login Api's ]==================================
// router.post("/login", login)
// router.post("/signup",signUp )

router.post('/otpGenerator', otpGenerator)
router.post('/otpVerify', otpVerify)


//Error Handing
router.all('/*', (req, res) => {
    res.status(404).send({ status: false, message: "URL Not Found" })
})


module.exports = router;