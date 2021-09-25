const { writeFile } = require('fs');
const { get } = require('axios');

const BASE_URL = "https://sedna.univ-fcomte.fr/jsp/custom/ufc/mselect.jsp";

function getGroups(url) {
	return new Promise((resolve, reject) => {
		get(url, { responseType: 'arraybuffer' }).then(res => res.data).then(data => {
			let matches = data.toString('latin1').matchAll(/(?!.*Retour)^<a href="[^\d]+(\d+)">(.+)<\/a>/gm);
			let groups = Array.from(matches, m => ({ id: m[1], name: m[2] }));
			resolve(!groups.length ? null : groups);
		}).catch(reject);
	})
}

const timer = ms => new Promise(res => setTimeout(res, ms));

async function getAllGroups(url) {
	let groups = await getGroups(url);
	if (!groups) return;
	let ret = [];
	for (const group of groups) {
		await timer(300);
		let data = { ...group };
		const children = await getAllGroups(BASE_URL + "?id=" + group.id);
		if (children) data.children = children;
		ret.push(data);
	}
	return ret;
}

process.stdout.write("Parsing Groups... ");
getAllGroups(BASE_URL).then(res => {
	process.stdout.write("OK\n");
	process.stdout.write("Saving Groups... ");
	writeFile("groups.json", JSON.stringify(res), err => {
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