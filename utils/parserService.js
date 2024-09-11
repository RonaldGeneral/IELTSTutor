// Parse response from api

const cheerio = require('cheerio');

class ParserService {

    constructor(){}

    parseTag(input, tag) {
        const $ = cheerio.load(input);
        const output = $(tag).html();

        return output;
    }

    parseJSON(input) {
        let startIndex = input.indexOf('{');
        if (startIndex === -1) {
            console.error('No JSON object found in the string.');
            return null;
        }

        let braceCounter = 0;
        let endIndex = startIndex;

        for (let i = startIndex; i < input.length; i++) {
            if (input[i] === '{') {
                braceCounter++;
            } else if (input[i] === '}') {
                braceCounter--;
            }

            // When braceCounter reaches 0, we've found the full JSON object
            if (braceCounter === 0) {
                endIndex = i;
                break;
            }
        }

        if (braceCounter !== 0) {
            console.error('Mismatched curly braces in the input string.');
            return null;
        }

        // Extract the potential JSON substring
        let jsonString = input.slice(startIndex, endIndex + 1);

        // Regular expression to properly quote object keys (unquoted JSON-like syntax)
        jsonString = jsonString.replace(/([{,]\s*)([a-zA-Z_]\w*)(\s*:)/g, '$1"$2"$3');

        try {
            // Parse the extracted and fixed JSON string
            const jsonObject = JSON.parse(jsonString);
            return jsonObject;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }

    }
}

module.exports = {
    ParserService
}
