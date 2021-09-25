const infos = require('./infos');
const components = require('./components');
const tags = require('./tags');
const paths = require('./paths');

module.exports = {
	...infos,
	...components,
	...tags,
	...paths
};