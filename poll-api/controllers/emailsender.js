const nodemailer = require('nodemailer');

const trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "email.test@gmail.com",
        password: "xxxx"
    }
});

const message = `Greetings, 

You have just created a poll on our site - you can ignore this message if it was not you.

Your Poll Details
Poll results: ...
Delete Poll: ...

Kind Regards,
AnonyPoll Team
Check our GitHub page
....
`
const mailOptions = {
    from: "myeamil@test.com",
    to: "tester@gmail.com",
    subject: "AnonyPoll - Your Poll",
    text: message
};

try {
    trasporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(info)
        }
        
    })
} catch (error) {
    console.log("The email was not sent")
}