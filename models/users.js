const DefineUser = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return User
}

module.exports = DefineUser;