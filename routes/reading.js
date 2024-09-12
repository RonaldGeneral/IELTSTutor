const express = require("express")
const router = express.Router()
const QuestionService = require("../utils/questionService").QuestionService;
const ParserService = require("../utils/parserService").ParserService;

const questionService = new QuestionService();
const parserService = new ParserService();

const mc = {
    "article": "<h4>The Importance of Biodiversity</h4>\n<p>Biodiversity, the variety of life on Earth, is essential for a healthy planet and thriving human societies. It provides us with countless benefits, from food and medicine to clean air and water. However, human activities are causing a rapid decline in biodiversity, threatening the very foundations of our existence.</p>\n<p>One of the most significant threats is habitat loss. As humans expand their footprint, they destroy natural habitats, leaving countless species with nowhere to live. Deforestation, urbanization, and agricultural intensification are major drivers of habitat loss, leading to the extinction of numerous species.</p>\n<p>Climate change further exacerbates the problem. Rising temperatures, changing precipitation patterns, and extreme weather events disrupt ecosystems and force species to adapt or perish. Coral reefs, for example, are highly vulnerable to warming waters, bleaching and dying off at an alarming rate.</p>\n<p>The consequences of biodiversity loss are far-reaching. Loss of species can disrupt ecosystem services, such as pollination, pest control, and water purification. This can have a detrimental impact on food security, human health, and economic well-being.</p>\n<p>Protecting biodiversity is crucial for our future. We need to adopt sustainable practices that minimize our impact on the environment. This includes reducing our consumption, protecting natural habitats, and mitigating climate change. By taking action now, we can ensure a healthy and vibrant planet for generations to come.</p>",
    "questions": [
      {
        "question": "<b>What is the primary argument presented in the article?</b>",
        "options": [
          "Biodiversity is crucial for human well-being and a healthy planet.",
          "Climate change is the biggest threat to biodiversity.",
          "Human activities are destroying natural habitats, leading to biodiversity loss.",
          "Protecting biodiversity requires global cooperation and sustainable practices."
        ],
        "answer": "1",
        "explanation": "The article emphasizes the vital importance of biodiversity for human well-being and a healthy planet, highlighting the threats it faces and the need for conservation."
      },
      {
        "question": "<b>Which of the following is NOT mentioned as a major driver of habitat loss?</b>",
        "options": [
          "Pollution",
          "Deforestation",
          "Urbanization",
          "Agricultural intensification"
        ],
        "answer": "1",
        "explanation": "The article focuses on deforestation, urbanization, and agricultural intensification as the main drivers of habitat loss. While pollution can contribute to environmental degradation, it is not specifically mentioned in this context."
      },
      {
        "question": "<b>How does climate change impact biodiversity?</b>",
        "options": [
          "It increases the rate of species extinction.",
          "It causes habitat fragmentation and isolation.",
          "It disrupts ecosystems and forces species to adapt.",
          "All of the above."
        ],
        "answer": "4",
        "explanation": "The article states that climate change disrupts ecosystems, forcing species to adapt or perish. This leads to species extinction, habitat fragmentation, and isolation."
      },
      {
        "question": "<b>What is the primary consequence of losing biodiversity?</b>",
        "options": [
          "Loss of food security",
          "Economic decline",
          "Disruption of ecosystem services",
          "Increased vulnerability to diseases"
        ],
        "answer": "3",
        "explanation": "The article emphasizes that biodiversity loss disrupts ecosystem services, such as pollination and water purification, leading to a variety of consequences."
      },
      {
        "question": "<b>What action does the article suggest for protecting biodiversity?</b>",
        "options": [
          "Developing new technologies to combat climate change",
          "Imposing stricter regulations on industries",
          "Adopting sustainable practices that minimize our impact on the environment",
          "Creating protected areas for endangered species"
        ],
        "answer": "3",
        "explanation": "The article advocates for sustainable practices, such as reducing consumption and protecting natural habitats, as a way to protect biodiversity."
      }
    ]
}

router.post("/", async (req, res) => {
    if(!req.body || !req.body.taskType ) {
        res.sendStatus(403);
        return;
    }

    let taskType;
    switch(req.body.taskType) {
        case "1":
            taskType = "IELTS Academic Reading Multiple Choice";    
            // let text = await questionService.readingTask(taskType);
            // let mc = parserService.parseJSON(text);
            res.render("reading-mc", {
                data: mc, taskType
            });
            return
        case "2":
            taskType = "IELTS Academic Reading Match Headings";    
            // let text = await questionService.readingTask(taskType);
            // let mc = parserService.parseJSON(text);
            res.render("reading-mh", {
                data: mc, taskType
            });
            return
        
    }
    
    return
})

router.post("/getEvaluate", async (req, res) => {
    if(!req.body || !req.body.instruction || !req.body.answer || !req.body.taskType ||
        (req.body.answer.length <= 0) ) {
            res.sendStatus(404);
            return;
    } 
       
    res.json({
        data: parsed,
    });
})

module.exports = router


