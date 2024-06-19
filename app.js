require('dotenv').config('.env')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')

app.use(cors())
app.use(bodyParser.json())

// 获取所有用户
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 获取单个用户
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId])
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 创建新用户
app.post('/users', async (req, res) => {
    const { name, email } = req.body
    try {
        const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email])
        res.status(201).json({ id: result.insertId, name, email })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 更新用户信息
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id
    const { name, email } = req.body
    try {
        const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId])
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json({ id: userId, name, email })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// 删除用户
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId])
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json({ message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
