const { ipcRenderer } = require('electron');
const { getAlbumArt } = require('genius-lyrics-api');
const Lyrics = require('4lyrics')
const $ = require('jquery');
window.addEventListener('DOMContentLoaded', ()=>{
// retrive title and 
$("#lyrics-btn").click(function(){
    var artist =  $('.lyric-artist').text();
      var title = $('.lyric-title').text();
     var path = $(".view").text();


    var tags = {
      APIC:""
    }
      var options = {
        title:title,
        apiKey:'6ggSONbH0WJb2wy9gkzjE80kWTpPn5N_CeKVQoAcSdfrGaMXQHFZ4ocksApJGdCY',
        artist:artist,
        optimizeQuery:true
    }
  // user notified when offline
    window.onoffline = function(e){
      $(".lyrics").text("");
      ipcRenderer.send("networkError","OOps its seems you have lost internet connection, trying checking if data bundle is still valid!!!!")
    }
// user notified when online
      
    
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