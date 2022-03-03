const Route = require('../models/Route');
module.exports = class Test extends Route {
	constructor() {
		super('/test', 'get', { isPublic: false });
	}

	async run(req, res) {
		return res.json({ message: 'Hello world' });
	}
};
