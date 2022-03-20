const Sequelize = require('sequelize');
const PersonaModel = require('./models/persona');

const sequelize = new Sequelize("L2kV8emHXn", "L2kV8emHXn", "oVGZrhch8M",{
    host: "remotemysql.com",
    dialect: 'mysql' 
});

const Persona = PersonaModel(sequelize, Sequelize);



sequelize.sync({force: false})
    .then(()=>{
        console.log('synchronized tables');
    });

module.exports = {
    Persona
}
