const { ipcRenderer } = require("electron");
const $ = require("jquery");
require('./Core/utils.js');
require('./Core/lyrics');
require('./Core/Mp3Tags')
require('./server.js')
const { AudioEngine, AudioQuery }= require('./Core/AudioSystem');
const ZPlayer = require("./Core/Zplayer");
const { extname, join } = require('path')
const { audio } = require("./modules/processes.js");
const { readFileSync,existsSync, writeFileSync } =  require('fs');
const { musicFolders } = require("./modules/Paths.js");

var musicContainer = [];
 var route = 0;
 ipcRenderer.send('appPath');

 var folders = (content,value) => {
    var folderIcon = $('<td></td>').addClass('fa fa-folder');
    var name = $('<td></td>').text(content)
    var check =  $('<td></td>').append($('<input/>').attr('type','radio').attr('name','remove').attr('value',value).addClass('rem-folder fa fa-close'));
     $("<tr></tr>").append(folderIcon).addClass('folder-tile').append(name).append(check).appendTo('.folders');
}

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

// var audio = new Audio();
    audio.volume = 0.17;
var engine = new AudioEngine(audio)

// engine.tuneBass("#bass");
engine.tuneBassBooster(".bassboost");
engine.tuneCompressor(".compressor");
engine.adjustBands();
engine.tuneAudioBalance('#balance');
engine.tuneAudioPower('#audioboost');

engine.tuneStereo(".stereo")
engine.tuneRoomSwitch(".room-switch");
// 
    engine.tuneRoomOptions("#r-effects");
engine.tuneRoomEffects('.room-effects');


// (async ()=>{
//     var result = await searchYoutube(
//     `,{q:'migos',part:'snippet',type:'video'});
//     console.log(result)
// })()

$("#eqns").on('input', function() {
    engine.tuneEq($(this).val());
})
/**
 * Initializing the equalizer
 */
var Ziki = new ZPlayer(audio);
Ziki.startPlayer();
Ziki.getProgressData('.progress-bar');
Ziki.getControlButtons(".btn-tn");
Ziki.timeUpdate(".time");
Ziki.getTempo("#ratexp", "#sp-rate");
Ziki.getAudioVolume("#vol-add", "#vol");
Ziki.repeatStopTrack(".repeat-on",".repeat-off",'.mute-on','.mute-off');
Ziki.streamHot100();
/**
 * 
 */
 $('.alert-notification').hide()
/**
 * Control buttons
 */
$('.random-on').hide()
$('.tags-edit-on').hide()

/**
 * tags editing panel
 */
 $('.tags-edit-off').on('click',function(){
    $(this).hide();
    $('.alert-msg').text('Audio tags editor on')
    $('.alert-notification').slideDown(100).delay(4000).slideUp(100)
    $('.btns-container').toggleClass('active');
     $('.btns-opener').toggleClass('active')
     $('.tags-container').addClass('active')
    $('.tags-panel').addClass('active')
    $('.tags-edit-on').show();
})
$('.tags-edit-on').on('click',function(){
    $('.alert-notification').slideDown(100).delay(4000).slideUp(100);
    $('.alert-msg').text('Audio editor off');
    // $('.alert-notification').text('Audio editor off').addClass('active').delay(4000).removeClass('active');
    $(this).hide();
    $('.btns-opener').removeClass('active')
    $('.btns-container').removeClass('active')
    $('.tags-container').addClass('active')
    $('.tags-panel').addClass('active')
    $('.tags-edit-off').show();
})
$('.close-editor').on('click',function(){
    $('.tags-container').removeClass('active')
    $('.tags-panel').removeClass('active')
})
/**
 * buttons drawer openner
 */
$('.btns-opener').on('click',function(){
    $(this).toggleClass('active')
    $('.btns-container').toggleClass('active')
})

