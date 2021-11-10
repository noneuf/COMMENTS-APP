module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    //this link the Comments the post
    Posts.hasMany(models.Comments, {
      //this will delete all the comments of a post if it is deleted
      onDelete: 'cascade',
    });
  };
  return Posts;
};
