module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	'overrides': [{
		'env': {
			'node': true,
		},
		'files': ['.eslintrc.{js,cjs}', '*.ts'],
		'parserOptions': {
			'sourceType': 'script',
		},
	}],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'@typescript-eslint',
	],
	'rules': {
		'no-console': 'error',
		'quotes': ['error', 'single'],
		'indent': ['error', 'tab'],
		'no-mixed-spaces-and-tabs': 'off',
		'array-element-newline': [
			'error',
			{
				'ArrayPattern': { 'minItems': 3 },
			},
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'always-multiline',
			},
		],
		'no-trailing-spaces': 'error',
		'no-irregular-whitespace': 'error',
		'eol-last': ['error', 'always'],
		'semi': ['error', 'always'],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'block-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
		'space-in-parens': ['error', 'never'],
	},
};
