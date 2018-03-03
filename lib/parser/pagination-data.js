const cheerio = require('cheerio');
const parseConfig = {
    decodeEntities: false
};

function extractTotalPages(data) {
    const $ = cheerio.load(data, parseConfig);
    const pagesNr = $('#divresultadocdital').children().html();
    parsedPagesNr = pagesNr.trim().replace(' documentos encontrados para a pesquisa efectuada', '');

    const totalResults = parseInt(parsedPagesNr) || 0;
    const totalPages = Math.ceil(totalResults / 10);

    return totalPages;
}

module.exports = {
    extractTotalPages
};