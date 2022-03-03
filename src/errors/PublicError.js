module.exports = class PublicError extends Error {
	constructor(message, code, ...args) {
		const newArgs = [message, ...args];
		super(...newArgs);
		this._code = code;
	}
	get isPublic() {
		return true;
	}
	get code() {
		return this._code || 400;
	}
}