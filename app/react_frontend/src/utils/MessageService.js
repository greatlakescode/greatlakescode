import Noty from 'noty';

//https://stackoverflow.com/questions/38518278/how-to-use-jquery-on-reactjs
// import $ from 'jquery';

export default class MessageService
{
    static error(text,opts = {timeout : 1500,type: 'error'})
    {
        opts = Object.assign({text},opts);
        console.log('noty message');
        new Noty(opts).show();
        console.error(text);
    }
    static warn(text,opts = {timeout : 1500,type: 'warning'})
    {
        opts = Object.assign({text},opts);
        console.log('noty message');
        new Noty(opts).show();
        console.warn(text);
    }

    static success(text,opts = {timeout : 1500,type: 'success'})
    {
        opts = Object.assign({text},opts);
        console.log('noty message');
        new Noty(opts).show();
        console.warn(text);
    }

    //https://ned.im/noty/#/confirm
    //https://ned.im/noty/v2/confirmations.html
    static async confirmWithInput(text, defaultVal)
    {
        let response = {
            confirm: false,
            data: {}
        };
        defaultVal = defaultVal || 10;
        console.log(`window`,window,window.$);
        let $ = window.$;
        // window.jQuery
        return new Promise((r) => {
            let n = new Noty({
                text: text + ' <input' +
                    ' id="noty_confirm_1" type="text" ' +
                    ' value="' + defaultVal + '">',
                //  closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                closeWith: [],
                buttons: [
                    Noty.button('CONFIRM', 'btn btn-success', function () {
                        console.log('button 1 clicked');
                        response.confirm = true;

                        // r({
                        //     confirm: true,
                        //     data: {}
                        // });
                        n.close();
                    }, {id: 'button1', 'data-status': 'ok'}),

                    Noty.button('CANCEL', 'btn btn-error', function () {
                        console.log('button 2 clicked');
                        response.confirm = false;
                        // r({
                        //     confirm: false,
                        //     data: {}
                        // });
                        n.close();
                    })
                ],
                callbacks: {
                    onClose: function() {
                        response.data = $("#noty_confirm_1").val();
                        console.log(`onClose`);
                        r(response);
                    }
                }
            });
            n.show();

            // opts.text = text;


            // let noty = new Noty(opts).show();

        });

    }

    // static confirmOk(text,input = true,opts = {})

    static debug(msg)
    {
        console.log(msg);
    }

    static log(obj,opts = {timeout : 1000,type: 'success'})
    {
        console.log(`log: ${obj.message}`);
        console.debug('log',obj);

        if (obj.level === 'error')
        {
            let opts = {timeout : 1000,type: 'error'};
            let text = obj.message;
            opts = Object.assign({text},opts);
            new Noty(opts).show();
        }
        // else {
        // }

    }
}