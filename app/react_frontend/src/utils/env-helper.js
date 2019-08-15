class EnvHelper {


    /**
     * pull in any environment variables set.
     * @returns {{API_URL: string, DEBUG: boolean}|{API_URL: string, DEBUG: boolean}}
     */
    static getEnv()
    {
        if (process.env.REACT_APP_ENV === 'prod') {
            return {
                'API_URL': 'https://api.russjohnson.us',
                'DEBUG': false,
            }
        }
        else {
            return {
                'API_URL': 'http://localhost:8000',
                'DEBUG': false,
            }
        }
    }


    /**
     *
     * @returns {string}
     */
    static getApiEnv(api_name)
    {

        let obj;
        if (process.env.REACT_APP_API_ENV === 'local')
        {
            obj = {
                default: {
                    protocol: 'http',
                    port: 3000, //leave blank if not required?
                    domain: 'localhost',
                },
                notes: {
                    api_endpoint:  '/api/notes-api',
                    // host: 'http://localhost:3000',
                    protocol: 'http',
                    port: 3000, //leave blank if not required?
                    domain: 'localhost',
                },
                auth: {
                    // api_endpoint:  '/api/auth',
                    ////authorization will have root access and is responsible
                    //for its own router. It is uniqueue because all routes
                    //will be dependent on it.
                    api_endpoint:  '/',
                    // host: 'http://localhost:3000',
                    protocol: 'http',
                    port: 3000, //leave blank if not required?
                    domain: 'localhost',
                },
                kanban: {
                    api_endpoint:  '/api/kanban',
                    // host: 'http://localhost:3000',
                    protocol: 'http',
                    port: 3000, //leave blank if not required?
                    domain: 'localhost',
                },
                base_url: 'http://localhost',
                main_api_endpoint: '/api',
                login_endpoint: '/api/login'
            };
        }
        else {
            let prodDomainDefault = `api.russjohnsonio.icu`;
            obj = {
                default: {
                    protocol: 'https',
                    domain: prodDomainDefault,
                },
                notes: {
                    api_endpoint:  '/api/notes-api',
                    // host: 'http://localhost:3000',
                    protocol: 'https',
                    // port: 3000, //leave blank if not required?
                    domain: prodDomainDefault,
                },
                auth: {
                    // api_endpoint:  '/api/auth',
                    ////authorization will have root access and is responsible
                    //for its own router. It is uniqueue because all routes
                    //will be dependent on it.
                    api_endpoint:  '/',
                    // host: 'http://localhost:3000',
                    protocol: 'https',
                    // port: 3000, //leave blank if not required?
                    domain: prodDomainDefault,
                },
                kanban: {
                    api_endpoint:  '/api/kanban',
                    // host: 'http://localhost:3000',
                    protocol: 'https',
                    // port: 3000, //leave blank if not required?
                    domain: prodDomainDefault,
                },
            };
        }


        if (obj[api_name])
        {
            return obj[api_name];
            // return process.env.REACT_APP_API_ENV;
        }
        else {
            let result = Object.assign({},obj[`default`],
                {
                    api_endpoint: `/api/${api_name}`
                }
            );
            return result;

        }


    }


    //REACT_APP_API_ENV
    static getProcessEnv()
    {
        return process.env;
        // if (process.env.REACT_APP_ENV === 'prod') {
        //     return {
        //         'API_URL': 'https://api.russjohnson.us',
        //         'DEBUG': false,
        //     }
        // }
        // else {
        //     return {
        //         'API_URL': 'http://localhost:8000',
        //         'DEBUG': false,
        //         // 'API_URL': 'https://api.russlikesto.party'
        //     }
        // }
    }

    static get(name)
    {
        return this.getEnv()[name];
    }
}



export default EnvHelper
