class Route {
	constructor(path, method, config) {
		this.path = path;
		this._method = method;

		this.config = {
			isPublic: false,
			...config,
		};
	}

	get method() {
		return this._method.toLowerCase();
	}

	get utils() {
		return this.server.utils;
	}

	/**
	 *
	 *
	 * @param {*} db
	 * @param {Server} server
	 * @memberof Route
	 */
	initialize(db, server) {
		this.db = db;
		this.server = server;
	}

	async auth(req, res) {
		try {
			if (this.config.isPublic) return await this.run(req, res);
			const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
			if (!token) return res.status(401).json({ message: 'You dont have permission to this resource' });
			return await this.run(req, res);
		} catch (err) {
			this.error(res, err);
		}
	}

	error(res, err) {
		if (err.isPublic) {
			return res.status(err.code).json({ message: err.message });
		}

		console.error('Failed to run endpoint', err);
		return res.status(500).json({ message: 'Unexpected error' });
	}

	// eslint-disable-next-line no-unused-vars
	run(req, res, db, user) {
		// Overload!!
		return null;
	}
}

module.exports = Route;
