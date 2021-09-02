import { Sequelize } from 'sequelize';

const db = new Sequelize('ejercicioproductos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

export default db;