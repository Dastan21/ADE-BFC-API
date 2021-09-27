const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.send(getFilteredGroups(require('../utils/groups'), req.query));
});


function getFilteredGroups(groups, query) {
	const types = { group: false, class: true };
	const filters = {
		search: query.search ? query.search.split(';').map(s => s.toLowerCase()) : null,
		type: types[query.type]
	};
	if (!filters.search) return groups.filter(group => filters.type !== !!group.children);
	return Object.values(flattenGroups(groups, filters)).map(group => ({ id: group.id, name: group.name }));
}

function flattenGroups(groups, filters, parents = "", ret = []) {
	groups.forEach(group => {
		if (!group.children) {
			ret.push({ id: group.id, name: group.name, parents: parents + "." + group.name.toLowerCase() });
		} else {
			const p = parents + (parents ? "." : "") + group.name.toLowerCase().replace(/\s/g, "_");
			ret.push({ id: group.id, name: group.name, parents: p, children: !!group.children });
			ret.push(...flattenGroups(group.children, filters, p));
		}
	});
	return ret.filter(group =>
		filters.search.every(s => ((group.parents || "")).toLowerCase().includes(s)) &&
		(filters.type === undefined ? true : (filters.type !== !!group.children))
	);
}


module.exports = router;