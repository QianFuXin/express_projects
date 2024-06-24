const { Sequelize } = require('sequelize')
const mongoose = require('mongoose')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
})
// MongoDB连接URI
const mongoURI = 'mongodb://root:qianfuxin@qianfuxin.com:17017/flask?authSource=admin'

// 连接到MongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))
module.exports = { sequelize, mongoose }