window.addEventListener('load',function(){
      console.log(musicFolders)
    // console.log(emoji.flat(1))
       var data =  JSON.parse(readFileSync(`${musicFolders}`));
       if(data.folders.length < 1){
           $("#changelog").show();
           $('.welcome-container').addClass('active');
           $('.welcome-content').addClass('active');
           ipcRenderer.send('showHelp')
           /**
            * Load track for first tym user
            */
               $('.import-folder').on('click',function(){

                   $('.welcome-container').delay(20000).removeClass('active');
                   $('.welcome-content').delay(20000).removeClass('active');
                   
                   var data =  JSON.parse(readFileSync(`${musicFolders}`));

                   ipcRenderer.send('open-music-folder');

                           ipcRenderer.on('musicFiles',(event,args)=>{
                               var paths = args.filePaths[0];

                               if(paths != null ){
                                   data.folders.push(paths);
                                   writeFileSync(`${musicFolders}`,JSON.stringify(data));
                                   folders(paths,`${route}`);
                               /**
                                * Load music files instantly
                                */
                                console.log(new AudioQuery(paths).fetchFolders());
                               var query = new AudioQuery(paths);
                        query.fetchAllSongs().map((songs,index,array) => musicContainer.push(songs));
                   //   console.log(musicContainer)
                        musicContainer.map((songs,index,array) =>  Ziki.getPlaylist(songs,index,array))
                           }
                       })
               })
       }else{
           $('#playlist').click();
           data.folders.map((url)=>{
            console.log(new AudioQuery(url).fetchFolders());
               var query = new AudioQuery(url);
             query.fetchAllSongs().map((songs) => musicContainer.push(songs));
           })
   }
            musicContainer.map((songs,index,array) => Ziki.getPlaylist(songs,index,array));
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

      var data =  JSON.parse(readFileSync(`${musicFolders}`));
      var filepath = args.filePaths[0];

      if(filepath != null){
        data.folders.push(filepath);
        writeFileSync(`${musicFolders}`,JSON.stringify(data))
       folders(args.filePaths[0],`${parseInt(route+=1)}`);

     /**
      * Clear the playlist first the re-render the list
      */
      
   $('.list-tile').remove()
    /**
     * Load music files instantly
     */
    console.log(new AudioQuery(args.filePaths[0]).fetchFolders())
     var query = new AudioQuery(args.filePaths[0]);
      query.fetchAllSongs().map((songs) =>  musicContainer.push(songs));
      musicContainer.map((songs,index,array) => Ziki.getPlaylist(songs,index,array));
  }
})

}) 
/**
 * Refreshing the playlist
 */
$(".refresh").on('click',function(){
    const files =  JSON.parse(readFileSync(`${musicFolders}`))
    console.log('refresh start');

    files.folders.map((url)=>{
    console.log('refreshing')
    console.log(new AudioQuery(args.filePaths[0]).fetchFolders())
        var query = new AudioQuery(url);
      query.fetchAllSongs().map((songs) => musicContainer.push(songs));
    })

     musicContainer.map((songs,index,array) => Ziki.getPlaylist(songs,index,array));
})
 /**
  * 
  *  Closing the plaslist window 
  */

  $('.fab-btn').on('click',function(){
    $(".plist").removeClass('active');
    $(".plist-cont").removeClass('active');
   
  })
/**
 * Add music 
 */
$('.fab-options').on('click',function(){
    $('.add-container').toggleClass('active')
    $('.add-body').toggleClass('active')
})

/**
 * Volume control
 */
$('.show-vol').on('click',function(){
    // console.log(this);
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

       var folder = JSON.parse(readFileSync(`${musicFolders}`));  

     folder.folders.map((name,index) => folders(name,index));
     
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

            if(folder.folders.length < 1){
                ipcRenderer.send('Nofolders',"No more directories to remove")
            }
        if(data.checked){         
            folder.folders.splice($(data).val(),1);
           writeFileSync(`${musicFolders}`,JSON.stringify(folder))    
        }
    })
})



    // $('.bottom-details').scrollLeft() + 800;
    /**
     * Closing the drawer
     */
     $('#playlist').click(function(){
        $('.setting').removeClass('active');
        $('.sidebar').removeClass('active');
    })
       
        /**
         *  open sidebar
         *  */
        $(".setting").on("click",function(){
            $(".sidebar-data").toggleClass("active")
            $(".sidebar-icons").toggleClass("active")
            $(this).toggleClass("active")
            $(".sidebar").toggleClass("active");
    })

/**
 * show visual panel
 */

$('#visual-select').click(function(){
    $('.alert-msg').text('Graphic Visualisers')
    $('.alert-notification').slideDown(100).delay(4000).slideUp(100)
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $('.setting').removeClass('active');
    $('.sidebar').removeClass('active');
    $('.body').addClass('active')
    $('.Visualbox').addClass('active')
})

/**
 * show settings panel
 */
 $('#app-settings').click(function(){
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $('.setting').removeClass('active');
    $('.sidebar').removeClass('active');
    $('.app-set-cont').addClass('active')
    $('.settings-cont').addClass('active')
})
/**
 * 
 * close settings panel
 */
 $('.close-settings').on('click',function(){
    $('.app-set-cont').removeClass('active')
    $('.settings-cont').removeClass('active')
})
/**
 * Drawing over other apps
 */
