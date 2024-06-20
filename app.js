require('dotenv').config('.env')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users')
const { sequelize } = require('./models')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/users', usersRouter)
function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}
function errorHandler(err, req, res) {
    res.status(500)
    res.json({ error: err.message })
}
app.use(logErrors)
app.use(errorHandler)
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected!')
        app.listen(3000, () => {
            console.log(`Server is running on port 3000`)
        })
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    })
