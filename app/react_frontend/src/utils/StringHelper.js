export default class StringHelper {

    //https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    static toProperCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() +
                txt.substr(1).toLowerCase();
        });
        // String.prototype.toProperCase = function () {
        //     return this.
    }


    static underscoreToHumanReadable(str)
    {
        str = str.replace(/_/g,' ');
        return this.toProperCase(str);
    }
}