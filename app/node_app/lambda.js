let error;

//lambda entry point. Most of the time a class or file will be called from here.
function handler (event,context,callback)
{
    console.log(`call made to handler`);
    callback(error,'Success');
}

function hello_world (event,context,callback)
{
    require('./lambda/hello_world')({
        event,context,callback
    });
}

exports.hello_world = hello_world;
exports.handler = handler;

//
//
// if (require.main === module) {
//     (async function () {
//         try {
//
//             hello_world();
//
//         } catch (e) {
//
//             console.error(e.message,e);
//             setTimeout(() => {
//                 process.exit(1)
//             },1000);
//
//         }
//     })();
// }