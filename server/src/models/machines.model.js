// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function machinesModel(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const machines        = sequelizeClient.define('machines', {
    name     : {
      type     : Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    machineid: {
      type     : Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  });
  
  machines.associate = function associate(models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };
  
  return machines;
};
