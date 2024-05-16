const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node-complete", "root", "root", {
	host: "localhost",
	dialect: "mysql",
	port: 3308,
});

module.exports = sequelize;
