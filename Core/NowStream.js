const Axios = require('axios');
const cheerio = require("cheerio");
const $  = require('jquery')
const fs = require('fs');
const path = require('path');
var audio = new Audio();
/**@2021 Mugamba Bruno
 * This library enables one to get music from nowviba.com
 */
  /**
   * 
   * @param {name} this attribute takes in the query and the function return an arrat od results 
   */
   const AudioEngine = require('./AudioEngine');

   var engine = new AudioEngine(audio);
   engine.tuneEq(".bass")
   engine.tuneRoomEffects(".room");
   engine.tuneAudioBalance('.balance')
  audio.volume = 0.17;
  var loadTrack = (trackID) => {
    var trackFile = '';
    const source = `https://www.nowviba.com/music/pages/${trackID}`;
    Axios.get(source).then((response)=>{
        var detail = response.data;
        var ch = cheerio.load(detail);
        trackFile =  ch('.dwnTkNt').attr().href; // song download
      audio.src = (trackFile);
      audio.play()
     
    })

  }

  $('.vol').on('input',function(){
    $('.out').text($(this).val())
    audio.volume = ($(this).val());
})
module.exports = NowStream = {
     
      searchSongs : (query) => {
        // var streams = JSON.parse(fs.readFileSync(path.join(__dirname,"./streams.json")));
      let searchSource = `https://www.nowviba.com/music/pages/search.php?q=${query}`;
        if(typeof query != 'string') throw new Error("Only strings are allowed");

            
        Axios.get(searchSource).then((response)=>{
                var html = response.data;
                const ch = cheerio.load(html);
                var trackList = ch('.container a');
           trackList.map((index,track) => {
               var element = track;
            var more = (`${element.children[0].children[1].attribs.style}`).replace("background-image:","");
               
            var  stream = {
                  title: element.children[0].children[3].children[1].children[0].data,
                  artist:element.children[0].children[3].children[3].children[0].data,
                 coverArt:more.replace('url(',"").replace(");",""),
                  url:element.attribs.href,
                }
               
                Axios.get(`https://www.nowviba.com/music/pages/${stream.url}`).then((response)=>{
                    var detail = response.data;
                    var ch = cheerio.load(detail);

                  let  sourceFile =  ch('.dwnTkNt').attr().href;
  
                var imageCell = $('<td></td>').append($('<img/>').attr('src',`${stream.coverArt}`).css({"width":"70px","height":"70px","borderRadius":"50%"}));
                var artistCell = $('<b></b>').text(stream.artist)
                var nextLine = $('<br/>');
                var titleCell = $("<td></td>").text((stream.title)).append(nextLine).append(artistCell)
               
                var download = $("<td></td>").append($("<a></a>").attr('href',`${sourceFile}`)
                .attr('download',`audio_${Math.floor(Math.random()*1000)}.mp3`)
                .text('Download').css({
                  "textDecoration":"none",
                  "color":"white",
                  "backgroundColor":"#000",
                  "padding":"15px",
                  "borderRadius":"10px"
                }));

                var playBtn = $('<button></button>').css({
                  "width":"50px",
                  "height":"50px",
                  "backgroundColor":"#000",
                  "color":"#fff",
                  "outline": "none",
                  "borderRadius":"50%"
                }).addClass('fa fa-play').on('click',()=>{
                
                loadTrack(stream.url);
                });
              $('<tr></tr>').append(imageCell).append(titleCell).append(playBtn).append(download).appendTo('.playlist');
            })
        })
          //  fs.writeFileSync(path.join(__dirname,"./streams.json"), JSON.stringify(streams)) 
            });
            

      }
     
};

