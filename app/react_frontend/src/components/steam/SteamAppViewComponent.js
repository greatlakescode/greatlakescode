import React, {Component} from 'react';
import moment from 'moment';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import RequestHelper from "../../utils/RequestHelper";
import BaseLoggedInComponent from "../BaseLoggedInComponent";
import BaseComponent from "../BaseComponent";
import CurrencyFormatter from "../../utils/CurrencyFormatter";
import MessageService from "../../utils/MessageService";


export default class SteamAppViewComponent
    extends BaseComponent

{

    currencyFormatter = new CurrencyFormatter();
    requestHelper = RequestHelper.getInstance(`steam`);


    //https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#preferred-solutions



    constructor(props)
    {
        super(props);


        this.state = {
            app: props.app,
            //on app update do a push notification via socket that can be used to communicate.
            wishlist: [], //list of apps with prices to notify at and current price.
        };


    }

    //default discount set at 50%.
    //https://ned.im/noty/v2/confirmations.html
    //round to nearest dollar amount after applying discount.
    addToWishList = async function(app)
    {

        let self = this;
        //%discount desired by default
        let defaultDiscount = .75;
        //https://ned.im/noty/v2/confirmations.html
        console.log(`addToWishlist`,app);

        let price_dollars = app.initial_price / 100;

        let defaultVal = Math.round(price_dollars * (1 - defaultDiscount));

        //50% in dollars
        // let defaultVal = app.initial_price / (2 * 100);
        let result = await MessageService.confirmWithInput(
            `Please enter a price you would like to purchase "${app.name}" at:<br/>`
        ,
            defaultVal);
        let price;
        if (result.confirm)
        {
            //price in dollars.
            price = result.data;

        }
        else {
            return;
        }

        // addtowishilist
        console.log(`addToWishlist`,result);



        try {
            price = +price * 100; //convert to cents before posting.
            let response = await self.requestHelper.post(`/addtowishilist`,{
                wanted_price: price,
                appid: app.appid
            });



            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);

                MessageService.success(`Added game`);

            }
            else {
                MessageService.error(`Failed to add game`)

            }
        }
        catch (e) {
            MessageService.error(``)
        }


    };



    render()
    {

        let app = this.state.app;
        // console.log(this.props);

        if (!app)
        {
            return (
                <div>
                    no app
                    {JSON.stringify(this.props)}
                </div>
            )
        }

        let wishbutton = ``;
        if (this.props.is_wishlist)
        {

        }
        else {
            wishbutton = <button onClick={() => {this.addToWishList(app)}}>
                Add To Wishlist
            </button>
        }

        //desired is probably better?
        let wanted_price = ``;

        if (app.wanted_price)
        {
            wanted_price = <div>
                <span>Wanted Price: </span>
                <span>{this.currencyFormatter.format(app.wanted_price)}</span>
            </div>
        }



        //TODO remove from wishlist button.
        let header_image = ``;

        let pricing = ``;
        //https://ned.im/noty/v2/confirmations.html
        if (app.final_price)
        {
            pricing = <div>
                <div>
                    <span>Current Price: </span>
                    <span>{this.currencyFormatter.format(app.final_price)}</span>
                </div>
                <div>
                    <span>Regular Price: </span>
                    <span>{this.currencyFormatter.format(app.initial_price)}</span>
                </div>
                {wanted_price}
                {wishbutton}

            </div>
        }

        if (app.header_image)
        {
            header_image = <img
                src={app.header_image} />
        }

        // "_embedded": {
        // "nextepisode": {
        //     "id": 1640050,
        //         "url": "http://www.tvmaze.com/episodes/1640050/general-hospital-2019-04-18-ep-14283",
        //         "name": "Ep. #14283",
        //         "season": 2019,
        //         "number": 75,
        //         "airdate": "2019-04-18",
        //         "airtime": "14:00",
        //         "airstamp": "2019-04-

        return (
            <div>
                <h3>{app.name}</h3>

                {header_image}
                {pricing}




                {/*<pre>{JSON.stringify(this.props,null,' ')}</pre>*/}
            </div>)

    }


}