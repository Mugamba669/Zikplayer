const { app } = require("electron")
const customTitlebar = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded',()=>{
    // style your titlebar
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.BLACK,
    });
      
});
