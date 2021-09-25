const getGroups = require('./getGroups');
const getEDT = require('./getEDT');

module.exports = {
	paths: {
		'/group/': {
			...getGroups,
		},
		'/edt/{id}': {
			...getEDT,
		}
	}
}