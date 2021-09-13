const NodeID3 = require('node-id3');
const { getLyrics ,getAlbumArt ,getSong, getSongById } = require('genius-lyrics-api');
const customTitlebar = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded', ()=>{
new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex('#000')
});
// retrive title and 
document.querySelector("#lyrics-btn").onclick = function(){
    var artist =  document.querySelector('.lyric-artist').innerHTML;
      var title = document.querySelector('.lyric-title').innerHTML;
     var path = document.querySelector(".view").innerHTML;
      console.log(artist);
      console.log(title);
      console.log("'"+path+"'");

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
      document.querySelector(".lyrics").innerHTML = "";
      document.querySelector(".lyrics").innerHTML = "OOps its seems your currently offline, trying turning on data connection!!!!";
    }
// user notified when online
      
    
document.querySelector(".lyrics").innerHTML = "Please wait while we load your lyrics....";
      getLyrics(options).then((lyrics) => {

        if(lyrics == null){
          document.querySelector(".lyrics").innerHTML = "";
          document.querySelector('.lyrics').innerHTML = 'Failed to fetch lyrics, try to edit your audio tags by adding title of the song and the artist of the song.';
        }else{
          NodeID3.Promise.write({USLT:'"'+lyrics+'"'},"'"+path+"'")
          document.querySelector(".lyrics").innerHTML = "";
          var pre = document.createElement("pre");
          var text = document.createTextNode(lyrics);
          pre.append(text);
          document.querySelector('.lyrics').appendChild(pre);
        }
    })
    // cover image if needed
    getAlbumArt(options).then((art)=>{
      if(art == null){
        // $('<pre></pre>').text('Failed to fetch , try to edit your audio tags by adding title of the song and the artist of the song.').appendTo(".lyrics");
      }else{
        document.querySelector("#trackId").setAttribute("src",art);
       document.querySelector(".swiper-container").style.backgroundImage = "url("+art+")";
        console.log(art)
        tags.APIC = art;
        let rsc = "'"+path+"'";
        // NodeID3.write({APIC:art},rsc);
      }
    })
}

})