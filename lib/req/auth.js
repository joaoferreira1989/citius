const rp = require('request-promise');
const { extractAuthData } = require('../parser/auth-data');
const { fetchDocsByDate } = require('../req/docs');

function getAuthData() {
    const options = {
        method: 'GET',
        url: 'https://www.citius.mj.pt/portal/consultas/ConsultasCire.aspx'
    };

    return rp(options)
        .then(function (response) {
            const authData = extractAuthData(response);

            return fetchDocsByDate('01-01-2018', '01-01-2018', authData);
        })
        .catch(function (err) {
            console.error('Auth Error', err);
        });
}

module.exports = {
    getAuthData
};