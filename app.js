const path = require('path')
const express = require('express')
const Handlebars = require('handlebars')
const config = require('./config/keys.config')
const helmet = require('helmet')
const compression = require('compression')
const csrfProtection = require('csurf')
const flash = require('connect-flash')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const expressSession = require('express-session')
const MongoStore = require('connect-mongodb-session')(expressSession)
const HomeRouter = require('./routes/home.routes')
const AddRouter = require('./routes/add.routes')
const ProductsRouter = require('./routes/products.routes')
const CartRouter = require('./routes/cart.routes')
const OrdersRouter = require('./routes/orders.routes')
const AuthorizationRouter = require('./routes/authorization.routes')
const ProfileRouter = require('./routes/profile.routes')
const authMiddleware = require('./middleware/variables.middleware')
const userMiddleware = require('./middleware/user.middleware')
const errorHandler = require('./middleware/errors.middleware')
const fileMiddleware = require('./middleware/files.middleware')

const app = express()

const handlebars = expressHandlebars.create({
    defaultLayout: 'layout',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require('./utils/hbsHelpers.utils')
})

const store = new MongoStore({
    collection: 'sessions',
    uri: config.mongoURI
})

app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(express.urlencoded({extended: true}))
app.use(expressSession({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrfProtection())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(authMiddleware)
app.use(userMiddleware)

app.use('/app/home', HomeRouter)
app.use('/app/add', AddRouter)
app.use('/app/products', ProductsRouter)
app.use('/app/cart', CartRouter)
app.use('/app/orders', OrdersRouter)
app.use('/app/authorization', AuthorizationRouter)
app.use('/app/profile', ProfileRouter)

app.use(errorHandler)

module.exports = app
