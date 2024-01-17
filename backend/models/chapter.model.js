import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Story from './story.model.js';

const { DataTypes } = Sequelize;

const Chapter = db.define(
  'chapters',
  {
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chapter_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    story_chapter: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Story.hasMany(Chapter, { foreignKey: 'story_id' });
Chapter.belongsTo(Story, { foreignKey: 'story_id' });

export default Chapter;

(async () => {
  await Chapter.sync();
  console.log('Chapter model synced successfully!');
})();
