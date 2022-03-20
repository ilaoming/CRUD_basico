module.exports = (sequelize, type) => {
    return sequelize.define('persona',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        lastName: type.STRING,
        country: type.STRING,
        occupation: type.STRING,
        dateOfBirth: type.DATE
    });
}