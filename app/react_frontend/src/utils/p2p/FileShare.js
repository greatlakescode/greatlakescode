import RequestHelper from '../RequestHelper'

//https://github.com/sffc/socketio-file-upload
export default class FileShare
{

    //https://www.educba.com/websockets-vs-webrtc/
    //https://stackoverflow.com/questions/18799364/webrtc-vs-websockets-if-webrtc-can-do-video-audio-and-data-why-do-i-need-web

    //I will setup my api with a master peer if that makes sense to handle the api requests.


    //TURN and STUN. Make sure that the TURN server is trusted.

    //Make sure that the peer you are connecting to is trusted.


    //Math.random() + ""
    //give a public key and send an encrypted random string. If the server responds with the correct
    //string as plain text it has the private key.


    //https://webrtc-security.github.io/




    requestHelper = RequestHelper.getInstance(`p2p`);


    //create peer connection to host server.
    //host server will always be at id ...

    //allow use of socket connections or traditional apis.



}
