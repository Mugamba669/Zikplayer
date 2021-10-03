const { ipcRenderer } = require("electron/renderer");
const $ = require("jquery");

$('.btn').click(function(){
    ipcRenderer.send('close-help')
})