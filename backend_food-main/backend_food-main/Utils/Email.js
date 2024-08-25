const nodeMailer = require("nodemailer");

async function SendVerificationMail(OTP,email) {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: "Verification",
        html: '<div style="height: 350px;background-color: white"><center><img src="https://assets.materialup.com/uploads/828f9aae-297f-432d-b92c-f255f583c66d/preview.jpg" style="height: 200px;width: 200px"/></center><h1 style="color: #00aced;text-align: center">YOUR OTP IS</h1>' +
            `<center><h1 style="color: rgb(255, 165, 47);margin-top: 5px;">${OTP}</h1></center></div>`
    }
    await transporter.sendMail(mailOptions)
}

async function SendResetMail(email,userId){
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: "Password Reset",
        html: '<div style="height: 400px;background-color: white"><center><img src="https://cdn.dribbble.com/users/2879528/screenshots/11007898/media/02a3ee1367c85fbf8ee060614cb97fb0.jpeg?resize=400x0" style="height: 200px;width: 200px"/></center><h1 style="color: #00aced;text-align: center">Click Link Below To Reset Your Password</h1>' +
            `<center><a href=${process.env.FRONTEND_BASE_URL + "reset/" + userId.toString()}  style="background-color: rgb(255, 165, 47);padding: 20px;padding-left: 50px;padding-right: 50px;color: #efefef; border-radius: 10px;margin-top: 20px;">Reset Password</a></center></div>`
    }

    await transporter.sendMail(mailOptions)
}

module.exports = {SendVerificationMail, SendResetMail}
