const {app,Menu,ipcMain, BrowserWindow,dialog, Tray, nativeImage, nativeTheme, webContents, DownloadItem, shell, systemPreferences, globalShortcut} = require('electron');
const defaultPic = require('./Core/default');
const path = require('path');
const os = require('os');
const { Emitter } = require('custom-electron-titlebar/common/event');
const { autoUpdater } = require('electron/main');
const { Console } = require('console');
const { join } = require('path');
const { exit } = require('process');
var mainWindow  = null,helpWindow = null;
nativeTheme.shouldUseDarkColors = true;
nativeTheme.themeSource = 'system'
let icon = nativeImage.createFromDataURL(`${defaultPic.image}`)
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    minWidth:1300,
    minHeight: 580,
    maximizable:true,
    backgroundColor:"#000000",
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
  ipcMain.on('trackUrl',(event,args)=>{
    // console.log(args)
    event.sender.send('getPath',args)
  })
/**
 * Message for removing a song 
 */
ipcMain.on('removedSong',(event,args)=>{
    dialog.showMessageBox(mainWindow,{
      title:"Delete Song message",
      icon:nativeImage.createFromDataURL(`${args.artwork}`),
      message:`${args.title} is deleted parmanently.`,
    })
})
  ipcMain.on('trackEnd',(event,args)=>{
    // console.log(args)
    event.sender.send('removeLyrics','active')
  })
  ipcMain.once('showApp',(event,args)=>{
    mainWindow.show()
  })
  /**
   * Message for drawings over other apps
   */
  ipcMain.on('drawOverApps',(event,args)=>{
    mainWindow.setAlwaysOnTop(args,'floating')
  })
/**
 * Updating track artwork offline
 */
  ipcMain.on('getartWork',(event,args)=>{
    dialog.showOpenDialog(mainWindow,{
      title:"Choose new track cover",
      properties:['openFile'],
      buttonLabel:'Select track cover',
      defaultPath:`${os.homedir()}/Pictures`
    }).then((coverUrl)=>{
      event.sender.send('sendartWork',coverUrl.filePaths[0])
    })
  })
  /**
   * Reload app to save changes
   */
  
  ipcMain.on('reloadToSave',(e,args)=>{
    e.preventDefault();
    // e.stopPropagation();
   dialog.showMessageBox(mainWindow,{
        title:"Saving Caution !!",
        message:'You need to restart the system to reflect the changes!!',
        buttons:['Restart now']
      }).then((value)=>{
        switch (value.response) {
          case 0:
            mainWindow.reload();
            break;
        }
      });

  })
  // and load the index.html of the app.
  // mainWindow.setIcon();
  // DownloadItem.prototype
  ipcMain.on('downloadsong',(event,args)=>{
    
      mainWindow.webContents.session.on('will-download',(ent,downloadItem,webContents)=>{
  
      downloadItem.setSavePath(`${os.homedir()}/Music/Ziki/${downloadItem.getFilename()}`)
      event.sender.send('starttime',downloadItem.getStartTime())
      event.sender.send('filedownload',`${downloadItem.getFilename()}`)
      
      /**
       * action to pause a download
       */
      ipcMain.on('pausedownload',(e,arg)=>{
          downloadItem.pause();
      })
      /**
       * action to resume download
       */
      ipcMain.on('resumedownload',(e,arg)=>{
        if(downloadItem.isPaused() == true){
          downloadItem.resume();
        }
      })

      downloadItem.on('updated',(e,state)=>{
        if(state == 'interrupted'){

          dialog.showMessageBox(mainWindow, {
            icon:nativeImage.createFromDataURL(defaultPic.image),
            message:"Download failed, Please check your network.",

          });

        } else if(state == 'progressing'){
          event.sender.send('downloading',downloadItem.getReceivedBytes())
         
          var total = downloadItem.getTotalBytes();
          event.sender.send('totaldownload',total)
          mainWindow.setProgressBar(downloadItem.getReceivedBytes()/downloadItem.getTotalBytes())
          event.sender.send('progressbytes',`${downloadItem.getReceivedBytes()/downloadItem.getTotalBytes()}`)
        }
      })

      downloadItem.once('done', (eve, state) => {
        if (state === 'completed') {
          event.sender.send('downloadcompleted','active');
       event.preventDefault()
        // event.stopImmediatePropagation()
        //  dialog.showMessageBox(mainWindow,{
        //      message:`Download was successfull\n File save in ${downloadItem.getSavePath()} `,
        //      icon:nativeImage.createFromDataURL(defaultPic.image),
        //     //  buttons:['OK']
        //  })
        } else {
          dialog.showErrorBox("Error",`Download Failed  ${state}`)
        }
      })

  })

});
/**
 * checking connectivity
 */
  ipcMain.on('checkconnectivity',(e,args)=>{
   var action  = dialog.showMessageBoxSync(mainWindow,{
      title:"Network Connectivity",
      message:"No internet, Check your connectivity",
      icon:icon,
      buttons:['Okay, I got it'],
      
    })
    
  })
  // mainWindow.setProgressBar();
  mainWindow.maximize();
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
 /**
  * create help window
  */
 const createHelpWindow = ()=>{
  helpWindow = new BrowserWindow({
    width:630,
    height:670,
    maxHeight:800,
    maxWidth:800,
    minHeight:600,
    minWidth:400,
    resizable:false,
    maximizable:false,
    backgroundColor:'#00000062',
    frame:false,
    // parent:mainWindow,
    webPreferences:{
      // preload:join(__dirname,'./components/preload.js'),
      nodeIntegration:true,
      enableRemoteModule:true,
      contextIsolation:false
    }
  });
  // helpWindow.webContents.openDevTools();
  helpWindow.loadFile(join(__dirname,'./components/index.html'))
  ipcMain.on('close-help',(e,args)=>{
    helpWindow.close();
  })
 }
  // lanch app when ready
