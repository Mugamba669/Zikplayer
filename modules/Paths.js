const { remote } = require("electron/renderer");
const { existsSync, writeFileSync, mkdirSync } = require("fs");
const { join } = require('path');
// getApp directory


 const appDir = remote.app.getPath('userData');
 const appSettings = join(appDir,'settings.json');
 const playlists = join(appDir,'playlists.json');
 const musicFolders = join(appDir,'music.json');
 const music = remote.app.getPath('music');
 const cachedFolders = join(appDir,'');
 const downloadDir = join(music,'Lw-Ziki-Amp');
    if(existsSync(musicFolders) == false){
        const database = {
            folders:[]
        };
        writeFileSync(musicFolders,JSON.stringify(database));
    }else{
        console.log('File exists');
    }
/**
 * Downloads folder
 */
    if(existsSync(downloadDir) == false){
        mkdirSync(downloadDir);
    }else{
        console.log('File exists');
    }
// checking is Settings.json exists
if(existsSync(appSettings) == false){
    const settings = {
        themeData:[],
        Equaliser:[],
        UI:[],
        Lyric:[]
    };
    writeFileSync(appSettings,JSON.stringify(settings));
}

// checking is Settings.json exists
if(existsSync(playlists) == false){
    const settings = {
        playlists:[],

    };
    writeFileSync(playlists,JSON.stringify(settings));
}
module.exports = {
    downloadDir:downloadDir,
    musicFolders:musicFolders,
    appSettings:appSettings,
    playlists:playlists,
};

