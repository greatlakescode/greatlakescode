
module.exports = async function (opts) {

    opts = opts || {};
    let callback = opts.callback || function () {};
    console.log(`hello_world`);

    callback();
};
