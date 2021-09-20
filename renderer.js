const { ipcRenderer } = require("electron");
const fs = require("fs");
const os = require("os");
const AudioSystem = require('./Core/AudioSystem')
const ZPlayer = require("./tools/Zplayer");
// console.log(AudioSystem)
// const emoji = require('emojis-list')
/**
 * Helpers
 */
 var musicContainer = [];
 var route = 0;

 var folders = (content,value) => {
    var folderIcon = $('<td></td>').addClass('fa fa-folder');
    var name = $('<td></td>').text(content)
    var check =  $('<td></td>').append($('<input/>').attr('type','radio').attr('name','remove').attr('value',value).addClass('rem-folder fa fa-close'));
    var tr = $("<tr></tr>").append(folderIcon).addClass('folder-tile').append(name).append(check).appendTo('.folders');
}
require('./lyrics');
/*============================*/

/**
 * methods to show progress
 */
 function showLoader(output){         
    $('.text-output').text(output);
}
function hideLoader(list = []){
    $('.success-container').show(function(){
    $('.msg').text("("+parseInt(list.length)+") tracks");
    }).delay(3500).hide(function(){
    $('.loader-container').hide();
    });
}

var audio = new Audio();
    
var engine = new AudioSystem.AudioEngine(audio)

engine.tuneBass("#bass");
engine.tuneBassBooster('#bass-boost');
engine.tuneCompressor(".compressor")
engine.tuneAudioBalance('#balance');
engine.tuneAudioPower('#audio-boost');
engine.tuneMidVocal("#treb-boost");
engine.tuneStereo('#stereo')
engine.tuneRoomSwitch();
$("#r-effects").on('input',function() {
    engine.tuneRoomOptions( $(this).val());
});

engine.tuneRoomEffects('.room-effects');

$("#eqns").on('input', function() {
    engine.tuneEq($(this).val());
})
/**
 * Initializing the equalizer
 */
var eq = new ZPlayer(audio);
eq.getFile('#demo');
eq.getProgressData('.progress-bar');
eq.getControlButtons(".btn-tn");
eq.timeUpdate(".time");
eq.getTempo("#rate-xp", "#sp-rate");
eq.getAudioVolume("#vol-add", "#vol");
eq.repeatStopTrack(".repeat-on",".repeat-off",'.mute-on','.mute-off');

// checking whether the database file exists 

    window.addEventListener('load',function(){
        /**
         * create database file
         */
        var database = {
            cachedFolders:[],
            playlist:[]
        }
        if(fs.existsSync(`${os.homedir()}/.ZPlayer/database.json`) == false){
            fs.writeFileSync(`${os.homedir()}/.ZPlayer/database.json`,JSON.stringify(database))
        }
     // console.log(emoji.flat(1))
        var data =  JSON.parse(fs.readFileSync(`${os.homedir()}/.ZPlayer/database.json`));
        if(data.cachedFolders.length < 1){
            $("#changelog").show();
            $('.welcome-container').addClass('active');
            $('.welcome-content').addClass('active');
            /**
 * Load track for first tym user
 */
$('.import-folder').on('click',function(){

    $('.welcome-container').removeClass('active');
    $('.welcome-content').removeClass('active');
    
    var data =  JSON.parse(fs.readFileSync(`${os.homedir()}/.ZPlayer/database.json`));

    ipcRenderer.send('open-music-folder');

            ipcRenderer.on('musicFiles',(event,args)=>{
                var paths = args.filePaths[0];
                  data.cachedFolders.push(paths);
                fs.writeFileSync(`${os.homedir()}/.ZPlayer/database.json`,JSON.stringify(data));
                folders(args.filePaths[0],`${route}`);
                /**
                 * Load music files instantly
                 */
                 var query = new AudioSystem.AudioQuery(paths);
                 var allMusic = query.fetchAllSongs();
                allMusic.flat(1).map((songs,index,array) => musicContainer.push(songs));
                musicContainer.flat(1).map((songs,index,array) =>{
                    $('.loader-container').show();
                 (index < (array.length -1))?showLoader(songs.title):hideLoader(array);
                 eq.getPlaylist(songs,index,array)
                })
        })
})
        }else{
            data.cachedFolders.map((url)=>{
                var query = new AudioSystem.AudioQuery(url);
                var allMusic = query.fetchAllSongs();
                allMusic.map((songs) => musicContainer.push(songs))
        })
    }
    musicContainer.map((songs,index,array) =>{
        $('.loader-container').show();
         (index < (array.length -1)) ? showLoader(songs.title) : hideLoader(array)
         eq.getPlaylist(songs,index,array);
    })   
},false);


