const Sequelize = require('sequelize');

const connection = new Sequelize('api','root', 'root', {
    host: 'localhost',
    port: 3306, 
    dialect:'mysql'
})

module.exports = connection;