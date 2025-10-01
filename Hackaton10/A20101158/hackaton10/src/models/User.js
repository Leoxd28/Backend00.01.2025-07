module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
    passwordHash: DataTypes.STRING,
    role: { type: DataTypes.ENUM('admin', 'instructor', 'student'), defaultValue: 'student' }
  });
  return User;
};
