const connection = require('./database');
//const { Sequelize } = require('sequelize/types');
const Sequelize = require('sequelize');

const Games = connection.define('games', {
    title: {
        type: Sequelize.STRING,
        AllowNull: false
    }, 
    year: {
        type: Sequelize.INTEGER,
        AllowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        AllowNull: false
    }
});

//Games.sync({force: true})

module.exports = Games