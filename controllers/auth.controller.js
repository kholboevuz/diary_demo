const bcrypt = require('bcryptjs')
const User = require('../models/users.models')
var jwt = require('jsonwebtoken')
const registerController = async (req, res) => {
	const { fullname, email, password } = req.body
	try {
		const checkUser = await User.findOne({ email })
		if (!checkUser) {
			const register = await User.create({
				fullname,
				email,
				password
			})
			if (register) {

				res.redirect(`/login?success=<div class="alert alert-success w-80 m-auto" role="alert">
				Muvaffaqiyatli ro'yxatdan o'tdingiz!
			</div>`)
			}
		} else {
			res.redirect(`/login?success=<div class="alert alert-danger w-80 m-auto" role="alert">
			Bunday foydalanuvchi mavjud
		</div>`)
		}


	} catch (error) {
		if (error) throw error
	}
}

const loginController = async (req, res) => {

	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (!user) {
			res.redirect(`/login?success=<div class="alert alert-danger w-80 m-auto" role="alert">
			Login yoki parol xato!
		</div>`)
		} else {
			const passwordMatch = await bcrypt.compare(password, user.password)

			if (!passwordMatch) {
				res.redirect(`/login?success=<div class="alert alert-danger w-80 m-auto" role="alert">
				Login yoki parol xato!
			</div>`)
			} else {
				const jwtData = jwt.sign({
					data: user
				}, process.env.JWT_KEY, { expiresIn: 60 * 60 })
				req.session.data = jwtData
				res.redirect('/')
			}
		}

	} catch (error) {
		if (error) throw error
	}

}

const logOutController = async (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send('Failed to log out.')
		}
		res.clearCookie('connect.sid')
		res.redirect('/')
	})
}
module.exports = {
	registerController,
	loginController,
	logOutController
}