const Sequelize = require('sequelize');

module.exports = function appsModel(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const apps = sequelizeClient.define('apps', {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  });

  apps.associate = function associate(models) { // eslint-disable-line no-unused-vars
  
  };

  return apps;
};
