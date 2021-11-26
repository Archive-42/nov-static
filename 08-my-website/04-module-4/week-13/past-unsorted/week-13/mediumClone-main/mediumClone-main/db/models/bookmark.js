'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storyId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Bookmark.associate = function(models) {
    // associations can be defined here
    //todo userId --> user.id
    Bookmark.belongsTo(models.User, { foreignKey: 'userId' });
    //todo storyId --> story.id
    Bookmark.belongsTo(models.Story, { foreignKey: 'storyId' });
  };
  return Bookmark;
};