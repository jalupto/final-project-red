const DefineFav = (sequelize, DataTypes) => {
    const Fav = sequelize.define("favs", {
        queen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        season: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Fav
}

module.exports = DefineFav;