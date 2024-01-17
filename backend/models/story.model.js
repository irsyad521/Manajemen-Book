import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Story = db.define(
  'stories',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('Financial', 'Technology', 'Health'),
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Publish', 'Draft'),
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Story;

(async () => {
  await Story.sync(); // Menunggu sinkronisasi selesai sebelum keluar
  console.log('Story model synced successfully!');
})();
