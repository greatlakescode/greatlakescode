
const exec = require('child_process').exec;

interface ExecuteResponse
{
    error,
    stdout,
    stderr
}

export default class CmdHelper
{

    static async execute(cmd):Promise<ExecuteResponse>
    {
        console.log(`execute ${cmd}`);
        return (async ():Promise<any>  => {
            return new Promise((resolve,reject) => {
                let child = exec(cmd, function (error, stdout, stderr) {

                    if (error)
                    {
                        // logger.error(error);
                        return                 reject({
                            error:error,
                            stdout: stdout,
                            stderr: stderr
                        })
                    }

                    console.log('stdout: ' + stdout);
                    console.error('stderr: ' + stderr);

                    resolve({
                        error:error,
                        stdout: stdout,
                        stderr: stderr
                    })
                });
            })
        })();

    }


    static async getNodeVersion()
    {
        // rm -R 1534556459689/
        return this.execute(`node -v`);
    }

};

