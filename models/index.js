const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')(sequelize, DataTypes)
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!')
})
module.exports = { User, sequelize }
