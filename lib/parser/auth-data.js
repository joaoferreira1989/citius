const cheerio = require('cheerio');

function extractAuthData(data) {
    const $ = cheerio.load(data);
    return {
        __EVENTVALIDATION: $('#__EVENTVALIDATION').val(),
        __VIEWSTATEENCRYPTED: $('#__VIEWSTATEENCRYPTED').val(),
        __VIEWSTATEGENERATOR: $('#__VIEWSTATEGENERATOR').val(),
        __VIEWSTATE: $('#__VIEWSTATE').val()
    };
}

function extractAjaxAuthData(data) {
    const __EVENTVALIDATION = data.match(/__EVENTVALIDATION\|([^\|]+)[\|]/);
    const __VIEWSTATEENCRYPTED = data.match(/__VIEWSTATEENCRYPTED\|([^\|]+)[\|]/);
    const __VIEWSTATEGENERATOR = data.match(/__VIEWSTATEGENERATOR\|([^\|]+)[\|]/);
    const __VIEWSTATE = data.match(/__VIEWSTATE\|([^\|]+)[\|]/);

    return {
        __EVENTVALIDATION: __EVENTVALIDATION ? __EVENTVALIDATION[1] : undefined,
        __VIEWSTATEENCRYPTED: __VIEWSTATEENCRYPTED ? __VIEWSTATEENCRYPTED[1] : undefined,
        __VIEWSTATEGENERATOR: __VIEWSTATEGENERATOR ? __VIEWSTATEGENERATOR[1] : undefined,
        __VIEWSTATE: __VIEWSTATE ? __VIEWSTATE[1] : undefined
    };
}

module.exports = {
    extractAuthData,
    extractAjaxAuthData
};