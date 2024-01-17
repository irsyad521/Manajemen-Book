import { Sequelize } from 'sequelize';

const db = new Sequelize('db_story', 'kali', 'pahlawan', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
