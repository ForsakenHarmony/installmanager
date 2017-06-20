const Sequelize = require('sequelize');

module.exports = function appsModel(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const apps            = sequelizeClient.define('apps', {
    name: {
      type     : Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    args: {
      type     : Sequelize.DataTypes.STRING,
      allowNull: false,
      default  : '[]',
    },
  });

  apps.associate = function associate(models) { // eslint-disable-line no-unused-vars
    models.files.hasOne(models.apps, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return apps;
};
