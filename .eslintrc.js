module.exports = {
	env: {
		node: true,
		es6: true,
		mocha: true
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parserOptions: {
		ecmaVersion: 2018
	},
	rules: {
		'indent': [2, 'tab', { 'SwitchCase': 1 }],
		'no-unused-vars': 1,
		'no-useless-escape': 0,
		'no-case-declarations': 1,
		'quotes': [2, 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true
		}],
		'keyword-spacing': [2, {
			before: true,
			after: true,
		}],
		'comma-spacing': [2, {
			before: false,
			after: true
		}],
		'object-curly-spacing': [2, 'always'],
		'array-bracket-spacing': [1, 'never'],
		'no-trailing-spaces': 2,
		'block-spacing': [2, 'always'],
		'key-spacing': [2, {
			afterColon: true
		}],
		'jsdoc/check-indentation': 0
	}
};