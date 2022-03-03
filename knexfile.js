const path = require('path');
const envPath = path.join(__dirname, '.env');

require('dotenv').config({ path: envPath });

module.exports = {
	client: 'mysql',
	connection: {
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DB,
		ssl: false
	},
	migrations: {
		directory: 'src/database/migrations'
	},
	seeds: {
		directory: 'src/database/seeds'
	}
};
