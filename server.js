const fs = require('fs');
var list = JSON.parse(fs.readFileSync('./Database/database.json')).cachedFolders;
(list).map(file => console.log(file))