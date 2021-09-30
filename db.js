require("dotenv").config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_URL,
    {
        dialect: "postgres",
        // ssl: process.env.ENVIRONMENT === 'production'
    }
)

async function syncDB(sequelize, options){
    const { force, alter } = options
    try {
        if (force)
            await sequelize.sync({ force: true })
        else if (alter)
            await sequelize.sync({ alter: true })
        else
            await sequelize.sync()
    } catch (err){
        console.log(err)
    }
}

module.exports = {
    sequelize, syncDB
};