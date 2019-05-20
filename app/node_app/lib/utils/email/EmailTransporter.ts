import BaseUtil from "../BaseUtil";

const nodemailer = require('nodemailer');
const sendmail = require('sendmail');


export default class EmailTransporter
    extends BaseUtil {

    constructor(opts?) {
        super(opts);
    }

    static async create(opts?) {
        let obj = new this();
        await obj.init();
        return obj;
    }


    async init() {
        // nodemailer.createTransport({
        //     host: "smtp.example.com",
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: "username",
        //         pass: "password"
        //     }
        // });
    }

    // static async sendEmail(opts:{
    //     to,
    //     from?,
    //     subject?,
    //     text?,
    //     html?
    // })
    // {
    //
    // }


    async send(sendOpts: {
        from,
        to,
        subject,
        html
    }) {
        let {
            from,
            to,
            subject,
            html
        } = sendOpts;
        sendmail({
            from,
            to,
            subject,
            html
            // from: 'no-reply@yourdomain.com',
            // to: 'test@qq.com, test@sohu.com, test@163.com ',
            // subject: 'test sendmail',
            // html: 'Mail of test sendmail ',
        }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });

        // sendmail({
        //     from: 'no-reply@yourdomain.com',
        //     to: 'test@qq.com, test@sohu.com, test@163.com ',
        //     subject: 'test sendmail',
        //     html: 'Mail of test sendmail ',
        // }, function(err, reply) {
        //     console.log(err && err.stack);
        //     console.dir(reply);
        // });
    }

}