const fs = require('fs');
const os = require('os');
const customTitlebar  = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded',() => {
  // edit titlebar
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#000000B6')
    });

if(fs.existsSync(`${os.homedir()}/.ZPlayer`) == false){
    fs.mkdirSync(`${os.homedir()}/.ZPlayer`);
    console.log("Folder created")
}else{
  // fs.rmdirSync(`${os.homedir()}/.ZPlayer`)
  console.log('folder exists')
}
  /**
         * create database file
         */
   var database = {
    cachedFolders:[],
    playlist:[]
}
if(fs.existsSync(`${os.homedir()}/.ZPlayer/database.json`) == false){
    fs.writeFileSync(`${os.homedir()}/.ZPlayer/database.json`,JSON.stringify(database))
}
})
// google api key = AIzaSyAkgiQaLzuswUP-Jd1xwENo7u2YF5Xtq_c
