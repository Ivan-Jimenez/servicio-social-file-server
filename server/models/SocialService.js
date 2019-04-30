module.exports = (sequelize, DataTypes) => {
  const SocialService = sequelize.define('SocialService', {
    control: {
      type: DataTypes.INTEGER,
      unique: true
    },
    career: DataTypes.STRING,
    name: DataTypes.STRING,
    programName: DataTypes.STRING,
    status: DataTypes.STRING,
    //documents: DataTypes.STRING
  })
  return SocialService
}