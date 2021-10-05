const { ipcRenderer } = require('electron');
const { getAlbumArt } = require('genius-lyrics-api');
const Lyrics = require('4lyrics');
const isOnline = require('is-online');
const $ = require('jquery');
const NodeID3 = require('node-id3');
const Apis = require('../APIS/Apis');
window.addEventListener('DOMContentLoaded', ()=>{

    $('.close-lyrics').on('click',function(){
     
      $(".lyrics-wrapper").removeClass('active')
    });
    ipcRenderer.on('removeLyrics',(e,args)=>{
      $(".lyrics-wrapper").removeClass("active");
  })
    // ipcRenderer.on('getPath',(e,args)=>{
    //   console.log(args)
    // })
// retrive title and 
$("#lyrics-btn").on('click',function(){
     var artist =  $('.lyric-artist').text();
      var title = $('.lyric-title').text();

  $(".sidebar-data").removeClass("active")
  $(".sidebar-icons").removeClass("active")
  $('.setting').removeClass('active');
  $('.sidebar').removeClass('active');
  $(".lyrics-wrapper").addClass('active');
  
  var url =  ($('.view').text()).replace('file://','');
console.log(url)
     // user notified when offline
  async function showLyrics(){
    var conection = await isOnline();
      if(conection === false){
        var lyrics = NodeID3.read(`${url}`).unsynchronisedLyrics;
        if(lyrics == undefined){
          $(".lyrics")
        .text('No lyrics found');
        }else{
          $(".lyrics").text("Please wait while we load your lyrics....");
            $(".lyrics").text(""); 
          $('.lyrics').append($("<pre></pre>").text(lyrics.text));
        }
       
        // ipcRenderer.send("networkError","OOps its seems you have lost internet connection, trying checking if data bundle is still valid!!!!")
      }else{

        $(".lyrics").text("Please wait while we load your lyrics....");
        Lyrics.musixmatch.getURL(`${title} ${artist}`)
        .then((r) => Lyrics.musixmatch.getLyrics(r))
        .then((lyrics) => {
            
              $(".lyrics").text(""); 
              $('.lyrics').append($("<pre></pre>").text(lyrics));
        }).catch((error)=>{
          console.log(error)
          ipcRenderer.send("noTags",'Failed to fetch lyrics, try to edit your audio tags by adding title of the song and the artist of the song.');
          $(".lyrics").text("");
        }).catch((error) => {
          ipcRenderer.send("networkError",'Failed to load resource: net::ERR_INTERNET_DISCONNECTED');
        })
      }
  };
  showLyrics();
  
      const options = {
        title:title,
        apiKey:Apis.GeniuApi,
        artist:artist,
        optimizeQuery:true
    }
 
  
// user notified when online
      
    


 
    // cover image if needed
    // getAlbumArt(options).then((art)=>{
    //   if(art == null){
       
    //   }else{
    //     $("#trackId").attr("src",art);
    //    $(".swiper-container").css({"backgroundImage": "url("+art+")"});
        
    //     tags.APIC = art;

    //   }
    // })
})

})