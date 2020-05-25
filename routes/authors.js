const express = require("express")
const route = express.Router()
const Author = require("../models/author")


route.get("/", async (req, res) => {
	let searchOptions = {}
	if (req.query.name != null && req.query.name != '') {
		searchOptions.name = new RegExp(req.query.name, 'i')
	}
	try {
		const authors = await Author.find(searchOptions)
		res.render("authors/index", {
			authors: authors,
			searchOptions: req.query
		})
	} catch {
		res.redirect('/')
	}
})

route.get('/new', async (req, res) => {
	res.render("authors/new", {author: new Author()})
})

route.post('/', async (req, res) => {
	const author = Author({
		name: req.body.name
	})
	try {
		const newAuthor = await author.save()
		// res.redirect(`authors/${newAuthor.id}`)
		res.redirect(`authors`)
	} catch {
		res.render("authors/new", {
			author: author,
			errorMessage: "Error creating Author"
		})
	}
})

module.exports = route