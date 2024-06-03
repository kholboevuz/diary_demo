var jwt = require('jsonwebtoken')
const Diary = require('../models/diary.models')
const homePageController = async (req, res) => {
	const sessData = req.session.data
	if (sessData) {
		const datas = sessData
		var { data } = jwt.verify(datas, process.env.JWT_KEY)
		const diaryData = await Diary.find().lean()
		res.render('home', {
			title: "Asosiy sahifa",
			sessData,
			data,
			diaryData
		})
	} else {
		const diaryData = await Diary.find().lean()
		res.render('home', {
			title: "Asosiy sahifa",
			sessData,
			diaryData
		})
	}

}

const aboutPageController = async (req, res) => {
	const sessData = req.session.data
	if (sessData) {
		const datas = sessData
		var { data } = jwt.verify(datas, process.env.JWT_KEY)
		const { _id } = data
		const diaryData = await Diary.find({ userid: _id }).lean()

		res.render('mydiary', {
			title: "Mening kundaliklarim",
			sessData,
			data,
			diaryData
		})
	} else {
		res.render('mydiary', {
			title: "Mening kundaliklarim",
			sessData
		})
	}

}

const postPageController = async (req, res) => {
	const sessData = req.session.data
	if (sessData) {
		const datas = sessData
		const { _id } = req.query
		var { data } = jwt.verify(datas, process.env.JWT_KEY)
		const oneDiary = await Diary.findOne({ _id }).lean()
		res.render('post', {
			title: "Mening kundaliklarim",
			sessData,
			data,
			oneDiary
		})
	} else {
		const { _id } = req.query
		const oneDiary = await Diary.findOne({ _id }).lean()
		res.render('post', {
			title: "Mening kundaliklarim",
			sessData,
			oneDiary
		})
	}
}

const loginPageController = (req, res) => {
	const alertData = req.query.success

	res.render('login', {
		title: "Mening kundaliklarim kirish",
		alertData
	})
}

const regPageController = (req, res) => {
	res.render('register', {
		title: "Mening kundaliklarim "
	})
}

const editPageController = async (req, res) => {
	const sessData = req.session.data
	if (sessData) {
		const datas = sessData
		var { data } = jwt.verify(datas, process.env.JWT_KEY)
		const { _id } = req.query
		const { diary_desc } = await Diary.findOne({ _id }).lean()
		res.render('edit', {
			title: "Mening kundaliklarim",
			sessData,
			data,
			diary_desc,
			_id
		})
	} else {
		res.render('edit', {
			title: "Mening kundaliklarim ",
			sessData
		})
	}
}

const addPostPageController = (req, res) => {
	const sessData = req.session.data
	if (sessData) {
		const datas = sessData
		var { data } = jwt.verify(datas, process.env.JWT_KEY)
		res.render('add-post', {
			title: "Mening kundaliklarim",
			sessData,
			data
		})
	} else {
		res.render('add-post', {
			title: "Mening kundaliklarim ",
			sessData
		})
	}
}

module.exports = {
	homePageController,
	aboutPageController,
	postPageController,
	loginPageController,
	regPageController,
	editPageController,
	addPostPageController
}