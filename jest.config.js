module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
		'^.+\\.jsx?$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
};
