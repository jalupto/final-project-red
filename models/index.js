const { sequelize, syncDB } = require("../db");
const { DataTypes } = require("sequelize");

const DefineUser = require("./users");
const DefineFav = require("./favs");
const DefineVote = require("./votes");

const User = DefineUser(sequelize, DataTypes);
const Fav = DefineFav(sequelize, DataTypes);
const Vote = DefineVote(sequelize, DataTypes);

User.hasMany(Fav, {
    foreignKey: 'userId',
    allowNull: false,
    onDelete: 'CASCADE'
})
Fav.belongsTo(User)

User.hasMany(Vote, {
    foreignKey: 'userId',
    allowNull: false,
    onDelete: 'CASCADE'
})
Vote.belongsTo(User)

syncDB(sequelize, {alter: true})

module.exports = {
    User,
    Fav,
    Vote
};