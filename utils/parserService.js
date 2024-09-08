// Parse response from api

const cheerio = require('cheerio');

class ParserService {

    constructor(){}

    parseWriting(input) {
        const $ = cheerio.load(input);
        const ins = $('ins').html();
        const ans = $('ans').html();

        return {instruction: ins, answer: ans};
    }
}

module.exports = {
    ParserService
}