/**
 * loader panel
 */
$('.loader-container').hide();
$('.success-container').hide();

$('.add-folder').on('click',function(){

    $('.add-container').toggleClass('active')
    $('.add-body').toggleClass('active');
    /**
     * trigger the dialog to add music
     */
    ipcRenderer.send('open-music-folder');
  

/**
 * Render imported music
 */

 ipcRenderer.on('musicFiles',(event,args)=>{
    // console.log(args)

      var data =  JSON.parse(fs.readFileSync(`${os.homedir()}/.ZPlayer/database.json`));
      var filepath = args.filePaths[0];
      data.cachedFolders.push(filepath);

    fs.writeFileSync(`${os.homedir()}/.ZPlayer/database.json`,JSON.stringify(data))
    // alert(`${route+=1}`)
   folders(args.filePaths[0],`${route+=1}`);
   $('.list-tile').remove()
    /**
     * Load music files instantly
     */
     var query = new AudioSystem.AudioQuery(args.filePaths[0]);
     var allMusic = query.fetchAllSongs();
 allMusic.map((songs) => musicContainer.push(songs));
 musicContainer.map((songs,index,array) =>{
    eq.getPlaylist(songs,index,array)
    $('.loader-container').show();
            (index < (array.length -1)) ? showLoader(songs.title) : hideLoader(array)
            
    });
})

}) 


 /**
  * 
  * @param {close} Closing the plaslist window 
  */

  $('.fab-btn').on('click',function(){
    $(".plist").removeClass("w3-show").addClass('w3-hide');
   
  })
/**
 * Add music 
 */
$('.fab-options').on('click',function(){
    $(this).toggleClass('fa-times').toggleClass('fa-plus')
    $('.add-container').toggleClass('active')
    $('.add-body').toggleClass('active')
})
/**
 * 
 */
$('.lyrics-container').click(function(){
    $(this).fadeOut()
})
/**
 * Volume control
 */
$('.show-vol').on('click',function(){
    console.log(this);
    $('.vol-panel').toggleClass('active')
    $('.vol-container').toggleClass('active')
})
$('.close-panel').on('click',function(){
    $('.vol-container').removeClass('active');
    $('.vol-panel').toggleClass('active')
})

/**
 * Add Music Folder and remove it as well
 */

       var folder = JSON.parse(fs.readFileSync(`${os.homedir()}/.ZPlayer/database.json`));  

     folder.cachedFolders.map((name,index) => folders(name,index));
     
     $('.rem-folder').map((index,dom) => {

     $(dom).change(function() {
         if(this.checked){
           $('.folders tr').eq($(dom).val()).hide();
         }
     })
      
   })
   
    $('.remove-folder').on('click',function(){
        $('.add-container').toggleClass('active')
         $('.add-body').toggleClass('active')

        $('.rem-folder').each((index,data) => {

            if(folder.cachedFolders.legnth < 1){
                ipcRenderer.send('Nofolders',"No more directories to remove")
            }
        if(data.checked){
            console.log(data.checked)
            console.log($(data).val())           
            folder.cachedFolders.splice($(data).val(),1);
           fs.writeFileSync(`${os.homedir()}/.ZPlayer/database.json`,JSON.stringify(folder))            

        }
    })
    })

