const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config({ path: ".env.local" , debug: true});
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

class QuestionService {
    
    async test() {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
        const prompt = 
            "Write a motivation speech to help me sleep.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    }
}



