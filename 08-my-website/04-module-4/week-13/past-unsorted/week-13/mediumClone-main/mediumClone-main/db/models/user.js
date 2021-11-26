'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Story, { as: "Author", foreignKey: 'authorId' }),
      User.hasMany(models.Comment, { foreignKey: 'userId' }),
      User.hasMany(models.Like, { foreignKey: 'userId' }),
      User.hasMany(models.Follow, { as: "Follower", foreignKey: 'followerId' }),
      User.hasMany(models.Follow, { as: "Following", foreignKey: 'followingId' }),
      User.hasMany(models.Bookmark, { foreignKey: 'userId' })
  };
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }
  return User;
};
