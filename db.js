const { Sequelize } = require('sequelize')
const mongoose = require('mongoose')
const redis = require('redis')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
})
// MongoDB连接URI
const mongoURI = process.env.MONGO_URL

// 连接到MongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))

// 创建Redis客户端并指定URL
const redisURL = process.env.REDIS_URL
const redisClient = redis.createClient({ url: redisURL })

redisClient.on('error', (err) => {
    console.error('Redis error:', err)
})

redisClient.on('connect', () => {
    console.log('Connected to Redis...')
})
redisClient.connect()
module.exports = { sequelize, mongoose, redisClient }
