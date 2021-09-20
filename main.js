const {app,Menu,ipcMain, BrowserWindow,dialog, Tray, nativeImage, nativeTheme} = require('electron');
const defaultPic = require('./tools/default');
const path = require('path');
const os = require('os');
var mainWindow  = null;
let icon = nativeImage.createFromDataURL(`${defaultPic.image}`)
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    minWidth:1300,
    minHeight: 580,
    // backgroundColor:"#000000",
    height: 580,
    frame:false,
    icon:nativeImage.createFromPath('./images/zik.png'),
    webPreferences: {
      preload:path.join(__dirname,"preload.js"),
      nodeIntegration:true,
      nodeIntegrationInWorker:true,
      nodeIntegrationInSubFrames:true,
      enableRemoteModule:true,
      contextIsolation:false,
    }
  })
  // and load the index.html of the app.
  // mainWindow.setIcon();
  mainWindow.setProgressBar(0.5);
  mainWindow.loadFile(path.join(__dirname,'ZPlayer.html'));
  /**
   * Getting music folders
   */
      ipcMain.on('open-music-folder',(event)=>{
      
        dialog.showOpenDialog(mainWindow,{
            title:"Open Music",
            properties:['openDirectory'],
            buttonLabel:'Choose Music Folder',
            defaultPath:`${os.homedir()}/Music/`
            //  filters: [
            //         { name: 'Audio', extensions: ['mp3', 'm4a', 'aac'] }]
        }).then((files)=>{
            if(files) event.sender.send('musicFiles',files);
        });
    })
    /**========================================== */

    /**
     * Networks error
     */
    ipcMain.on('networkError',(event,args) =>{
      
        dialog.showErrorBox("Network Error",args)
    })
    /**-------------------------------------- */

    /**
     * No Lyrics
     */
    ipcMain.on('noTags',(event,args)=>{
      dialog.showMessageBox(mainWindow,{
        message:args
      })
    })

    /**
     * No directories to delete
     */
    ipcMain.on('Nofolders',(e,args)=>{
      dialog.showErrorBox("Illegal Operation",args)
    })
}
 
  // lanch app when ready
app.whenReady().then(()=>{
  var menu = Menu.buildFromTemplate([
    {
      label:"ZPlayer"
    },
    {label:"Tools",submenu:[
      {label:"Exit",accelerator:"Ctrl + Q",click:()=> app.quit()},
      {label:"Reload",accelerator:"F8",role:"reload"},
      {label:"OpendevTools",accelerator:"F12",role:"toggleDevTools"},
      {label:"Help",accelerator:"Ctrl + H",click:()=> openHelp()}
    ]},
  ]);

  Menu.setApplicationMenu(menu);
  createWindow();
  setTimeout(() => {
    // openHelp();
  }, 10000);
 
 let tray = new Tray(icon);
  
  tray.setToolTip('ZPLayer');
  tray.setContextMenu(Menu.buildFromTemplate([
    {label:"DevTools",accelerator:"F12",role:"toggleDevTools"},

  ]));
});
/***
 * IPC messages
 */