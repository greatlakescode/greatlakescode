const path = require('path');
const fs = require('fs');

export default class BaseFileWriter
{

    static baseDirectory = process.env._GREATLAKESCODE_TMP_PATH;

    new_file;


    constructor(public filename)
    {

    }




    //filename without full path
    static async initSimpleFilename(simpleFilename,baseDirectory?)
    {
        let self = this;
        baseDirectory = baseDirectory || process.env._GREATLAKESCODE_TMP_PATH;
        console.log(`initSimpleFilename`,simpleFilename,baseDirectory);
        let filename = path.resolve(baseDirectory,simpleFilename);

        let obj = new self(filename);

        return obj;
    }


    static async exists(filepath)
    {
        console.log(`BaseFileWriter->exists`,filepath);
        try {
            console.log(`BaseFileWriter->exists check`,filepath);
            let result = fs.existsSync(filepath);
            console.log(`BaseFileWriter->exists check`,result);
            return result;
        }
        catch (e)
        {
            console.log(`error checking file exists`)
            return false;
        }
    }


    async populateFD()
    {
        console.log(`populateFD`,this.filename);
        let file_exists = await BaseFileWriter.exists(this.filename);
        this.new_file = !file_exists;
        console.log(`got file exists`,this.new_file);

        let self = this;


        let promise = new Promise((r) => {
            fs.open(self.filename, 'w',
                function(err, fd) {
                    return r({err,fd});
                    // if (err) {
                    //     return r({err,fd});
                    // }
                    // r();
                });
        });
        let result:any = await Promise.resolve(promise);

        let {fd,err} = result;
        console.log(`error`,err);
        if (err)
        {
            throw new Error("failed to open file " + err );
        }
        else {
            self.fd = fd;
        }
    }


    protected fd;


    async getFD()
    {
        if (this.fd === undefined)
        {
            try {
                await this.populateFD();

            }
            catch (e)
            {
                console.error(`failed to get file`);
                throw e;
            }
        }
        return this.fd;
    }


//     var path = 'public/uploads/file.txt',
//     buffer = new Buffer("some content\n");
//
//     fs.open(path, 'w', function(err, fd) {
//     if (err) {
//         throw 'error opening file: ' + err;
//     }
//
//     fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//         if (err) throw 'error writing file: ' + err;
//         fs.close(fd, function() {
//             console.log('file written');
//         })
//     });
// });
    async write(str)
    {
        let fd = await this.getFD();
        return new Promise(async (r) => {
            fs.write(fd,str, (err) => {
                return r();
            });
    //             fs.write(fd, buffer, 0, buffer.length, null, function(err) {
    //     if (err) throw 'error writing file: ' + err;
    //     fs.close(fd, function() {
    //         console.log('file written');
    //     })
    // });
        })
    }


    async writeData(str)
    {
        return this.write(str);
    }


}