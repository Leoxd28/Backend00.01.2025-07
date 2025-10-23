import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Enrollment extends Model {}
  Enrollment.init({
    status: { type: DataTypes.ENUM('pending','active'), allowNull: false, defaultValue: 'pending' },
    score:  { type: DataTypes.DECIMAL(5,2), allowNull: true }
  }, { sequelize, modelName: 'Enrollment' });
  return Enrollment;
};
