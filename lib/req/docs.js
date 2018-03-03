var fs = require('fs');
const rp = require('request-promise');
const { extractAuthData, extractAjaxAuthData } = require('../parser/auth-data');
const { extractDocs } = require('../parser/docs');
const { extractPaginationData } = require('../parser/pagination-data');

function fetchDocsByDate(initialDate, finalDate, initialAuthData) {
    const initialOptions = buildRequestOptions(initialDate, finalDate, initialAuthData);

    return requestPage(initialOptions, function (response) {
        writeToFile(response);
        const authData = extractAjaxAuthData(response);
        const options = buildRequestOptions(initialDate, finalDate, authData);
        const lastPageOptions = Object.assign({}, options);

        //lastPageOptions.form['ctl00$ContentPlaceHolder1$ScriptManager1'] = 'ctl00$ContentPlaceHolder1$upResultados|ctl00$ContentPlaceHolder1$Pager1$btnLastPage';
        //lastPageOptions.form['ctl00$ContentPlaceHolder1$Pager1$btnLastPage.x'] = '4';
        //lastPageOptions.form['ctl00$ContentPlaceHolder1$Pager1$btnLastPage.y'] = '1';

        lastPageOptions.form['ctl00$ContentPlaceHolder1$ScriptManager1'] = 'ctl00$ContentPlaceHolder1$upResultados|ctl00$ContentPlaceHolder1$Pager1$lnkNext';
        lastPageOptions.form.__EVENTTARGET = 'ctl00$ContentPlaceHolder1$Pager1$lnkNext';
        lastPageOptions.form.__VIEWSTATEENCRYPTED = '';
        delete lastPageOptions.form['ctl00$ContentPlaceHolder1$btnSearch'];

        return requestPage(lastPageOptions, function (lastPageResponse) {
            extractPaginationData(lastPageResponse);
        });

        //return extractDocs(response);
    });
}

function writeToFile(str) {
    var date = new Date();
    fs.writeFile('./log/' + date.getTime() + '.txt', str, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

function requestPage(options, successCallback) {
    //console.log(JSON.stringify(options, null, 4));
    //console.log('\n------------------------------------------------------\n');
    return rp(options)
        .then(successCallback)
        .catch(function (err) {
            console.error('Request Page error', err);
        });
}

function buildRequestOptions(initialDate, finalDate, authData) {
    const {
        __EVENTVALIDATION,
        __VIEWSTATEENCRYPTED,
        __VIEWSTATEGENERATOR,
        __VIEWSTATE
    } = authData;
    const options = {
        method: 'POST',
        url: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx',
        headers: {
            Referer: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx',
            Connection: 'keep-alive',
            Cookie: 'ASP.NET_SessionId=bdrhjvzu5glisphxa5i4vmqo; displayCookieConsent=y; _pk_ref.70.0919=%5B%22%22%2C%22%22%2C1518952893%2C%22https%3A%2F%2Fl.messenger.com%2F%22%5D; _pk_id.70.0919=39949858b6b90a74.1518535699.4.1518952893.1518952893.',
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
            'Accept-Language': 'pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7,da;q=0.6,es;q=0.5,fr;q=0.4,gl;q=0.3,id;q=0.2,it;q=0.1,ro;q=0.1,ru;q=0.1,de;q=0.1,ceb;q=0.1',
            Origin: 'https://www.citius.mj.pt',
            Pragma: 'no-cache'
        },
        form: {
            'ctl00$ContentPlaceHolder1$txtCalendarDesde': initialDate,
            'ctl00$ContentPlaceHolder1$txtCalendarAte': finalDate,
            'ctl00$ContentPlaceHolder1$rbtlTribunais': 'False',
            'ctl00$ContentPlaceHolder1$btnSearch': 'Pesquisar',
            'ctl00$ContentPlaceHolder1$rblDias': 'todos',
            'ctl00$ContentPlaceHolder1$rblTipo': 'nif',
            'ctl00$ContentPlaceHolder1$ScriptManager1': 'ctl00$ContentPlaceHolder1$ScriptManager1|ctl00$ContentPlaceHolder1$btnSearch',
            __ASYNCPOST: 'true',
            __EVENTTARGET: '',
            __EVENTVALIDATION,
            __VIEWSTATEENCRYPTED,
            __VIEWSTATEGENERATOR,
            __VIEWSTATE,
            '': ''
        }
    };

    return options;
}

module.exports = {
    fetchDocsByDate
};