module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Users.associate = (models) => {
  //   //this link the posts to the users
  //   Users.hasMany(models.Posts, {
  //     //this will delete all the posts of a user if it is deleted
  //     onDelete: 'cascade',
  //   });
  // };
  return Users;
};