app.whenReady().then(()=>{
  var menu = Menu.buildFromTemplate([
    {
      label:"LW-Ziki Amp"
    },
    {label:"Tools",submenu:[
    //   // {label:"Exit",accelerator:"Ctrl + Q",click:()=> app.quit()},
    //   // {label:"Reload",accelerator:"F8",role:"reload"},
      {label:"OpendevTools",accelerator:"F12",role:"toggleDevTools"},
    //   {label:"Help",accelerator:"Ctrl + H",click:()=> openHelp()}
    ]},
  ]);

  Menu.setApplicationMenu(menu);
  createWindow();
  ipcMain.on('showHelp',(e,args)=>{
    setTimeout(() => {
        createHelpWindow()
     }, 40000);
  })
 ipcMain.on('triggerHelp',(e,args)=>{
   createHelpWindow()
 })
 
 let tray = new Tray(icon);
  
  tray.setToolTip('Lw-Ziki Amp');
  tray.setContextMenu(Menu.buildFromTemplate([
    {label:"DevTools",accelerator:"F12",role:"toggleDevTools"},

  ]));
});
/***
 * IPC messages
 */
 autoUpdater.setFeedURL('https://snapcraft.io/ziki');
autoUpdater.on('update-available',()=>{
    dialog.showMessageBox(mainWindow,{
      title:'Update Alert',
      message:'kindly look out for the update,to explore more features',
      buttons:['Check Update','Cancel']
    }).then((value)=>{
      switch(value.response){
          case 0:
            shell.openPath('https://snapcraft.io/ziki').then((response)=> Console.prototype.log(response))
      }
    })
})
autoUpdater.on('update-not-available',()=>{
  dialog.showMessageBox(mainWindow,{
    title:'Update Alert',
    message:'It looks like your system is currently up to date',
    buttons:['Okay,got it']
  });
})
autoUpdater.addListener('checking-for-update',()=>{
  autoUpdater.checkForUpdates();
})