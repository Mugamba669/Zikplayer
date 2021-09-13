// test app
const { BrowserWindow, app, Menu, dialog } = require('electron');
const path = require('path');

function createWindow(){
  const   mainWindow = new BrowserWindow({
        title:"IPC Messaging",
        width:900,
        height:400,
        // maximizable:false,
        // resizable:false,
        // alwaysOnTop:true,
        show:true,
        webPreferences:{
            preload:path.join(__dirname,"./preload.js")
        }
    })
    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools()
 
}

let template = [{
  label:"Tags",
  submenu:[{
    label:"Edit Audio tags",
    click:function(){
     tagWindow();
   }
  },{
   label:"Load Web Version",
   accelerator:"Alt+W",
   click:function(){
     shell.showItemInFolder('/')
   },
   
 },{
   label:"Reload",
   role:"reload",
   accelerator:"Ctrl+R"
 },{
   label:"DevOtions",
   accelerator:"F12",
   role:'toggleDevTools'
  }],
  
},{
  label:"Import",
  submenu:[{
     label:"Load one file",
     accelerator:"Ctl+D",
     click:function(){
      dialog.showOpenDialog({
        title:"Select Track",
        properties:['openFile'],
        defaultPath:"~/Music/",
        filters:[{name:'Audio',extensions:["mp3","wav","mpeg","m4a"]}],
        buttonLabel:"select"
      },function(files){
        console.log(files)
      })
     }
  },{
    label:"Load multiple files",
    accelerator:"Ctrl + M",
    click:()=>{
      dialog.showOpenDialog(new BrowserWindow({
        alwaysOnTop:true,
        title:"Selected Files",
        width:400,
        height:400,
        autoHideMenuBar:true,
        maximizable:false,
        resizable:false,
       webPreferences:{
         preload:path.join(__dirname,"/index.html")
       }
       }).loadURL("index.html"),{
        properties:["multiSelections"],
        defaultPath:"~/Music/",
        filters:[{name:"Audio",extensions:["mp3","wav","m4a","mpeg"]}]
      },function(files){
        console.log(files)
      })
    }
  },{
    label:"Delete",
    accelerator:"delete",
    click:()=>{
      dialog.showMessageBox({
        type:"info",
        title:"Delete",
        checkboxLabel:"False",
        buttons:["Cancel","Delete"],
        checkboxChecked:false,
        detail:"You are about to parmaantly delete this file",
        visibleOnAllWorkspaces:true
      })
    }
  }]
}];
app.whenReady().then(()=>{
    createWindow();
})

    app.on('activate', function () {
      let menu =  Menu.buildFromTemplate(template);
      Menu.getApplicationMenu(menu);
      })


