module.exports = (mongoose) => {
    const itemSchema = new mongoose.Schema({
        name: String,
        quantity: Number,
    })
    return mongoose.model('Item', itemSchema)
}
