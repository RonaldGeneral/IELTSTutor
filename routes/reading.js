const express = require("express")
const router = express.Router()
const QuestionService = require("../utils/questionService").QuestionService;
const ParserService = require("../utils/parserService").ParserService;

const questionService = new QuestionService();
const parserService = new ParserService();

const multiple = {
    "article": "<h4>The Impact of Technology on the Modern Workplace</h4><p>The rapid advancement of technology has profoundly transformed the modern workplace. Automation, artificial intelligence (AI), and cloud computing are reshaping industries, creating new opportunities and challenges for employees. While technology has undoubtedly increased efficiency and productivity, it has also raised concerns about job displacement and the need for workforce reskilling. </p><p>One of the most significant impacts of technology has been the rise of automation. Robots and AI-powered systems are increasingly being used to perform tasks previously handled by humans. This has led to job losses in manufacturing, logistics, and other sectors. However, it has also created new opportunities in fields related to technology development, maintenance, and data analysis. </p><p>Another key trend is the increasing use of cloud computing. This allows businesses to access and share data remotely, fostering collaboration and improving communication. It also enables employees to work from anywhere with an internet connection, leading to a more flexible and mobile workforce. However, concerns about cybersecurity and data privacy have also emerged. </p><p>Technology has also revolutionized communication in the workplace. Instant messaging, video conferencing, and social media platforms have made it easier for colleagues to connect and collaborate, regardless of their location. This has facilitated remote work and improved communication efficiency. Nevertheless, the constant connectivity can lead to work-life balance issues and increased stress. </p><p>In conclusion, technology has had a profound impact on the modern workplace, bringing both benefits and challenges. While it has increased efficiency and productivity, it has also raised concerns about job displacement and the need for reskilling. Adapting to these changes and embracing new technologies will be crucial for employees to thrive in the future workplace. </p>",
    "questions": [
      {
        "question": "<h4>What is the primary focus of the article?</h4>",
        "options": [
          "The history of technology in the workplace.",
          "The advantages and disadvantages of technology in the workplace.",
          "The future of technology in the workplace.",
          "The impact of technology on employee productivity."
        ],
        "answer": "The advantages and disadvantages of technology in the workplace.",
        "explanation": "The article discusses both the positive and negative aspects of technology's impact on the modern workplace, highlighting its influence on efficiency, job displacement, and workforce reskilling."
      },
      {
        "question": "<h4>According to the article, which of the following is NOT a consequence of automation in the workplace?</h4>",
        "options": [
          "Increased efficiency and productivity.",
          "Job losses in certain sectors.",
          "Reduced demand for skilled labor.",
          "Improved employee morale."
        ],
        "answer": "Improved employee morale.",
        "explanation": "The article suggests that automation may lead to job losses and reduced demand for skilled labor, potentially impacting employee morale negatively. The article doesn't mention improved morale as a result of automation."
      },
      {
        "question": "<h4>What is a key advantage of cloud computing mentioned in the article?</h4>",
        "options": [
          "Increased data security.",
          "Reduced reliance on physical servers.",
          "Enhanced communication and collaboration.",
          "Lower costs for software development."
        ],
        "answer": "Enhanced communication and collaboration.",
        "explanation": "The article states that cloud computing allows businesses to share data remotely, fostering collaboration and improving communication among employees."
      },
      {
        "question": "<h4>Which of the following is a potential downside of the increased use of technology for communication in the workplace?</h4>",
        "options": [
          "Increased workload for employees.",
          "Difficulty in finding qualified employees.",
          "Limited access to information for employees.",
          "Blurred lines between work and personal life."
        ],
        "answer": "Blurred lines between work and personal life.",
        "explanation": "The article mentions that constant connectivity due to technology-driven communication can lead to work-life balance issues and increased stress, suggesting blurred lines between work and personal life as a potential downside."
      },
      {
        "question": "<h4>What is the author's overall stance on the impact of technology on the modern workplace?</h4>",
        "options": [
          "Technology has a purely positive impact on the workplace.",
          "Technology has a purely negative impact on the workplace.",
          "Technology has both positive and negative impacts on the workplace.",
          "Technology's impact on the workplace is unpredictable."
        ],
        "answer": "Technology has both positive and negative impacts on the workplace.",
        "explanation": "The author acknowledges the benefits of technology in terms of efficiency and productivity but also highlights concerns about job displacement and the need for reskilling, suggesting a balanced perspective on its impact."
      }
    ]
}

router.post("/", async (req, res) => {
    let taskType = "IELTS Academic Reading Multiple Choice";
    // let text = await questionService.writingTask(taskType);
    // let instruction = parserService.parseTag(text, "ins");
    // let answer = parserService.parseTag(text, "ans");

    
    res.render("reading", {
        data: multiple, taskType
    });
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


