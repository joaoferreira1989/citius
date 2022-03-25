function getCitiusUrl() {
    const baseURL = 'https://www.citius.mj.pt'
    const endpoint = '/portal/consultas/ConsultasCire.aspx';

    return new URL(endpoint, baseURL);
}

module.exports = {
    getCitiusUrl
};