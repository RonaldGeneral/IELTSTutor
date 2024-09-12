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
const mh = {
    "article": "<h4>The Rise of Urban Farming</h4><p><b>A.</b> The movement known as urban farming has gained significant momentum in recent years, driven by a confluence of factors.  Growing concerns about food security, environmental sustainability, and the desire for fresh, locally-sourced produce have spurred the transformation of urban spaces into productive gardens and farms. This trend extends beyond individual households, with community gardens, rooftop farms, and even vertical farming systems emerging as innovative solutions to urban food challenges. </p><p><b>B.</b> One of the key drivers behind urban farming is the increasing awareness of food security concerns.  As populations grow and urban areas expand, the reliance on traditional agricultural systems faces mounting pressure. Urban farming offers a viable alternative by producing food closer to where it is consumed, reducing transportation costs and reliance on distant agricultural regions. This localized approach fosters resilience in food systems, enabling communities to access fresh produce even in times of disruption.</p><p><b>C.</b> Urban farming also plays a crucial role in environmental sustainability. By growing food within urban environments, it reduces the environmental impact associated with long-distance food transportation. Furthermore, urban farms often employ sustainable practices, such as composting and organic farming methods, which help to reduce waste and improve soil health. The presence of green spaces in urban areas also contributes to the mitigation of urban heat island effects and enhances biodiversity.</p><p><b>D.</b>  The rise of urban farming has also been fueled by the growing consumer demand for fresh, locally-sourced produce. Consumers are increasingly interested in knowing the origin of their food and its impact on the environment. Urban farms provide a transparent and traceable supply chain, allowing consumers to connect directly with the producers and learn about the sustainable practices employed.  </p><p><b>E.</b> While urban farming presents numerous benefits, it also faces challenges.  Finding suitable land in densely populated urban areas can be difficult.  Access to water, sunlight, and infrastructure can be limited, and urban farming initiatives may encounter resistance from established agricultural interests. Overcoming these obstacles requires collaboration among city planners, farmers, and community members to ensure the long-term success of urban farming initiatives.</p>",
    "headings": [
      "Urban Farming: A Sustainable Solution",
      "Obstacles to Urban Farming",
      "The Growing Demand for Local Food",
      "Food Security and the Urban Landscape",
      "Urban Farming: A New Frontier in Agriculture",
      "Environmental Benefits of Urban Farming"
    ],
    "questions": [
      {
        "paragraph": "A",
        "answer": "v"
      },
      {
        "paragraph": "B",
        "answer": "iv"
      },
      {
        "paragraph": "C",
        "answer": "vi"
      },
      {
        "paragraph": "D",
        "answer": "iii"
      },
      {
        "paragraph": "E",
        "answer": "ii"
      }
    ]
}

function countMatches(string, regex) {
    let match;
    let count = 0;
    
    while ((match = regex.exec(string)) !== null) {
        
      count++;
    }
  
    return count;
}

function integerToRoman(num) {
    const values = 
        [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = 
        ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let roman = '';
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            roman += symbols[i];
            num -= values[i];
        }
    }
    
    return roman;
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
            taskType = "IELTS Academic Reading Matching Headings";    
            // let text = await questionService.readingTask(taskType);
            // let mh = parserService.parseJSON(text);

            let numParagraph = countMatches(mh.article, /<\/p>/g);
            let lastHeadingRoman = integerToRoman(mh.headings.length).toLowerCase();
            res.render("reading-mh", {
                data: mh, taskType,  numParagraph, lastHeadingRoman
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


