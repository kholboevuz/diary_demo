const moment = require('moment-timezone')
const timezone = 'Asia/Tashkent'
const Diary = require('../models/diary.models')
const format = 'YYYY-DD-HH:mm'
const path = require('path')
const currentTime = moment().tz(timezone).format(format)
var jwt = require('jsonwebtoken')

const addDiaryController = async (req, res) => {
	const { diary_name, diary_desc } = req.body
	try {
		const sessData = req.session.data
		const datas = sessData
		var { data } = jwt.verify(datas, process.env.JWT_KEY)
		const { _id } = data
		let uploadedFile = req.files.files
		const fileName = uploadedFile.name


		uploadedFile.mv(path.join(__dirname, '../public/uploads', uploadedFile.name), (err) => {
			if (err) {
				return res.status(500).send(err)
			}
		})


		const add = await Diary.create({
			diary_name,
			diary_desc,
			file_name: fileName,
			datatime: currentTime,
			userid: _id
		})

		if (add) {
			return res.redirect('/my-diary')
		}

	} catch (err) {
		if (err) throw err
	}


}

const deleteDiary = async (req, res) => {
	const { _id } = req.query

	const deleteDiary = await Diary.deleteOne({ _id })

	if (deleteDiary) {
		res.redirect('/my-diary')
	}
}

const editDiary = async (req, res) => {
	const { diary_desc, _id } = req.body
	const desc = await Diary.updateOne({ _id }, {
		diary_desc
	})

	if (desc) {
		return res.redirect('/my-diary')
	}
}

module.exports = { addDiaryController, deleteDiary, editDiary }