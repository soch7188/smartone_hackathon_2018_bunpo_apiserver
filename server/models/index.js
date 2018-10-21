const Sequelize = require('sequelize');
const config = require('../../configs')


const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password, {
			// For Korean support
    charset: 'utf8',
    collate: 'utf8_general_ci',

    timezone: '+08:00', //here you can pass timezone

    logging: config.mysql.logging,
    host: config.mysql.host,
    dialect: 'mysql',

    define: {
          // don't add the timestamp attributes (updatedAt, createdAt)
          timestamps: true,

          // don't delete database entries but set the newly added attribute deletedAt
          // to the current date (when deletion was done). paranoid will only work if
          // timestamps are enabled
          paranoid: false,

          // don't use camelcase for automatically added attributes but underscore style
          // so updatedAt will be updated_at
          underscored: false,

          // disable the modification of tablenames; By default, sequelize will automatically
          // transform all passed model names (first parameter of define) into plural.
          // if you don't want that, set the following
          freezeTableName: false,
      }
    }
);

const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    phone_number: Sequelize.STRING,
    points: Sequelize.INTEGER,
    name: Sequelize.STRING,
});

const TemperatureFeeling = sequelize.define('temperature_feeling', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    feeling: Sequelize.STRING
});

const Queue = sequelize.define('queue', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    floor: Sequelize.STRING,
    brand: Sequelize.STRING,
    crowdedness: Sequelize.STRING
});

const Item = sequelize.define('item', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: Sequelize.INTEGER, allowNull: false},
    brand: {type: Sequelize.INTEGER, allowNull: false},
    price: {type: Sequelize.BOOLEAN, defaultValue: false},
});

const AccessRights = sequelize.define('access_rights', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    user_phone_number: Sequelize.STRING,
    queue_access: Sequelize.BOOLEAN,
    item_access: Sequelize.BOOLEAN,
});

module.exports = {
    sequelize,
    User,
    Queue,
    Item,
    AccessRights,
    TemperatureFeeling
};
