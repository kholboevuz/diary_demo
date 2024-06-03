const mongoose = require("mongoose")

const DiarySchema = new mongoose.Schema(
	{
		userid: {
			type: String,
			required: true,
		},
		diary_name: {
			type: String,
			required: true,
		},
		file_name: {
			type: String,
			required: true,
		},
		diary_desc: {
			type: String,
			require: true,
		},
		datatime: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
)


module.exports = mongoose.model('Diary', DiarySchema)