const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config({ path: ".env.local", debug: true });
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

class QuestionService {

    #model;
    #modelChat;

    constructor() {
        this.#model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are IELTS test developer. 
                Format your response as an HTML essay. 
                Use headings, paragraphs, and HTML tags limited to (<h4>, <p>, <b>, <i>) to style the text. 
                Only give necessary output`,
        })

        this.#modelChat = this.#model.startChat({
            history: [],
        });
    }

    async writingTask() {
        const prompt =
            "Write a IELTS Academic writing task 2 instruction, enclose it with <ins> tag";

        const result = await this.#modelChat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(response);
        console.log(text);

        return text;
    }

    async writingSample() {
        const prompt =
            "Write a sample answer for the generated instruction, enclose it with <ans> tag";

        const result = await this.#modelChat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(response);
        console.log(text);
        console.log(this.#modelChat);

        return text;
    }

    async writingEvaluate(essay) {
        const prompt =
            "Evaluate this essay for the generated instruction based on IELTS rubrics: " + essay;

        const result = await this.#modelChat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(response);
        console.log(text);
        console.log(this.#modelChat);

        return text;
    }
}

module.exports = {
    QuestionService
}
