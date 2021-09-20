const fs = require('fs');
const os = require('os');
const customTitlebar  = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded',() => {
  // edit titlebar
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#000')
    });
})
if(fs.existsSync(`${os.homedir()}/.ZPlayer`) == false){
    fs.mkdirSync(`${os.homedir()}/.ZPlayer`);
    console.log("Folder created")
}else{
  // fs.rmdirSync(`${os.homedir()}/.ZPlayer`)
  console.log('folder exists')
}

