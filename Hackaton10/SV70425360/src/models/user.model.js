import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: { type: DataTypes.STRING, allowNull: false, validate: { len: [2, 100] } },
    lastName:  { type: DataTypes.STRING, allowNull: false, validate: { len: [2, 100] } },
    email:     { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin','instructor','student'), allowNull: false, defaultValue: 'student' }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
