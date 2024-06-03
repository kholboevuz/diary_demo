const sessionMiddleware = (req, res, next) => {
	const sessionData = req.session.data


	if (!sessionData) {
		return res.redirect('/')
	}

	next()
}

module.exports = sessionMiddleware
