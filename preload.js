const customTitlebar  = require('custom-electron-titlebar');
// const{ BrowserWindow }= require('electron');
// const NodeID3 = require('node-id3');
// const path = require('path');
window.addEventListener('DOMContentLoaded',() => {
  // edit titlebar
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#000')
    });

    // launch tags editor
var  launchBtn = document.getElementById('tags');
    launchBtn.addEventListener('click',() => {
        // console.log(new BrowserWindow())
    },false)
})
 