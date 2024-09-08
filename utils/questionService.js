const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config({ path: ".env.local" , debug: true});
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

class QuestionService {

    async writingtask() {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", 
            systemInstruction: "You are IELTS test developer. Format your response as an HTML essay. Use headings, paragraphs, and HTML tags limited to (<h4>, <p>, <b>, <i>) to style the text. Only give necessary output",
        })
        const prompt = 
            "Write a IELTS Academic writing task 2 instruction and sample answer, enclose instruction with <ins> tag and answer with <ans> tag.";

        const result = await model.generateContent(prompt);
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
