const express = require("express")
const route = express.Router()

route.get("/", (req, res) => {
    res.render("index")
})

route.get("/trash", (req, res) => {
    res.render("trash")
})

module.exports = route