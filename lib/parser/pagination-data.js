const cheerio = require('cheerio');
const parseConfig = {
    decodeEntities: false
};

function extractPaginationData(data) {
    const $ = cheerio.load(data, parseConfig);

    return {
        nextPage: $('#ctl00_ContentPlaceHolder1_Pager1_btnNextPage').attr('name'),
        lastPage: $('#ctl00_ContentPlaceHolder1_Pager1_btnLastPage').attr('name')
    }
}

module.exports = {
    extractPaginationData
};