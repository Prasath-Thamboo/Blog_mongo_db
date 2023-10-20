const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
require('dotenv').config()
const flash = require('connect-flash')

const newPostController = require('./src/controllers/newPost.js')
const listPostController = require('./src/controllers/listPost.js')
const getPostController = require('./src/controllers/getPost.js')
const storePostController = require('./src/controllers/storePost.js')
const homeController = require('./src/controllers/home.js')
const newUserController = require('./src/controllers/newUser.js')
const storeUserController = require('./src/controllers/storeUser.js')
const loginController = require('./src/controllers/login.js')
const loginUserConrtroller = require('./src/controllers/loginUser.js')
const logoutController = require('./src/controllers/logout.js')

const validateMiddleware = require('./src/middleware/validationMiddleware.js')
const authMiddleware = require('./src/middleware/authMiddleware.js')
const redirectAuthMiddleware = require('./src/middleware/redirectAuthMiddleware.js')


//mongoose.connect('mongodb://127.0.0.1:27017/my_blog_freyja', { useNewUrlParser: true })
mongoose.connect('mongodb+srv://balde:1611@cluster0.habqu.gcp.mongodb.net/my_blog_freyja?retryWrites=true&w=majority', { useNewUrlParser: true })


const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(flash())
app.use(fileUpload())

//objet global qui représente l'environnement global d'exécution de Node.js
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.get('/', homeController)
app.get('/post/new', authMiddleware, newPostController)
app.get('/list', listPostController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectAuthMiddleware, newUserController)
app.get('/auth/login', redirectAuthMiddleware, loginController)
app.get('/auth/logout', logoutController)


app.post('/posts/store', validateMiddleware, storePostController)
app.post('/users/store', storeUserController)
app.post('/users/login', loginUserConrtroller)

//404
app.use((req, res) => {
    res.render('notfound')
})

app.listen(3000, () => {
    console.log('ecoute sur le port 3000')
})