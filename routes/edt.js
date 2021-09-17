const express = require('express');
const router = express.Router();
const { get } = require('axios');

const EDT_URL_REPLACE = {
	"https://vesta.univ-fcomte.fr:8443/jsp/": "https://sedna.univ-fcomte.fr/jsp/",
	"displayConfId=35": "displayConfId=45",
	"height=480": "height=1080",
	"width=640": "width=1920",
};


router.get('/:id', (req, res) => {
	getEDT(req.params.id, req.query).then(url => {
		res.send({
			id: req.params.id,
			url: url
		});
	}).catch(err => {
		const error = { status: "error", message: "Unknown ID" };
		if (process.env.DEV) error.error = err;
		res.send(error);
	});
});


async function getEDT(id, { weeks = 0 }) {
	return new Promise((resolve, reject) => {
		get('https://sedna.univ-fcomte.fr/jsp/custom/ufc/mplanif.jsp?id=' + id + "&jours=" + (7 * (Number(weeks) + 1))).then(res => {
			const matches = res.data.matchAll(/^<a href="(https:.+)">Affichage planning<\/a>/gm);
			resolve(Array.from(matches, m => m[1])[0].replace(new RegExp(Object.keys(EDT_URL_REPLACE).join("|"), "gi"), matched => EDT_URL_REPLACE[matched]));
		}).catch(reject);
	});
}


module.exports = router;