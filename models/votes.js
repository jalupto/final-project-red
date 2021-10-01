const DefineVote = (sequelize, DataTypes) => {
    const Vote = sequelize.define("votes", {
        queen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        season: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Vote
}

module.exports = DefineVote;