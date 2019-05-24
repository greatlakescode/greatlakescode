import BaseUtil from "../BaseUtil";
import EmailTransporter from "./EmailTransporter";

export default class EmailTransactional {

    static transporter;
    static transactionalEmailAddress;

    static async initTransporter()
    {
        if (!process.env.GREATLAKESCODE_TX_EMAIL
        ||!process.env.GREATLAKESCODE_TX_EMAIL_SMTP
            ||!process.env.GREATLAKESCODE_TX_EMAIL_USER
            ||!process.env.GREATLAKESCODE_TX_EMAIL_PASS
        )
        {
            let available_keys = [];
            for (let key in process.env)
            {
                available_keys.push(key);
            }
            console.log(available_keys);
            throw new Error(`Transaction Email missing configuration`);
        }
        this.transactionalEmailAddress = process.env.GREATLAKESCODE_TX_EMAIL;

        this.transporter = new EmailTransporter({
            host: process.env.GREATLAKESCODE_TX_EMAIL_SMTP,
            auth: {
                user: process.env.GREATLAKESCODE_TX_EMAIL_USER, // generated ethereal user
                pass: process.env.GREATLAKESCODE_TX_EMAIL_PASS
            }
        });
    }


    static async getTransporter()
    {
        if (this.transporter === undefined)
        {
            await this.initTransporter();

        }
        return this.transporter;
    }


    static async send(sendOpts: {
        to,
        subject,
        html
    }) {
        let transporter = await this.getTransporter();

        let sendOptsFinal = Object.assign({},
            sendOpts,
            {
                from: this.transactionalEmailAddress,

            }
            );
        console.log(`do send`,sendOptsFinal);
        let info = await transporter.sendMail(sendOptsFinal);
        console.log(`sendWithNodeMailer`,info);
    }

}