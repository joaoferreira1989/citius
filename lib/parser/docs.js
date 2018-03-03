const cheerio = require('cheerio');
const parseConfig = {
    decodeEntities: false
};

function extractDocs(data) {
    const $ = cheerio.load(data, parseConfig);
    const resultsList = $('.resultadocdital');
    const parsedResults = [];

    for (let i = 0; i < 1/*resultsList.length*/; i++) {
        parsedResults.push(parseAct(i, resultsList[i]));
    }

    console.log(JSON.stringify(parsedResults[0][0].name, null, 4));
    return parsedResults;
}

function parseAct(index, doc) {
    const $ = cheerio.load(doc, parseConfig);
    const peopleData = $('#ctl00_ContentPlaceHolder1_dlResultados_ctl0' + index + '_InterDataList');

    return parsePeople(peopleData);
}

function parsePeople(peopleData) {
    const people = [];

    peopleData.children().each((index, elem) => {
        let peopleInfo = cheerio(elem, parseConfig).text();

        let parsedInfo = peopleInfo.split('\n');
        let person = {
            post: parsedInfo[1] ? parsedInfo[1].trim().replace(':', '') : undefined,
            name: parsedInfo[2] ? parsedInfo[2].trim() : undefined,
            nif: parsedInfo[3] ? parsedInfo[3].trim().replace('NIF/NIPC:', '') : undefined
        };

        if (person.post) {
            people.push(person);
        }
    });

    return people;
}

module.exports = {
    extractDocs
};
