// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function filesModel(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const files = sequelizeClient.define('files', {
    filename: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    local: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  files.associate = function associate(models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return files;
};
