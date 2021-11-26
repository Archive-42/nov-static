'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    authorId: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, { as: "Author", foreignKey: "authorId" });
    Story.hasMany(models.Bookmark, { foreignKey: "storyId" });
    Story.hasMany(models.Like, { foreignKey: "storyId" });
    Story.hasMany(models.Comment, { foreignKey: "storyId" });
  };
  return Story;
};
