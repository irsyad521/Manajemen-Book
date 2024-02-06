import { Sequelize } from 'sequelize';

const db = new Sequelize('mydatabase', 'root', 'mysecretpassword', {
  host: 'db',
  dialect: 'mysql',
});

export default db;
