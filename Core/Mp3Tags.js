const NodeID3 = require("node-id3");
const $ = require("jquery");
const { ipcRenderer } = require("electron/renderer");
const gis = require('g-i-s');
const emoji = require('emojis-list');
const isOnline = require("is-online");
// console.log(emoji)
var artWork = '',songUrl = '';
ipcRenderer.on('getPath',(e,args)=>{
    e.preventDefault();
    artWork = args.artwork;
    songUrl = args.path;
})
$('.tags-edit-btn').on('click',function(){
    var path = ($('.view').text()).replace('file://','');
    var tags = NodeID3.read(path);
    // console.log(tags.time)
$('.tags-artwork img').attr('src',artWork)
$('.tags-panel-body input').eq(0).val(tags.title)
$('.tags-panel-body input').eq(1).val(tags.artist)
$('.tags-panel-body input').eq(2).val(tags.genre)
$('.tags-panel-body input').eq(3).val(tags.album)
    // console.log(nativeImage.createFromDataURL(args.artwork).toDataURL())
$('.save-changes').on('click',function(){
    var title,artist,album,genre;
   title = $('.tags-panel-body input').eq(0).val();
   artist = $('.tags-panel-body input').eq(1).val();
   genre = $('.tags-panel-body input').eq(2).val();
   album =  $('.tags-panel-body input').eq(3).val();
  
    const id3 = {
        // APIC:`${args.artwork}`,
        TIT2:`${title}`,
        TPE1:`${artist}`,
        TALB:`${album}`,
        TCON:`${genre}`,
    }
   NodeID3.update(id3,`${path}`);
   ipcRenderer.send('reloadToSave');
  })


  /**
 * Update Cover art
 */
$('.updateArtWork').on('click',function(){
    ipcRenderer.send('getartWork');
    ipcRenderer.on('sendartWork',(e,args)=>{
        // console.log(args);
        var title,artist,album,genre;
        title = $('.tags-panel-body input').eq(0).val();
        artist = $('.tags-panel-body input').eq(1).val();
        genre = $('.tags-panel-body input').eq(2).val();
        album =  $('.tags-panel-body input').eq(3).val();
       
         const id3 = {
             APIC:`${args}`,
             TIT2:`${title}`,
             TPE1:`${artist}`,
             TALB:`${album}`,
             TCON:`${genre}`,
         }
        $('.tags-img').attr('src',args);
        NodeID3.update(id3,`${path}`);
    })
})
/**
 * Gettings track images online
 */
 async function fetchImages(){
    let online = await isOnline();
    if (online == false) {
        console.log('offline')
        $('<p></p>').text(
           `😓 Sorry, but  your currently offline`
        ).css({
            "color": "#ffffff",
            "fontSize": "20px",
            "fontFamily": "Ubuntu"
        }).addClass('pick-msg').appendTo('.picker-wrapper')
    } else {
        $('.pick-msg').remove()
        $('<p></p>').text(
            `Loading images, please wait...`
         ).css({
             "color": "#ffffff",
             "fontSize": "20px",
             "fontFamily": "Ubuntu"
         }).addClass('pick-ms').appendTo('.picker-wrapper')
        gis(`${tags.artist}`,(err,data)=>{
            if(err){
                $('<p></p>').text(
                    `${err}`
                 ).css({
                     "color": "#ffffff",
                     "fontSize": "20px",
                     "fontFamily": "Ubuntu"
                 }).addClass('pick-ms').appendTo('.picker-wrapper')
            }
            $('.pick-ms').remove()
            console.log(data)
            var drawImages = function(src){
                var cover =  $('<div></div>').append(
                    $('<img/>').attr('src',src).addClass('new-img')
                ).addClass('new-cover').on('click',function(){

                    let imgsrc = $('.new-img').attr('src').valueOf();
                   $('.tags-img').attr('src',imgsrc);
                   var title,artist,album,genre;
                title = $('.tags-panel-body input').eq(0).val();
                artist = $('.tags-panel-body input').eq(1).val();
                genre = $('.tags-panel-body input').eq(2).val();
                album =  $('.tags-panel-body input').eq(3).val();
       
                    var id3 = {
                        APIC:`${imgsrc}`,
                        TIT2:`${title}`,
                        TPE1:`${artist}`,
                        TALB:`${album}`,
                        TCON:`${genre}`,
                    };
                   NodeID3.update(id3,`${path}`);

                });

                $('.picker-body').append(cover);
            }
            $('.new-cover').remove();
         data.map((image) => drawImages(image.url))
         })
    }
}
    fetchImages();
})
/**
 * show online image picker
 */
 $('.onlineArtWork').on('click',function(){
    $('.picker-wrapper').addClass('active')
    $('.picker-container').addClass('active')
    $('.tags-panel').removeClass('active')
    $('.tags-container').removeClass('active')
    
})
/**'
 * close online image picker
 */
$('.close-online-picker').on('click',function(){
    $('.picker-wrapper').removeClass('active')
    $('.picker-container').removeClass('active')
})

$('.update-image').on('click',function(){
    $('.tags-panel').addClass('active')
    $('.tags-container').addClass('active')
    $('.picker-wrapper').removeClass('active')
    $('.picker-container').removeClass('active')
})