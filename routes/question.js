const express = require("express")
const router = express.Router()
const QuestionService = require("../utils/questionService").QuestionService;
const ParserService = require("../utils/parserService").ParserService;

let task2_question = "Some people believe that advertising has a negative impact on society. Others argue that it is a valuable tool for businesses and consumers. Discuss both views and give your own opinion. Write at least 250 words.";

router.post("/writing", async (req, res) => {
    // const questionService = new QuestionService();
    // const parserService = new ParserService();
    // let text = await questionService.writingtask();
    // let parsed = parserService.parseWriting(text);

    res.render("writing", {
        task2_question: parsed.instruction,
        task2_answer: parsed.answer,
    });
})

// router.post('/:id', (req, res) => {
//     res.send(`Get user with id ${req.params.id}`)
// })

module.exports = router