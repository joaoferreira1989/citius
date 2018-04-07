const rp = require('request-promise');
const { extractAuthData, extractAjaxAuthData } = require('../parser/auth-data');
const { extractDocs } = require('../parser/docs');
const { extractTotalPages } = require('../parser/pagination-data');

function fetchDocsByDateAndAct(initialDate, finalDate, initialAuthData, act) {
    const initialOptions = buildRequestOptions(initialDate, finalDate, initialAuthData, act);

    return requestPage(initialOptions, function (response) {
        // Current page data
        let currentPage = 1;
        const docs = extractDocs(response);
        const pagesNr = extractTotalPages(response);

        return requestNextPages(docs, currentPage, pagesNr, response, initialDate, finalDate, act);
    });
}

function requestNextPages(docs, currPage, maxPage, previousPageResponse, initialDate, finalDate, act) {
    if (currPage > maxPage) {
        return Promise.resolve(docs);
    }

    // Extract info for next request
    const authData = extractAjaxAuthData(previousPageResponse);
    const options = buildRequestOptions(initialDate, finalDate, authData, act);
    const nextPageOptions = buildNextPageOptions(options);

    // Print request pagination info
    console.log(initialDate + '[' + act.substring(7, 12) + ']: ' +currPage + ' of ' + maxPage);

    return requestPage(nextPageOptions, function (nextPageResponse) {
        if (currPage < maxPage) {
            const newDocs = extractDocs(nextPageResponse);

            docs = docs.concat(newDocs);
            currPage = currPage + 1;

            return requestNextPages(docs, currPage, maxPage, nextPageResponse, initialDate, finalDate, act);
        }
        return docs;
    });
}

function requestPage(options, successCallback) {
    return rp(options)
        .then(successCallback)
        .catch(function (err) {
            console.error('Request Page error', err);
        });
}

function buildRequestOptions(initialDate, finalDate, authData, act) {
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
            'ctl00$ContentPlaceHolder1$ddlActos': act,
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

function buildNextPageOptions(options) {
    const nextPageOptions = Object.assign({}, options);

    nextPageOptions.form['ctl00$ContentPlaceHolder1$ScriptManager1'] = 'ctl00$ContentPlaceHolder1$upResultados|ctl00$ContentPlaceHolder1$Pager1$lnkNext';
    nextPageOptions.form.__EVENTTARGET = 'ctl00$ContentPlaceHolder1$Pager1$lnkNext';
    nextPageOptions.form.__VIEWSTATEENCRYPTED = '';
    delete nextPageOptions.form['ctl00$ContentPlaceHolder1$btnSearch'];

    return nextPageOptions;
}

module.exports = {
    fetchDocsByDateAndAct
};