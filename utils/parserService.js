// Parse response from api

const cheerio = require('cheerio');

class ParserService {

    constructor(){}

    parseTag(input, tag) {
        const $ = cheerio.load(input);
        const output = $(tag).html();

        return output;
    }
}

module.exports = {
    ParserService
}
