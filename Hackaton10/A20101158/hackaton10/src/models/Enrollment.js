module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Enrollment', {
    status: { type: DataTypes.ENUM('active', 'pending'), defaultValue: 'pending' },
    score: { type: DataTypes.DECIMAL, allowNull: true }
  });
};
