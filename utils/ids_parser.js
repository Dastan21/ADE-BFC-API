const { writeFile } = require('fs');
const { get } = require('axios');

const BASE_URL = "https://sedna.univ-fcomte.fr/jsp/custom/ufc/mselect.jsp";

function getIDs(url) {
	return new Promise((resolve, reject) => {
		get(url, { responseType: 'arraybuffer' }).then(res => res.data).then(data => {
			let matches = data.toString('latin1').matchAll(/(?!.*Retour)^<a href="[^\d]+(\d+)">(.+)<\/a>/gm);
			let ids = Array.from(matches, m => ({ id: m[1], name: m[2] }));
			resolve(!ids.length ? null : ids);
		}).catch(reject);
	})
}

const timer = ms => new Promise(res => setTimeout(res, ms));

async function getAllIDs(url) {
	let ids = await getIDs(url);
	if (!ids) return;
	let ret = [];
	for (const id of ids) {
		await timer(300);
		let data = { ...id };
		const children = await getAllIDs(BASE_URL + "?id=" + id.id);
		if (children) data.children = children;
		ret.push(data);
		// console.log(id.name + " done!") // DEBUG
	}
	return ret;
}

process.stdout.write("Parsing IDs... ");
getAllIDs(BASE_URL + "?id=7006").then(res => {
	process.stdout.write("OK\n");
	process.stdout.write("Saving IDs... ");
	writeFile("ids.json", JSON.stringify(res), err => {
		if (err) {
			process.stdout.write("ERROR\n");
			console.error(err);
		} else {
			process.stdout.write("OK\n");
		}
	});
}).catch(err => {
	process.stdout.write("ERROR\n");
	console.error(err);
});