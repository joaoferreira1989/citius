const rp = require('request-promise');
const { extractAuthData } = require('../parser/auth-data');
const { fetchDocsByDateAndAct } = require('../req/docs');
const { getDatesByInterval } = require('../tools/date-helper');
const actsList = [
    'Pub. - Sentença Declaração Insolvência',
    'Pub. - Destituição / Nomeação Administrador',
    'Pub. - Nomeação Administrador Provisório'
];

function doFetch(initialDate, finalDate) {
    const options = {
        method: 'GET',
        url: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx'
    };

    return rp(options)
        .then(function (response) {
            const authData = extractAuthData(response);
            const datesList = getDatesByInterval(initialDate, finalDate);
            const promiseList = datesList.reduce((acc, date) => {
                acc.push(fetchDocsByDateAndAct(date, date, authData, actsList[0]));
                acc.push(fetchDocsByDateAndAct(date, date, authData, actsList[1]));
                acc.push(fetchDocsByDateAndAct(date, date, authData, actsList[2]));

                return acc;
            }, []);

            return Promise.all(promiseList);
        })
        .catch(function (err) {
            console.error('Auth Error', err);
        });
}

module.exports = {
    doFetch
};