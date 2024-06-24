const express = require('express')
const router = express.Router()
const { Item } = require('../models')
// 创建一个新的Item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body)
        const savedItem = await newItem.save()
        res.status(201).send(savedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})

// 获取所有Items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error)
    }
})

// 通过ID获取单个Item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) {
            return res.status(404).send()
        }
        res.status(200).send(item)
    } catch (error) {
        res.status(500).send(error)
    }
})

// 更新一个Item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!item) {
            return res.status(404).send()
        }
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send(error)
    }
})

// 删除一个Item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        if (!item) {
            return res.status(404).send()
        }
        res.status(200).send(item)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router
