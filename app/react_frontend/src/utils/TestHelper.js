export default class TestHelper {

    //https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    static async wait(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        })
    }

}