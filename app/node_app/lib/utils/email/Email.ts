import EmailTransporter from "./EmailTransporter";
import BaseUtil from "../BaseUtil";

export default class Email
    extends BaseUtil
{

    sendOpts;
    transporter:EmailTransporter;


    constructor(opts:{
        to,
        from?,
        subject?,
        html?
    })
    {
        super(opts);
        let {to,from,subject,html} = opts;
        this.sendOpts = {
            to,from,subject,html
        };
    }



    static async sendEmail(opts:{
        to,
        from?,
        subject?,
        // text?,
        html?
    })
    {

        let email:Email = await this.create(opts);

        await email.send();
    }


    async init()
    {
        this.transporter = await EmailTransporter.create();
    }


    async send()
    {
        await this.transporter.send(this.sendOpts);
    }

}