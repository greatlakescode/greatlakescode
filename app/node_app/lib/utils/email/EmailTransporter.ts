import BaseUtil from "../BaseUtil";

const nodemailer = require('nodemailer');
const sendmail = require('sendmail');


export default class EmailTransporter {

    transporter;

    stubTransporter = {
        sendMail: async function(otps)
        {
            console.log('mail stubbed',otps);

            return {};
        }
    };

    constructor(opts?) {

        let stub = process.env.GREATLAKESCODE_EMAIL_STUB == "1";
        if (stub)
        {
            this.transporter = this.stubTransporter;
        }
        else {
            this.transporter = nodemailer.createTransport({
                host: process.env.GREATLAKESCODE_TX_EMAIL_SMTP,
                auth: {
                    user: process.env.GREATLAKESCODE_TX_EMAIL_USER, // generated ethereal user
                    pass: process.env.GREATLAKESCODE_TX_EMAIL_PASS
                }
            });
        }
    }


    async sendMail(opts)
    {
        return this.transporter.sendMail(opts);
    }

}