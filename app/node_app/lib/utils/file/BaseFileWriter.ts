const path = require('path');
const fs = require('fs');

export default class BaseFileWriter
{

    static baseDirectory = process.env._RUSSJOHNSONIO_TMP_PATH;


    constructor(protected filename)
    {

    }


    //filename without full path
    static async initSimpleFilename(simpleFilename,baseDirectory?)
    {
        let self = this;
        baseDirectory = baseDirectory || process.env._RUSSJOHNSONIO_TMP_PATH;
        console.log(`initSimpleFilename`,simpleFilename,baseDirectory);
        let filename = path.resolve(baseDirectory,simpleFilename);

        let obj = new self(filename);

        return obj;
    }


    async populateFD()
    {
        let self = this;
        return new Promise((r) => {
            fs.open(self.filename, 'w',
                function(err, fd) {
                    if (err) {
                        throw 'error opening file: ' + err;
                    }
                    self.fd = fd;
                    r();
                });
        });
    }


    protected fd;


    async getFD()
    {
        if (this.fd === undefined)
        {
            await this.populateFD();
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