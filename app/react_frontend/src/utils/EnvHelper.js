export default class EnvHelper {


    /**
     * pull in any environment variables set.
     * @returns {{API_URL: string, DEBUG: boolean}|{API_URL: string, DEBUG: boolean}}
     */
    static getEnv()
    {
        if (process.env.REACT_APP_ENV === 'prod') {
            return {
                'API_URL': 'https://api.russj.us',
                'DEBUG': false,
            }
        }
        else {
            return {
                'API_URL': 'http://localhost:9001',
                'DEBUG': false,
                // 'API_URL': 'https://api.russlikesto.party'
            }
        }
    }

}