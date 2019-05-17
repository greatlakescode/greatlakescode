var securePin = require("secure-pin");

// https://github.com/ozouai/node-secure-pin

export default class PinGenerator
{


    static async generatePin(pinLength)
    {
        return new Promise(r => {
            securePin.generatePin(pinLength, (pin)=> {
                console.log("Pin: " + pin);
                r(pin);
            })
        })
    }



}