const express = require("express")
const router = express.Router()
const QuestionService = require("../utils/questionService").QuestionService;
const ParserService = require("../utils/parserService").ParserService;

const questionService = new QuestionService();
const parserService = new ParserService();

router.post("/", async (req, res) => {
    let taskType = "IELTS Academic Writing Task 2";
    // let text = await questionService.writingTask(taskType);
    // let instruction = parserService.parseTag(text, "ins");
    // let answer = parserService.parseTag(text, "ans");
    let instruction = "Insttttttttttttttttt";
    let answer = "answerrrrrrrrrrrrrrrrrrrrrrrrr";
    
    res.render("writing", {
        instruction, answer, taskType
    });
})

router.post("/getEvaluate", async (req, res) => {
    if(!req.body || !req.body.instruction || !req.body.answer || !req.body.taskType ||
        (req.body.answer.length <= 0) ) {
            res.sendStatus(404);
            return;
    } 
        
    // let text = await questionService.writingEvaluate(req.body.instruction, req.body.answer, req.body.taskType);
    // let parsed = parserService.parseJSON(text);
    let parsed = {
        "overall": 7.5,
        "task": 7,
        "cohesion": 7.5,
        "lexical": 7,
        "grammar": 7.5,
        "weakness": [
            "The introduction is a bit too long and could be more concise.",
            "Some sentences are unnecessarily complex and could be simplified for better clarity.",
            "The essay lacks a clear and strong thesis statement. While the author states their opinion, it could be more explicitly stated in the introduction.",
            "The examples used could be more specific and engaging. For instance, instead of mentioning a tea ceremony, the essay could mention a specific type of tea ceremony or a famous teahouse in Japan.",
            "The conclusion could be stronger and more impactful. The author could reiterate their main points and provide a more concise and definitive statement about the benefits of travel."
        ]
    }; await new Promise((resolve) => {setTimeout(resolve, 1000);});
       
    
    res.json({
        data: parsed,
    });
})

module.exports = router