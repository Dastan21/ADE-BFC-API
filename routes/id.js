const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.send(getFilteredIDs(require('../utils/ids'), req.query));
});


function getFilteredIDs(ids, query) {
	const types = { group: false, class: true };
	const filters = {
		search: query.search ? query.search.split(';').map(s => s.toLowerCase()) : null,
		type: types[query.type]
	};
	if (!filters.search)
		return ids.filter(id => filters.type !== !!id.children);
	return Object.values(flattenIDs(ids, filters)).map(id => ({ id: id.id, name: id.name }));
}

function flattenIDs(ids, filters, parents = "", ret = []) {
	ids.forEach(id => {
		if (!id.children) {
			ret.push({ id: id.id, name: id.name, parents: parents + "." + id.name.toLowerCase() });
		} else {
			const p = parents + (parents ? "." : "") + id.name.toLowerCase().replace(/\s/g, "_");
			ret.push({ id: id.id, name: id.name, parents: p, children: !!id.children });
			ret.push(...flattenIDs(id.children, filters, p));
		}
	});
	return ret.filter(id =>
		filters.search.every(s => ((id.parents || "")).toLowerCase().includes(s)) &&
		(filters.type === undefined ? true : (filters.type !== !!id.children))
	);
}


module.exports = router;