const express = require('express')
const dotenv = require('dotenv')
const router = require('./router/app.router')
const { engine } = require("express-handlebars")
const { connectDB } = require('./config/dbconn')
var session = require('express-session')
const fileUpload = require('express-fileupload')

dotenv.config()

const app = express()
app.use(fileUpload())
app.set('trust proxy', 1)
app.use(session({
	secret: process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 3600000,
		secure: false
	}
}))


connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')


app.use(router)

//Creating on server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log('Server running on port:', PORT)
})