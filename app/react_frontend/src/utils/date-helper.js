// import axios from 'axios'
// import EnvHelper from "./env-helper";
// import MessageService from "./message-service";
import moment from 'moment'


export default class DateHelper
{

    static getTime(date)
    {
        return moment(date).format('hh:mm A')
    }

    static getShortDate(date)
    {
        return moment(date).format('MMM DD hh:mm:ss A')

    }

    static getDateWithYear(date)
    {
        return moment(date).format('\'YY MMM DD hh:mm:ss A')

    }
}