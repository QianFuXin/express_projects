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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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
