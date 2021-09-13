const {app,Menu, BrowserWindow} = require('electron');
// const { nativeTheme } = require('electron/main');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1300,
    minWidth:1300,
    minHeight: 580,
    height: 580,
    alwaysOnTop:false,
    frame:false,
    webPreferences: {
      preload:path.join(__dirname,"./lyrics.js"),
      nodeIntegration:true,
      nodeIntegrationInWorker:true,
      nodeIntegrationInSubFrames:true,
      enableRemoteModule:true,
      contextIsolation:false,
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('./Eq.html');
  mainWindow.setIcon(path.join(__dirname,"./images/zik.png"));
}
// help window 
function openHelp(){
  var  helpWindow = new BrowserWindow({
    width:750,
    height:569,
    backgroundColor:'#000',
    frame:false,
    maximizable:false,
    resizable:false,
    icon:path.join(__dirname,'/images/zik.png'),
    webPreferences:{
      preload:path.join(__dirname,"./components/preload.js"),
      nodeIntegration:true,
      nodeIntegrationInWorker:true,
      enableRemoteModule:true,
      contextIsolation:false
    }
  });
  helpWindow.loadFile(path.join(__dirname,'./components/index.html'));
  }

  // tags window
  function showAudioTags() {
    var  tagsWindow = new BrowserWindow({
      title:"Tag Editor",
      width:600,
      height:550,
      resizable:false,
      alwaysOnTop:true,
      frame:false,
      maximisable:false,
      webPreferences:{
        preload:path.join(__dirname,"./audiotagger/index.js"),
        nodeIntegration:true,
      nodeIntegrationInWorker:true,
      nodeIntegrationInSubFrames:true,
      enableRemoteModule:true
      }
    });
    tagsWindow.loadFile(path.join(__dirname,"./audiotagger/tag.html"));
   }
  // lanch app when ready
app.whenReady().then(()=>{
  var menu = Menu.buildFromTemplate([
    ,{
      label:"ZPlayer",icon:path.join(__dirname,"./images/zik.png")
    },
    {label:"Tools",submenu:[
      {label:"Exit",accelerator:"Ctrl + Q",click:()=> app.quit()},
      {label:"FullScreen",accelerator:"F11",role:"toggleFullScreen"},
      {label:"OpendevTools",accelerator:"F12",role:"toggleDevTools"},
      {label:"Help",accelerator:"Ctrl + H",click:()=> openHelp()}
    ]},
    {label:"Utilities",submenu:[
      {label:"Audio Tags Editor",icon:path.join(__dirname,"./images/zik.png"),accelerator:"Ctrl + T",click:()=> showAudioTags()}
    ]}
  ]);

  Menu.setApplicationMenu(menu);
  createWindow();
  setTimeout(() => {
    openHelp();
  }, 8000);
});
