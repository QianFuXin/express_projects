const { DataTypes } = require('sequelize')
const { sequelize, mongoose } = require('../db')
const User = require('./user')(sequelize, DataTypes)
const Item = require('./item')(mongoose)
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!')
})
module.exports = { User, sequelize, Item }
