# ADE-BFC-API

API to search for IDs, of groups or classes, and schedules of the regional education authority of Besançon.

## Usage
The API is available online at https://api.ade-bfc.ldgr.fr/

## Examples
- `/id/` -> all the IDs
- `/id?type=group` -> only groups IDs
- `/id?type=class` -> only classes IDs
- `/id?search=select1;select2;select3` -> search for specifics IDs
- `/id?search=select1;select2;select3&type=class` -> search for specifics classes IDs

- `/edt/:id` -> get schedule link of an ID
- `/edt/:id?weeks=2` -> get schedule link in 2 weeks of an ID


## How to run
Install the dependencies first:
```
npm install
```
Then run the API:
```
npm start
```

## Translations
Ce README est disponible dans d'autres langues :
- [Français](README.fr.md)