const dotenv = require("dotenv");
const { GoogleGenerativeAI, TaskType } = require("@google/generative-ai");

dotenv.config({ path: ".env.local", debug: true });
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

class QuestionService {

    #modelTask;
    #modelEvaluate;

    constructor() {
        this.#modelTask = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are IELTS test developer. 
                Format your response as an HTML essay. 
                Use properly enclosed HTML tags limited to (<h4>, <p>, <b>, <i>) to style the text.  Provide word limit in task instruction.
                When generating IELTS task instruction and sample answer, enclose task instruction with <ins> tag and answer with <ans> tag.`,
        })

        this.#modelEvaluate = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are IELTS test marker. 
                Format your response as an HTML essay. 
                Use headings, paragraphs, and HTML tags limited to (<h4>, <p>, <b>, <i>) to style the text. 
                Evaluate students' essay based on IELTS rubrics, score it from 0 - 9 with increment of 0.5, and analyse 3 - 6 weaknesses of the essay. 
                Use easy to understand English vocabulary.
                Your response must be a valid JSON object with following schema:

                overall: overall score,
                task: score of task achievement/response criteria,
                cohesion: score of coherence and cohesion criteria,
                lexical : score of lexical resource criteria,
                grammar: score of Grammatical range and accuracy criteria,
                weakness: an array of weaknesses`,
        })
    }

    async writingTask(taskType) {
        const prompt =
            "Write a " + taskType + " instruction and sample answer.";

        const result = await this.#modelTask.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(response);
        console.log(text);

        return text;
    }

    async writingEvaluate(question, essay, taskType) {
        const prompt =  "Given one instruction of " + taskType + " enclosed with <ins> tag, Evaluate the student response given enclosed with <ans> tag based on the instruction."
            + " \n\n<ins>"+ question + "</ins> \n\n <ans>" + essay + "</ans>";

        const result = await this.#modelEvaluate.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(response);
        console.log(text);

        return text;
    }
}

module.exports = {
    QuestionService
}
