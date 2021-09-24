# ADE-BFC-API

API pour chercher des ID, de groupes ou de classes, et des EDT (Emploi Du Temps) de l'académie de Besançon.

## Utilisation
L'API est disponible en ligne sur https://api.ade-bfc.ldgr.fr/.

## Requête
- `/id/` -> tous les IDs
- `/id?type=group` -> seulement les IDs des groupes
- `/id?type=class` -> seulement les IDs des classes
- `/id?search=select1;select2;select3` -> chercher des IDs précis
- `/id?search=select1;select2;select3&type=class` -> chercher des IDs de classes précises

- `/edt/:id` -> récupérer le lien de l'EDT d'un ID
- `/edt/:id?weeks=2` -> récupérer le lien de l'EDT dans 2 semaines d'un ID

## Réponse
### ID
```js
[
	{
		id: 0,
		name: "",
		children: [] // s'il y en a
	}
]
```

### EDT
```js
url [String]
```

### Erreur
```js
{
	status: "error",
	message: ""
}
```

## Comment démarrer
Installer les dépendances en premier :
```
npm install
```
Puis lancer l'API :
```
npm start
```

## Traductions
This README is available in other languages:
- [English](README.md)