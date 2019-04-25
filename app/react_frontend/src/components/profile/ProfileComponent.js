import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import BaseComponent from "./../BaseComponent";


import Loading from "./../loading/Loading";
import MessageService from "../../utils/MessageService";
import RequestHelper from "../../utils/RequestHelper";
import TextField from "@material-ui/core/TextField/TextField";


//https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
export default class ProfileComponent extends BaseComponent {

    requestHelper = RequestHelper.getInstance(`profile`);

    settingsKeys = [
        'address1',
        'address2',
        'city',
        'state',
        'zip',
        'phone',
        'first_name',
        'last_name'
    ];


    constructor()
    {
        super();

        this.state.profile = null;

        for (let setting of this.settingsKeys)
        {
            this.state.form[setting] = '';
        }
        // this.state.form = {
        //     address1: '',
        //     address2: ''
        // }
    }

    async getProfile()
    {

        // await this.wait(100);
        //status
        // statusText
        // data
        // headers
        let response = await this.requestHelper.get();

        if (response.status >= 400)
        {
            if (response.status === 401)
            {
                console.log(`redirect to login`);
                this.setState({
                    redirect: '/login'
                })
            }
            else if (response.status === 404)
            {
                MessageService.error(`Failed to connect to api.`);
            }

        }
        else {

            let {data} = response;

            return data;

        }

    }

    async handleFormSubmit(data)
    {
        let self = this;
        let rh = self.requestHelper;
        console.log(`profile form submit`,data);

        try {
            let response = await rh.post(`update-settings`,
                data);

            if (response.status === 200) {
                let data = response.data;
                console.log(`results`,data);
                return this.refresh();
            }
            else {
            }
        }
        catch (e) {
            MessageService.error(`saved blog`);
        }


    }


    async populateAsyncState() {
        let profile = await this.getProfile();

        let {settings} = profile;
        let form = this.state.form;
        for (let setting of this.settingsKeys)
        {
            if (settings[setting])
            {
                form[setting] = settings[setting];

            }
        }

        this.setState({profile,form});

    }


    render() {
        let match = this.props.match;


        if (this.state.loading)
        {
            return (<Loading/>)
        }
        if (this.state.redirect) {

            MessageService.warn(`Redirecting to login`);
            return (<Redirect to='/login' />);
        }

        let mainForm = ``;
        let settingsKeys = [
            'address1',
            'address2',
            'city',
            'state',
            'zip',
            'phone',
            'first_name',
            'last_name'
        ];
        // for (let settingKey of [
        //     'address1',
        //     'address2',
        //     'city',
        //     'state',
        //     'zip',
        //     'phone',
        //     'first_name',
        //     'last_name'
        // ])
        // {
        //     mainForm +=  <TextField
        //         // multiline={true}
        //         // rows={2}
        //         // rowsMax={4}
        //         name={settingKey}
        //         type="text"
        //         label={settingKey}
        //         margin="normal"
        //         value={this.state.form.address1}
        //         onChange={this.handleForm('address1')}
        //     />
        // }

        return (
            <div>

                <h1>Profile</h1>

                <form onSubmit={this.submit}>
                    <pre>{JSON.stringify(this.state.form,null,' ')}</pre>
                    {/*<TextField*/}
                        {/*// multiline={true}*/}
                        {/*// rows={2}*/}
                        {/*// rowsMax={4}*/}
                        {/*name="address1"*/}
                        {/*type="text"*/}
                        {/*label="address1"*/}
                        {/*margin="normal"*/}
                        {/*value={this.state.form.address1}*/}
                        {/*onChange={this.handleForm('address1')}*/}
                    {/*/>*/}
                    {(settingsKeys).map(setting => {
                        // let link = `/app/blog/edit/${row._id}`;

                        return (
                            <TextField key={setting}
                                // multiline={true}
                                // rows={2}
                                // rowsMax={4}
                                name={setting}
                                type="text"
                                label={setting}
                                margin="normal"
                                value={this.state.form[setting]}
                                onChange={this.handleForm(setting)}
                            />
                        )

                    })}


                    <input type='submit' label="Submit" />

                </form>

            </div>
        )
    }
}