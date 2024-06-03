const { Router } = require("express")
const { homePageController, aboutPageController, postPageController, loginPageController, regPageController, editPageController, addPostPageController } = require('../controllers/app.controller')
const { registerController, loginController, logOutController } = require('../controllers/auth.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const { addDiaryController, deleteDiary, editDiary } = require('../controllers/diary.controller')

const router = Router()
//GET for Request

router.get('/', homePageController)
router.get('/my-diary', sessionMiddleware, aboutPageController)
router.get('/post', postPageController)
router.get('/login', loginPageController)
router.get('/register', regPageController)
router.get('/edit', sessionMiddleware, editPageController)
router.get('/add-post', sessionMiddleware, addPostPageController)
router.get('/api/logout', logOutController)
router.get('/api/delete', sessionMiddleware, deleteDiary)
//POST for Request
router.post('/api/register', registerController)
router.post('/api/login', loginController)
router.post('/api/add', sessionMiddleware, addDiaryController)
router.post('/api/edit', sessionMiddleware, editDiary)
module.exports = router