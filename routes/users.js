const express = require('express')
const router = express.Router()
const { User } = require('../models')

// 获取所有用户
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 获取单个用户
router.get('/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 创建新用户
router.post('/', async (req, res) => {
    const { username, email } = req.body
    try {
        const newUser = await User.create({ username, email })
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 更新用户信息
router.put('/:id', async (req, res) => {
    const userId = req.params.id
    const { username, email } = req.body
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        user.username = username
        user.email = email
        await user.save()
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 删除用户
router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        await user.destroy()
        res.json({ message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
