import BaseUtil from "../BaseUtil";

const nodemailer = require('nodemailer');
const sendmail = require('sendmail');


export default class EmailTransporter
    extends BaseUtil {


    transporter;


    // defaultFrom = `baylee.wilderman@ethereal.email`;
    defaultFrom = `russj@greatlakescode.us`;

    constructor(opts?) {
        super(opts);
    }

    static async create(opts?) {
        let obj = new this();
        await obj.init();
        return obj;
    }


    async initMailGun()
    {

        //pass1234#$%^!
        this.transporter =
            nodemailer.createTransport({
                host: "smtp.mailgun.org",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: `postmaster@coderuss.com`, // generated ethereal user
                    pass: `pass1234#$%^!` // generated ethereal password
                }
            });
    }


    async initEtheral()
    {
        // this.transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     auth: {
        //         user: `baylee.wilderman@ethereal.email`, // generated ethereal user
        //         pass: `uyV7rQvvwbWRxwTqms` // generated ethereal password
        //     }
        // });

        this.transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            auth: {
                user: `russj@greatlakescode.us`, // generated ethereal user
                pass: `i1l4r5h6m7` // generated ethereal password
            }
        });
    }


    async init() {
        // await this.initMailGun();
        await this.initEtheral();
        // this.transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: `baylee.wilderman@ethereal.email`, // generated ethereal user
        //         pass: `uyV7rQvvwbWRxwTqms` // generated ethereal password
        //     }
        // });
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


    private async sendWithNodeMailer(sendOpts)
    {
        let info = await this.transporter.sendMail({
            from: this.defaultFrom, // sender address
            // to: sendOpts.to, // list of receivers
            // to: [`invalid@foo.com`], // list of receivers
            // to: `russj@greatlakescode.us`,
            to: `russjohnson09@gmail.com`,

            // to: "russjohnson09@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        });


        console.log(`sendWithNodeMailer`,info);
    }


    //https://ethereal.email/create
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

        return this.sendWithNodeMailer(sendOpts);
        //
        // return new Promise(async (r) => {
        //
        //     console.log(`send`,sendOpts);
        //     sendmail({
        //         from,
        //         to,
        //         subject,
        //         html
        //         // from: 'no-reply@yourdomain.com',
        //         // to: 'test@qq.com, test@sohu.com, test@163.com ',
        //         // subject: 'test sendmail',
        //         // html: 'Mail of test sendmail ',
        //     }, function (err, reply) {
        //         console.log(err && err.stack);
        //         console.dir(reply);
        //
        //         r({err,reply});
        //     });
        // });


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