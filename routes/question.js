const express = require("express")
const router = express.Router()
const QuestionService = require("../utils/questionService").QuestionService;
const ParserService = require("../utils/parserService").ParserService;

const questionService = new QuestionService();
const parserService = new ParserService();

router.post("/writing", async (req, res) => {
    // let text = await questionService.writingTask();
    // let parsed = parserService.parseTag(text, "ins");
    let parsed = "Insttttttttttttttttt";

    res.render("writing", {
        task2_question: parsed,
    });
})

router.post("/writing/getAnswer", async (req, res) => {
    // let text = await questionService.writingSample();
    // let parsed = parserService.parseTag(text, "ans");
    let parsed = "Answww";
    if(req.body && req.body.task == "task2") {
       
        res.json({
            data: parsed,
        });
    } else {
        res.sendStatus(403);
    }
})

module.exports = router