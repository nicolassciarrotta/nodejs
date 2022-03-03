const express = require('express');
const jetpack = require('fs-jetpack');
const path = require('path');

require('dotenv').config();

module.exports = class Server {
	constructor() {
		this.webserver = express();
		this.db = null;
		this.utils = {};
		this.models = {};
	}

	get port() {
		return process.env.PORT || 3000;
	}

	async initialize() {
		console.log('Starting server...');
		await this.initializeDatabase();
		await this.initializeControllers();
		await this.initializeWebServer();
		// await this.seed(); //Si quieren correr el seed descomenten aca
	}

	/**
	 * Initializes WebServer
	 *
	 */
	async initializeWebServer() {
		// Accept JSON as requests
		this.webserver.use(express.json());

		// Serve Static files
		this.webserver.use('/', express.static('public'));

		// Api Routes
		jetpack.find(`${__dirname}/routes`, { matching: '*.js' }).forEach(routeFile => {
			const Route = require(path.join('..', routeFile));
			const route = new Route();
			if (typeof route.initialize === 'function') {
				route.initialize(this.db, this);
			}
			let routePath = route.path.replace(/^\//, '');
			routePath = `/api/${routePath}`;
			this.webserver[route.method](routePath, route.auth.bind(route));
		});
		this.webserver.all('/api/*', this.handleUnknownEndpoint.bind(this));

		// Serve index
		this.webserver.get('*', (req, res) => res.sendFile(path.resolve('public/index.html')));

		// Listen to port
		this.webserver.listen(process.env.PORT, () => {
			console.log(`[WEBSERVER] Running on ${process.env.PORT}`);
		});
	}

	handleUnknownEndpoint(req, res) {
		return res.status(400).json({ message: 'Route not found' });
	}

	/**
	 * Initializes database
	 *
	 */
	async initializeDatabase() {
		const config = require('../knexfile');
		const knex = require('knex')(config);

		this.db = knex;
		// RUN MIGRATIONS
		const migrationMode = process.env.DATABASE_MIGRATE || 'false';
		const runMigration = process.env.NODE_ENV === 'production' || migrationMode !== 'false';

		if (runMigration) {
			console.log(`[DB] Running Migrations (${migrationMode})...`);
			if (process.env.NODE_ENV === 'development' && migrationMode === 'wipe-latest') {
				console.log('[DB] Rollingback...');
				await this.db.migrate.rollback();
				console.log('[DB] Rollback done.');
			}

			console.log('[DB] Migrating...');
			await this.db.migrate.latest();
			console.log('[DB] Migrations done.');
			try {
				// TODO: Maybe delete this
				console.log('[DB] Trying seeds...');
				await this.db.seed.run();
				console.log('[DB] Seeds done.');
			} catch (err) {
				console.warn('[DB] Seeds failed');
			}
		}
		// await this.db('users').first();
	}


	async initializeControllers() {
		/** @type {Utils} Server Utils */
		this.utils = {
		}
	}

	async seed(){
		console.log('[Knex seed] - Running seed');
		console.log('[Knex seed] - Creating categories');
		console.log('[Knex seed] - Seed run successfully');
	}
};
