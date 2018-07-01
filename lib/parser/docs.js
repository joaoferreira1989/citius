const cheerio = require('cheerio');
const { PEOPLE_TYPES } = require('../tools/constants');
const parseConfig = {
    decodeEntities: false
};

function extractDocs(data) {
    const $ = cheerio.load(data, parseConfig);
    const resultsList = $('.resultadocdital');
    const parsedResults = [];
    const processNumbers = new Set();

    for (let i = 0; i < resultsList.length; i++) {
        const act = parseAct(i, resultsList[i]);

        // Remove duplicated process numbers that are duplicated on the portal
        if (!processNumbers.has(act.process.processDetails.number)) {
            processNumbers.add(act.process.processDetails.number);
            parsedResults.push(act);
        }
    }

    //console.log(JSON.stringify(parsedResults[0].people[0].name, null, 4));
    //console.log(JSON.stringify(parsedResults, null, 4))
    return parsedResults;
}

function parseAct(index, doc) {
    const $ = cheerio.load(doc, parseConfig);
    const peopleData = $('#ctl00_ContentPlaceHolder1_dlResultados_ctl0' + index + '_InterDataList');
    const processHtml = $.html();

    return {
        process: parseProcess(processHtml),
        people: parsePeople(peopleData)
    };
}

function parseProcess(processHtml) {
    processHtml = processHtml.substr(30, processHtml.indexOf('<span id="ctl00'));

    const processElement = cheerio.load(processHtml, parseConfig);
    const processText = processElement.text();
    let processInfo = processText.split('\n');
    const processedInfo = processInfo.reduce((acc, line) => {
        const processedLine = line.trim();

        if (processedLine) {
            acc.push(processedLine);
        }
        return acc;
    }, []);

    const court = processedInfo[1] || undefined;
    const act = processedInfo[2] ? processedInfo[2].replace('Ato:', '').trim() : undefined;
    const reference = processedInfo[3] ? processedInfo[3].replace('Referência:', '').trim() : undefined;
    const species = processedInfo[6] || undefined;
    const date = processedInfo[8] ? processedInfo[8] : undefined;

    const processData = processedInfo[4] ? processedInfo[4].replace('Processo:', '').trim() : '';
    const processParsedCommas = processData.split(',');
    const processParsedSpaces = processParsedCommas[processParsedCommas.length - 1].split(' ');
    const judgement = processParsedSpaces[processParsedSpaces.length - 1];
    const processDetails = {
        number: processParsedCommas[0],
        place: processParsedCommas[1].trim(),
        judgement: /^[0-9]+$/.test(judgement) ? judgement : ''
    };

    return {
        court,
        act,
        reference,
        processDetails,
        species,
        date
    }
}

function parsePeople(peopleData) {
    const people = [];

    peopleData.children().each((index, elem) => {
        let peopleInfo = cheerio(elem, parseConfig).text();
        let parsedInfo = peopleInfo.split('\n');
        let person = {
            title: parsedInfo[2] ? parsedInfo[2].trim().replace(':', '') : undefined,
            name: parsedInfo[3] ? parsedInfo[3].trim() : undefined,
            nif: parsedInfo[4] ? parsedInfo[4].trim().replace('NIF/NIPC:', '') : undefined
        };

        if (person.title && person.nif && person.nif !== '') {
            people.push(person);
        }
    });

    return identifyPeople(people);
}

function identifyPeople(people) {
    return people.map((person) => {
        const newPerson = Object.assign({}, person);

        switch (newPerson.title) {
            case 'Devedor':
                newPerson.type = PEOPLE_TYPES.DEVEDOR;
                break;
            case 'Administrador Insolvência':
                newPerson.type = PEOPLE_TYPES.ADMINISTRADOR_INSOLVENCIA;
                break;
            case 'Credor':
                newPerson.type = PEOPLE_TYPES.CREDOR;
                break;
            case 'Insolvente':
                newPerson.type = PEOPLE_TYPES.INSOLVENTE;
                break;
            case 'Requerente':
                newPerson.type = PEOPLE_TYPES.REQUERENTE;
                break;
            default:
                newPerson.type = PEOPLE_TYPES.UNKNOWN;
        }

        return newPerson;
    });
}

module.exports = {
    extractDocs
};