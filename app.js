const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));

app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.render("index", {})
})

app.get("/question-type", (req, res) => {
    res.render("question-type", {})
})

const questionRouter = require('./routes/question')

app.use("/question", questionRouter)

app.listen(port, () => console.info(`App listening on port ${port}`))