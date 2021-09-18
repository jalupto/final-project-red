const DefineVote = (sequelize, DataTypes) => {
    const Vote = sequelize.define("votes", {
        queen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        season: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    return Vote
}

module.exports = DefineVote;