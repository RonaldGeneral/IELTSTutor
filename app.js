const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

app.use(express.static('public'))

app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')


app.get("/", (req, res) => {
    console.log("here")
    res.render("index", {text:"world"})
})

const userRouter = require('./routes/users')

app.use("/users", userRouter)

app.listen(port, () => console.info(`App listening on port ${port}`))