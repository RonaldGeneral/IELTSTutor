const dotenv = require("dotenv");
const { GoogleGenerativeAI, TaskType } = require("@google/generative-ai");

dotenv.config({ path: ".env.local", debug: true });
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const readingTaskInst = {
    "IELTS Academic Reading Multiple Choice": `You are IELTS test developer. 
Format your response as an HTML essay using properly enclosed HTML tags limited to (<h4>, <p>, <b>, <i>) to style the text.  
Instruction:
1. Generate a concise article on an IELTS-appropriate topic. Aim for a length of 300-500 words.
2. Create 3-8 multiple-choice questions based on the article. Prioritize questions that test main ideas, details, inferences, and evaluative skills.
3. Provide 4 answer options for each question. Keep options clear, concise, and relevant.
4. Determine the correct answer and provide a brief explanation referencing the article.

Output as valid JSON format:
{
  "article": "<article text>",
  "questions": [
    {
      "question": "<question>",
      "options": ["<option 1>", "<option 2>", "<option 3>", "<option 4>"],
      "answer": "<correct option number>",
      "explanation": "<brief explanation>"
    },
    // ... more questions
  ]
}`,

    "IELTS Academic Reading Matching Headings": `You are IELTS test developer. 
Format your response as an HTML essay using properly enclosed HTML tags limited to (<h4>, <p>, <b>, <i>, <ul>,<li>) to style the text.  
Instruction:
1. Generate a concise article on an IELTS-appropriate topic. Aim for a length of 300-500 words.
2. Divide the article into 4-6 paragraphs with clear themes and label each paragraphs at the start with alphabet such as "<b>A. </b>".
3. Create 5-7 headings that accurately summarize the main ideas. Include distractors.
4. Randomize the headings. Keep article and headings concise. Avoid overly broad or specific headings.
5. Ensure logical connections between headings and paragraphs. 

Output as valid JSON format:
{
  "article": "<article text>",
  "headings": ["<heading 1>", "<heading 2>", "<heading 3>", "<heading 4>"],
  "questions": [
    {
      "paragraph": "<paragraph letter>",
      "answer": "<correct heading number in lowercase roman numbers>"
    },
    // ... more questions
  ]
}`,

"IELTS Academic Reading True/False/Not given":`You are IELTS test developer. 
Format your response as an HTML essay using properly enclosed HTML tags limited to (<h4>, <p>, <b>, <i>, <ul>,<li>) to style the text.  
Instruction:
1. Generate a concise article on an IELTS-appropriate topic. Aim for a length of 300-500 words.
2. Create 5-7 statements based on the article, covering key points. Focus on key points. Avoid overly broad or specific statements.
3. Randomize the statements. 
4. Keep article and statements concise. 
5. Provide brief explanations for answers.

Output as valid JSON format:
{
  "article": "<article text>",
  "statements": [
    {
      "statement": "<statement>",
      "answer": "true" | "false" | "not given",
      "explanation": "<brief explanation>"
    },
    // ...
  ]
}
}`,

"IELTS Academic Reading Sentence Completion":`You are IELTS test developer. 
Format your response as an HTML essay using properly enclosed HTML tags limited to (<h4>, <p>, <b>, <i>, <ul>,<li>) to style the text.  
Instruction:
1. Generate a concise article on an IELTS-appropriate topic. Aim for a length of 300-500 words.
2. Identify key points for sentence completion questions. 
3. Create 5-7 incomplete sentences with missing word or phrases that can be extract from the passage, fill the blank with "____".
4. Limit the blanks to have only 1 to 2 words. Contracted words are not allowed. Hyphenated words like ‘full-time’ counted as 1 word.
5. Avoid overly broad or specific blanks. Provide brief explanations.


Output as valid JSON format:
{
  "article": "<article text>",
  "sentences": [
    {
      "sentence": "<incomplete sentence>",
      "answer": "<correct word or phrase>",
      "explanation": "<brief explanation>"
    },
    // ...
  ]
}`,

}

class QuestionService {

    #modelTask;
    #modelEvaluate;

    constructor() {
    }

    async writingTask(taskType) {
        this.#modelTask = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are IELTS test developer. 
                Format your response as an HTML essay. 
                Use properly enclosed HTML tags limited to (<h4>, <p>, <b>, <i>) to style the text.  Provide word limit in task instruction.
                When generating IELTS task instruction and sample answer, enclose task instruction with <ins> tag and answer with <ans> tag.`,
        })

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

        const prompt =  "Given one instruction of " + taskType + " enclosed with <ins> tag, Evaluate the student response given enclosed with <ans> tag based on the instruction."
            + " \n\n<ins>"+ question + "</ins> \n\n <ans>" + essay + "</ans>";

        const result = await this.#modelEvaluate.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(response);
        console.log(text);

        return text;
    }

    async readingTask(taskType) {
        if(!readingTaskInst[taskType]) return

        this.#modelTask = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: readingTaskInst[taskType],
        })
        
        const prompt =
            "generate a set of "+taskType+" question";

        const result = await this.#modelTask.generateContent(prompt);
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
