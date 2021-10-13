const { remote } = require("electron/renderer");
const { join } = require('path');
const { existsSync, writeFileSync } = require("fs");
/**
 * music download
 *

 * Class to manage downloads
 */
class DownloaderManager{
    constructor(){
        this.Downloader = remote.DownloadItem;
        this.downloadItem = new this.Downloader();
    }

    downloadMp3(file){
        this.downloadItem
    }
}