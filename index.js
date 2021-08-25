const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Post = require('./model');
const postRouter = require('./routes/articles') ;
const app = express()


mongoose.connect('mongodb+srv://notes1234:notes1234@cluster0.7zkic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true, 
	useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({
	extended: false
}))
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
	const articles = await Post.find().sort({
		createdAt: 'desc'
	})
	res.render('articles/index', {
		articles: articles
	})
})

app.use('/articles', articleRouter)

app.listen(5000)