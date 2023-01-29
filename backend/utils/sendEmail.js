const nodemailer = require('nodemailer');
//const nodemailer2=require('nodejs-nodemailer-outlook');

const sendEmail = async (options) => {

    let transporteter = nodemailer.createTransport({



        host: 'smtp-mail.outlook.com',                  // hostname
        service: 'outlook',                             // service name
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3'                            // tls version
        },
        port: 587,                                      // port
        auth: {
            user: "ansh1305@outlook.com",
            pass: "ansh@1305"
        }
        // // service: process.env.SMPT_SERVICE,

        //    host:process.env.SMTP_HOST,
        //    port:process.env.SMTP_PORT,
        //    secureConnection: false,
        //    tls: {
        //     ciphers:'SSLv3'
        //  },
        //     auth: {
        //         user: process.env.SMPT_MAIL,
        //         pass: process.env.SMTP_PASSWORD,
        //     }
    })
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporteter.sendMail(mailOptions);
};


module.exports = sendEmail;