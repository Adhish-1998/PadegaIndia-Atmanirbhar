const otpGen = require("otp-generator")
const otpModel = require("../modules/otpModel")

var sid = "ACf0db510e5f4f817a2c6668e07ba24506";
var auth_token = "e6d2a70e5d3ae64f2878b0d39e3a2e7d";
var twilio = require("twilio")(sid, auth_token);





const otpGenerator = async (req, res) => {
    try {
        ///<-----------------------------Mobile Number Validation ---------------------------->

        if (!/^[6-9]\d{9}$/.test(req.body.number)) {
            return res.status(400).send({
                status: false,
                message: "Please give 10 digit number starting with (6-9).",
            });
        }
        //OTP Generator
        let otp = otpGen.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
        twilio.messages
            .create({
                from: "+13515298228",
                to: '+91'+req.body.number,
                body: `this is testing otp is ${otp}`,
            })
            .then(function (res) { console.log("message has sent!") })
            .catch(function (err) {
                console.log(err);
            });
        await otpModel.create({ number: req.body.number, otp: otp })
        return res.send({ otp: `otp generated ${otp}` })
    }
    catch (error) {
        rs
        res.status(500).send({ status: false, msg: error.message })
    }
}

const otpVerify = async (req, res) => {
    try {
        //OTP Verifying using DB call and User
        let otp = await otpModel.findOne({ otp: req.body.otp })
        console.log(otp)
        if (!otp) return res.send('Wrong OTP')
        return res.send('Verification is Success.')
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports = {
    otpGenerator,
    otpVerify
}