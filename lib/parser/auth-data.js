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

module.exports = {
    extractAuthData
};