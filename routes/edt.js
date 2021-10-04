const express = require('express');
const router = express.Router();
const { get } = require('axios');

const EDT_URL_REPLACE = {
	"https://vesta.univ-fcomte.fr:8443/jsp/": () => process.env.BASE_URL,
	"displayConfId=35": () => "displayConfId=45",
	"idPianoDay=0%2C1%2C2%2C3%2C4%2C5": ({ days = "0,1,2,3,4,5,6" }) => "idPianoDay=" + days,
	"height=480": ({ height = 1080 }) => "height=" + height,
	"width=640": ({ width = 1920 }) => "width=" + width,
};

router.get('/:id', (req, res) => {
	getEDT(req.params.id, req.query).then(img => {
		res.set({ 'Content-Type': 'image/jpeg' }).end(img, 'binary');
	}).catch(() => {
		const error = { status: "error", message: "Unknown group" };
		res.send(error);
	});
});

function getEDT(id, { weeks = 0, ...query }) {
	return get(process.env.PLANIF_URL + '?id=' + id + "&jours=" + (7 * (Number(weeks) + 1))).then(res => {
		const matches = res.data.matchAll(/^<a href="(https:.+)">Affichage planning<\/a>/gm);
		const url = Array.from(matches, m => m[1])[0].replace(new RegExp(Object.keys(EDT_URL_REPLACE).join("|"), "gi"), matched => EDT_URL_REPLACE[matched](query));
		return get(url, { responseType: 'arraybuffer' }).then(res => res.data);
	});
}


module.exports = router;