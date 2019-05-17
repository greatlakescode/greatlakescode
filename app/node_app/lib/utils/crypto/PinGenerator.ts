var securePin = require("secure-pin");

// https://github.com/ozouai/node-secure-pin

export default class PinGenerator
{


    static async generatePin(length)
    {
        return new Promise(r => {
            securePin.generatePin(4, (pin)=> {
                console.log("Pin: " + pin);
                r(pin);
            })
        })
    }



}