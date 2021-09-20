const NodeID3 = require('node-id3');
const fs = require('fs');
const path = require('path');
const defaultPic = require('./default');
const os = require('os');

/**
 * @nCopyright 2021 Mugamba Bruno
 * AudioQuery library to fetch audio tracks basing on title,album and artist,
 * One can be able to extract embeded image data,create ,remove playlist
 */
class AudioQuery{
    constructor(paths){
        this.folderPath = paths;
        /**
         * 
         * @param {*} imageData 
         * @returns This function to get embeded track artwork in form of an array buffer and converts its  to base64Image string.
         */
        this.base64Image = (imageData)=>{
            if(imageData == undefined){
                return defaultPic.image;
            }else{
            var raw = imageData.imageBuffer;
            var base64String  = '';
            for (let index = 0; index < raw.length; index++) {
                base64String += String.fromCharCode(raw[index]);
                
            }
            var image = "data:"+imageData.mime+";base64,"+window.btoa(base64String);
            return image;
        }
      }
      /**
       * This is container for playlists
       */
    
    /**
     * This function fill the gap of tracks without embeded tiles
     */
    this.getTitle = (tags = NodeID3.read() ,file = '',ext)=>{
        return (tags.title == undefined)? file.replace(`${ext}`,""):tags.title;
    }
    /**
     * This function to show artist name available or not
     * */ 
     this.getArtist = (tags = NodeID3.read() )=>{
        return (tags.artist == undefined)?'Unknown artist': tags.artist;
    }

     /**
     * This function to show album name available or not
     * */ 
      this.getAlbum = (tags = NodeID3.read() )=>{
        return (tags.album == undefined)?'Unknown album':tags.album;
      } 
      
      /**
      * This function to show genre name available or not
      * */ 
       this.getGenre = (tags = NodeID3.read() )=>{
       return (tags.genre == undefined)?'Unknown genre':tags.genre;
     }
  /**
     * This function to show album name available or not
     * */ 
   this.getYear = (tags = NodeID3.read() )=>{
    return (tags.year == undefined)?'Unknown year':tags.year;
  }
    /**
     * This function to show album name available or not
     * */ 
     this.getComposer = (tags = NodeID3.read() )=>{
        return  (tags.composer== undefined)?'Unknown composer':tags.composer;
      }

        /**
     * This method to extract lyrics of tracks
     * */ 
     this.filterLyrics = (lyrics = NodeID3.read() )=>{
        return (lyrics.unsynchronisedLyrics == undefined)?'No lyrics found':lyrics.unsynchronisedLyrics;
      }
      /**
       * This method the folder name from a given url
       */
      this.extractFolderName = (url = '')=>{
            return (url.replace(/(.*)[\/\\]/,"").split('.')[0]);
      }
 }
    /**
     * function to fetch all songs
     * */
    fetchAllSongs(){
        /**
         * get the folder in which you want songs to be extracted
         * */
        var folderpath = `${this.folderPath}`;
       
       var rawData = fs.readdirSync(folderpath);
       var allSongs = [];
    //    show music metadata
       (rawData.flat(1)).map((songs)=>{
    
        var tags = NodeID3.read(folderpath+"/"+songs);
        var extension = path.extname(folderpath+"/"+songs);
           var songData = {
                title:this.getTitle(tags,songs,extension),
                genre:this.getGenre(tags),
                album:this.getAlbum(tags),
                lyrics:this.filterLyrics( tags),
                artwork:this.base64Image(tags.image),
                year:this.getYear(tags),
                artist:this.getArtist(tags),
                path :`file://${folderpath}/${songs}`,
                composer:this.getComposer(tags),
            }
            allSongs.push(songData);
       });
    // }
      return allSongs;
    }
    /**
     * function to fetch all albums
     * */
    fetchAlbums(){
        var folder = `${this.folderPath}`;
        var rawData = fs.readdirSync(folder);
        var albums = [];
        rawData.map((songs,index)=>{
            var tags = NodeID3.read(folder+"/"+songs)
            if(tags.album == undefined){
                return;
            }else{
                var songData = {
                    title:this.getAlbum(tags), 
                    numberOfTracks:()=>{
                        var counter = 1;
                        if(tags[index].album == tags[index+1].album) counter++;
                        console.log(counter)
                    },                
                    artWork:this.base64Image(tags.image),
                };
                songData.numberOfTracks;
                albums.push(songData);
               
            }
        })
        return albums;
    }
    /**
     * function to get songs from albums
     *  */ 
    fetchSongsAlbum(albumname){
        var folder = `${this.folderPath}`;
        var albumSongs = [];
        var rawData = fs.readdirSync(folder);
        rawData.map((songs)=>{
            var tags = NodeID3.read(folder+"/"+songs)
            if(tags.album == albumname){
                var artData = {};
                artData.title = tags.title;
                artData.artist = tags.artist;
                artData.path = `file://${folder}/${songs}`;
                artData.artWork = this.base64Image(tags.image)
                albumSongs.push(artData);
            }
        });
        return albumSongs;
    }
    /**
     * function to get artists
     * */
    fetchArtists(){
        var artist = [];
        var folder = `${this.folderPath}`;
        var rawData = fs.readdirSync(folder);
        rawData.map((songs)=>{
            var tags = NodeID3.read(folder+"/"+songs)
            if(tags.artist == undefined){
                return;
            }else{
                var artData = {};
                artData.title = this.getArtist(tags);
                artData.artWork = this.base64Image(tags.image)
                artist.push(artData);
            }
        })
        return artist;
    }
    /**
     * function to get songs from artist
     * */
    fetchSongArtist(artistname){
        var artistSongs = [];
        var folder = `${this.folderPath}`;
        var rawData = fs.readdirSync(folder);
        rawData.map((songs,index)=>{
            var tags = NodeID3.read(folder+"/"+songs)
            var extension = path.extname(folder+"/"+songs)
            if(tags.artist == artistname){
                var artData = {
                    title:this.getTitle(tags,songs,extension),
                    genre:this.getGenre(tags),
                    album:this.getAlbum(tags),
                    artWork:this.base64Image(tags.image),
                    year:this.getYear(tags),
                    artist:this.getArtist(tags),
                    path :`file://${folderpath}/${songs}`,
                    composer:this.getComposer(tags),
                }
                artistSongs.push(artData);
            }
        })
       return artistSongs;
    }
    /**
     * 
     *  function to fetch all genres
     */
    fetchGenres(){
        var genres = [];
        var folder = `${this.folderPath}`;
        var rawData = fs.readdirSync(folder);
        rawData.map((songs,index)=>{
            var tags = NodeID3.read(folder+"/"+songs)
            if(tags.genre == undefined){
               return;
            }else{
                var artData = {
                    title:this.getGenre(tags),
                    artWork:this.base64Image(tags.image)
                }
                genres.push(artData);
            }
        })
        return genres;
    }
    /** 
     * 
     *  function get tracks from genres
     * */
    fetchSongsGenre(){
        var songGenres = []
        var folder = `${this.folderPath}`;
        var rawData = fs.readdirSync(folder);
        rawData.map((songs,index)=>{
            var tags = NodeID3.read(folder+"/"+songs)
            if(tags.artist == artistname){
                var artData = {};
                artData.title = tags.title;
                artData.artist = tags.artist;
                artData.path = `file://${folder}/${songs}`;
                artData.lyrics = tags.unsynchronisedLyrics.text;
                artData.artWork = this.base64Image(tags.image)
                artData.composer = tags.composer;
                songGenres.push(artData);
            }
        })
        return songGenres;
    }
    /* * 
    function to get folders
    
    */
    fetchFolders(){
        var url = `${this.folderPath}`;
       var directory = fs.readdirSync(url)
       var isD = fs.statSync(url).isDirectory();
       if(isD == true) return directory;
        
    }
    /** 
     *  function to get songs from named folders
     * */
    fetchSongsFolder(foldername){
        var songfolder = [];
        var folder = `${os.homedir()}/Music/${foldername}`;
        var rawData = fs.readdirSync(folder);
        rawData.map((songs)=>{
            var tags = NodeID3.read(folder+"/"+songs)
                var artData = {};
                artData.title = tags.title;
                artData.path = `file://${folder}/${songs}`;
                artData.artist = tags.artist;
                artData.lyrics = tags.unsynchronisedLyrics;
                artData.artWork = this.base64Image(tags.image)
                artData.composer = tags.composer;
                songfolder.push(artData);
            
        })
        
        return songfolder;
    }
    /**
     * Here your able to create playlist 
     * */
    createPlaylist(playlistName){
        var url = `${process.cwd()}/database/database.json`;
        var storage = JSON.parse(fs.readFileSync(url))
        var playlist = {
            name:playlistName,
            directory:`${process.cwd()}`,
            createdAt:`${new Date()}`,
            tracks:[]
        };
        storage.playlists.push(playlist)
        fs.writeFileSync(url,JSON.stringify(storage))
        
    }
    /**
     * This method removes a playlist selected.
     */
    removePlaylist(start = 0,end = 0){ // TODO remove playlist
        var url = `${process.cwd()}/database/database.json`;
        var storage = JSON.parse(fs.readFileSync(url));
        storage.playlists.splice(start,end);
        fs.writeFileSync(url,JSON.stringify(storage))
    }
    /***
     * This method aids in adding tracks to a particular playlist
     */
    addSongToPlaylist(playlistName = '',tracks){
        var url = `${process.cwd()}/database/database.json`;
        var storage = JSON.parse(fs.readFileSync(url));
    (storage.playlists).map((data) => {
    //   if(data.name == playlistName) return (data.name);
        if((data.name) == playlistName){
            (data.tracks).push(tracks)
        }
    })
    //   storage.playlists.tracks.push(tracks);
        fs.writeFileSync(url,JSON.stringify(storage))
    }
    /**
     * This remove a song from a specified playlist
     */
    removeSongFromPlaylist(playlistName = '',start = 0,end = 0){
        var url = `${process.cwd()}/database/database.json`;
        var storage = JSON.parse(fs.readFileSync(url));
      if(storage.playlists.name == playlistName) storage.playlists.tracks.splice(start,end);
        fs.writeFileSync(url,JSON.stringify(storage));
    }
    /**
     * This returns currently stored playlist
     */
    fetchPlaylist(){
        var url = `${process.cwd()}/database/database.json`;
        var storage = JSON.parse(fs.readFileSync(url));
      return  (storage.playlists).flat(1);
    }
    /**
     * This methods queries data from artists using artist name
     */
    searchSongsFromArtists(){} //TODO searchfromArtist
    /**
     * This method extracts songs from all sections using either title  or artist name
     */
    searchSongs(query = ''){ // TODO search from all sectors
        
        var rawData = this.fetchAllSongs();
      return  rawData.filter((queried) => queried.title == query)
    }
    /**
     * This method searches songs from folders using song title
     */
    searchSongsFromFolder(){

    }
}
module.exports  = AudioQuery;