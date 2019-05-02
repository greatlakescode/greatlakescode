import React, {Component} from 'react';
import moment from 'moment';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./../../BaseComponent";
import MessageService from "../../../utils/MessageService";
import RequestHelper from "../../../utils/RequestHelper";


export default class ShowImageComponent
    extends BaseComponent

{

    state = {
        image: null
    };

    constructor(props)
    {
        super(props);

        //this.props is undefined in the constructor.
        console.log(`ShowImageComponent props`,props,this.props);

        //show prop
        this.state.image = props.image;
    }


    render()
    {


        let image = this.state.image;
        console.log(`ShowImageComponent`,image);

        let imageSrc;

        if (image && image.medium)
        {
            imageSrc = image.medium;
        }
        let showImage = <span></span>;
        if (imageSrc)
        {
            showImage = <span><img src={imageSrc} /></span>
        }


        return (
            <span>
                                {showImage}

            </span>)

    }


}