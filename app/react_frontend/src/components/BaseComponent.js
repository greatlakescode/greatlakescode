import React, {Component} from 'react';
import {
    // browserHistory,
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
} from 'react-router-dom'


export default class BaseComponent extends Component {
    state = {
        mounted: null,
        loading: true,
        form: {}
    };
    cancelled = false;


    constructor()
    {
        super();

    }

    wait(time)
    {
        return new Promise((r) => {
            return setTimeout(r,time);
        })
    }

    async populateAsyncState() {
        return;
    }

    async init()
    {
        return this.populateAsyncState();
    }

    refresh = async() =>
    {
        this.setState({loading:true,redirect:null});
        console.log(this.constructor.name,`refresh`);
        let loading = true;
        // this.setState({loading});
        await this.init(); //initialize the application.
        loading = false;
        this.setState({loading});
    };

    componentDidMount()
    {
        console.log(this.constructor.name,`componentDidMount`);
    }

    componentWillMount() {
        console.log(this.constructor.name,`componentWillMount`);
        this.cancelled = false;
        this.loading = true;
        this.setState({
            mounted: new Date(),
            loading: true
        });

        this.refresh().then(() => {
            console.log(this.constructor.name,`componentWillMount`, `finished`);
        });
    }

    componentWillUnmount() {
        this.cancelled = true;
        this.loading = true;
    }

    logTrace()
    {
        try {
            throw new Error(`test`);
        }
        catch (e)
        {
            console.debug(e);
            // console.log(e.trace);

        }
    }


    setState(state,
             // props,
             callback) {
        console.log(this.constructor.name,'setState',state);
        this.logTrace();
        if (this.cancelled) {
            console.log(`cancelled`);
        }
        else {
            super.setState(state);
            // this.super.setState(data);
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    setRedirect(path)
    {
        let redirect = this.props.match.path + '/' + path;

        this.setState({redirect});
    }

    //{"match":{"path":"/app/blog","url":"/app/blog","isExact":false,"params":{}},"location":{"pathname":"/app/blog/create","search":"","hash":"","key":"7hwstu"},"history":{"length":15,"action":"POP","location":{"pathname":"/app/blog/create","search":"","hash":"","key":"7hwstu"}}}
    get hasRedirect()
    {
        console.log(`hasRedirect ${this.pathname} ${this.state.redirect}`);
        if (this.state.redirect)
        {
            if (this.state.redirect !== this.pathname)
            {
                return true;
            }
        }
        return false;
    }




    handleForm = name => event => {
        let form = this.state.form;
        form[name] = event.target.value;
        this.setState({
            form
        });
    };

    submit = async (event) => {
        let data = this.state.form;
        console.log(`submit`,data);
        event.preventDefault();
        // let q = this.state.q;

        try {
            await this.handleFormSubmit(data);
        }
        catch (e) {
        }
    };


    //can be overridden
    async handleFormSubmit(data)
    {
        console.log(`BaseComponent->handleFormSubmit`,data);
    }
}

