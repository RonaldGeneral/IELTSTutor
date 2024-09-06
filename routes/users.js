const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hiuers")
})

router.post('/:id', (req, res) => {
    res.send(`Get user with id ${req.params.id}`)
})

module.exports = router