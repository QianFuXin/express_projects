const express = require('express')
const { redisClient } = require('../db')
const router = express.Router()
// 设置一个键值对
router.post('/', async (req, res) => {
    const { key, value } = req.body
    try {
        await redisClient.set(key, value)
        res.status(201).send(`Key-Value pair set: ${key} = ${value}`)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// 获取一个键值对
router.get('/:key', async (req, res) => {
    const { key } = req.params
    try {
        const value = await redisClient.get(key)
        if (value) {
            res.status(200).send(`Key: ${key}, Value: ${value}`)
        } else {
            res.status(404).send('Key not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// 删除一个键值对
router.delete('/:key', async (req, res) => {
    const { key } = req.params
    try {
        const result = await redisClient.del(key)
        if (result) {
            res.status(200).send(`Key ${key} deleted`)
        } else {
            res.status(404).send('Key not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = router