$('.draw-over-apps').on('change',function(){
    if($(this).get(0).checked == true){
        ipcRenderer.send('drawOverApps',$(this).get(0).checked);
    }else{
        ipcRenderer.send('drawOverApps',$(this).get(0).checked);
    }
})
/**
 * Animate scrolling the text
 */

 $.fn.scrollText = function () {
    var options = $.extend({
        speed: 80
    }, arguments[0] || {});

    return this.each(function () {
        var el = $(this);
        var scrollx  = 0;
        if (el.width() > $('.bottom-details').width()) {
            el.css({
                "transition":"0.3s ease-in-out"
            })
          setInterval(frame, options.speed); 
               function frame(){
                   if(scrollx == el.width()){
                    $('.bottom-details').delay(0).get(0).scroll({left:scrollx -= 800,behavior:'smooth'});                      
                   
                    scrollx = 0;
                   }else{
                          scrollx += 4;
                        $('.bottom-details').delay(20).get(0).scroll({left:scrollx,behavior:'smooth'});
                      
                   }
               }
        }
    });
};



$(audio).on('play',function () {
   $('.dt').scrollText();
});
/**
 * Open streaming
 */
$('.streaming-btn').on('click',function(){
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $('.setting').removeClass('active');
    $('.sidebar').removeClass('active');
    $('.streaming-conatiner').addClass('active')
})
/**
 * display hot 100
 */
$('.btn-hot-100').on('click',function(){
    Ziki.streamHot100();
})
/**search your favorite jam from nowviba  */
$('.search').on('input',function(){
    Ziki.searchSongs($(this).val());
})
$('.find').on('click',function(){
    Ziki.searchSongs($(this).val());
})
/**
 * Close streaming panel
 */
$('.close-streaming').on('click',function(){
    $('.streaming-conatiner').removeClass('active')
})
/******************************** */
/**
 * pause or resume download
 */
 $('.dw-pause').show()
 $('.dw-resume').hide()

 $('.dw-pause').on('click',function(){
     $(this).hide();
     $('.dw-resume').show()
     ipcRenderer.send('pausedownload');
 });
 $('.dw-resume').on('click',function(){
     $(this).hide();
     $('.dw-pause').show()
     ipcRenderer.send('resumeownload');
 })

 /**
  * Add equalizer
  */
  $('.equalizer-btn').on('click',function(){
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $('.setting').removeClass('active');
    $('.sidebar').removeClass('active');
    $('.eq-cont').addClass('active')
    $('.eq-wrapper').addClass('active')
 })

 $('.close-eq').on('click',function(){
    $('.eq-cont').removeClass('active')
    $('.eq-wrapper').removeClass('active')
 })
 /**
  * Tunning panel
  */
 $('#audiotuning-btn').click(function(){
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $('.setting').removeClass('active');
    $('.sidebar').removeClass('active');
    $('.Tune-container').addClass('active')
    $('.Tune').addClass('active')
 })
 /**
  * Lanch audio tunning panel
  */
 $('.btn-tunning').on('click',function(){
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $('.compress').removeClass('active');
    $('.room-box').removeClass('active');
    $('.Tune').addClass('active')
 })
 $('.close-Tune').click(function(){
     $('.Tune-container').removeClass('active')
     $('.Tune').removeClass('active')
 })
 /**
  * Compressor panel
  */
$('.btn-compress').click(function(){
    $('.compress').addClass('active');
    $('.Tune').removeClass('active')
    $('.room-box').removeClass('active')
})

$('.close-compressor').click(function(){
    $('.compress').removeClass('active');
    $('.Tune-container').removeClass('active')
})
 /**
  * room effects
  */
 $('.close-room').click(function(){
    $('.room-box').removeClass('active');
    $('.Tune-container').removeClass('active')
 })

 $('.btn-room').click(function(){
    $('.room-box').addClass('active');
    $('.compress').removeClass('active');
    $('.Tune').removeClass('active')
})
/**
 * close visualiser's panel
 */
// $('.close-visual-pnnel').on('click',function(){
//     $('.Visualbox .body').removeClass('active')
//     $('.Visualbox').removeClass('active')
// })

/**
 * Show c
 */
$('.triggerChangeLog').on('click',function(){
    $("#changelog").show();
})
/**
 * Show help
 */
$('.triggerHelp').on('click',function(){
    ipcRenderer.send('triggerHelp');
})
