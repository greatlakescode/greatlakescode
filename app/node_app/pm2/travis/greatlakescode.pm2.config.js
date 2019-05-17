
let index = __dirname + './../../index.js';

module.exports = {
    apps: [
        {
            //https://github.com/twitter/twemproxy/issues/6
            //this is forked meaning it should not have duplicate cron jobs
            //or create a way to lock running crons where duplicates should not be allowed.
            name: 'greatlakescode_app',
            "script": index,
            min_uptime: "1m",
            max_restarts: "10",
            restart_delay: (1000 * 10), //ten second delay for restarts

            "kill_timeout": (1000 *  60), //ten seconds to complete exiting
            "listen_timeout": 1000 * 60, //five seconds to start up

            //any non-sensitive environment variables should be stored here by default
            env: {
                COMMON_VARIABLE: 'true',
                "NODE_ENV": "dev",
                "GREATLAKESCODE_PORT": "3000"
            },
        }
    ]

};