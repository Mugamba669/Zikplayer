'use strict';
class Equalizer {

    constructor() {
            this.crossAudio = new Audio();
            this.audio = new Audio();
            this.audioCtx = new AudioContext();
            this.h = 0;
            this.playing = true;
            this.srcURL = function(src){
                return URL.createObjectURL(src)
            }
            this._ = function(selector) {
                return document.querySelector(selector);
            }
            this.q = function(select) {
                return document.querySelectorAll(select);
            }
            window.onload = ()=>{
                this._('#trackId').style.animationPlayState = 'paused';
                $('.btn-fab').addClass('active');
            }
            this.audio.onpause = ()=>{
                this.playing = false;
                this._('.title').classList.remove('active');
                this._('.artist').classList.remove('active');
                this._('.album').classList.remove('active');
                this._('.size').classList.remove('active');
                this._('.separator').classList.remove('active');
                this._('.separator2').classList.remove('active');
                this._('.details').classList.remove('active');
                this._('.bottom-details').classList.remove('active');
                this._('#trackId').style.animationPlayState = 'paused';
                this._('.image-container').classList.remove('active');
            }

            this.audio.onended = ()=>{
                this.playing = false;
                this._('.title').classList.remove('active');
                this._('.artist').classList.remove('active');
                this._('.album').classList.remove('active');
                this._('.size').classList.remove('active');
                this._('.separator').classList.remove('active');
                this._('.separator2').classList.remove('active');
                this._('.details').classList.remove('active');
                this._('.bottom-details').classList.remove('active');
                this._('.image-container').classList.remove('active');
                this._('#trackId').style.animationPlayState = 'paused';
            }
            // this.audio.onplay = ()=>{ 
            //     this._('.title').classList.add('active');
            //     this._('.artist').classList.add('active');
            //     this._('.album').classList.add('active');
            //     this._('.size').classList.add('active');
            //     this._('.separator').classList.add('active');
            //     this._('.separator2').classList.add('active');
            //     this._('.details').classList.add('active');
            //     this._('.image-container').classList.add('active');
            //     this._('.bottom-details').classList.add('active');
            //     this._('#trackId').style.animationPlayState = 'running';
            //     // this._('#trackId').style.Transform = 'scale(0.7)';
            // }
            this.upload = function(e) {
                var file = e.currentTarget.files[0];
                this.fileInfo.trackId(file);
                this._("#size").textContent = this.fileInfo.size(file);
            }.bind(this);
           
            // this.fs = require('fs')
            this.tune = () => {
                this._('.title').classList.add('active');
                this._('.artist').classList.add('active');
                this._('.album').classList.add('active');
                this._('.size').classList.add('active');
                this._('.separator').classList.add('active');
                this._('.separator2').classList.add('active');
                this._('.details').classList.add('active');
                this._('.image-container').classList.add('active');
                this._('.bottom-details').classList.add('active');
                this._('#trackId').style.animationPlayState = 'running';
                //Rendering the Canvas Api	
                renderCanvas(this.audioCtx,this.audio);
            }
            $('#pause').hide();
            this._("#play").onclick = () => {
               
               $('#play').hide();
               $('#pause').show();
           }
           this._("#pause").onclick = () => {
              
               $('#play').show();
               $('#pause').hide();
           }
           this.audio.onplaying = ()=>{
               this.playing = true;
               $("#play").hide();
               $("#pause").show();
           }
           this.audio.onended = ()=> {
               $("#play").show()
               $("#pause").hide()
               this.h = 0;
           }
            this.fileInfo = {
                name: function(file) {
                    return file.name;
                },
                size: function(file) {
                    var result = (file.size / (1000 * 1000)).toFixed(2) + "MB";
                    return result;
                },
                type: function(file) {
                    return file.type;
                },
                path:function(file){
                    return file.path;
                },
                trackId: (file) => {
                    var url = URL.createObjectURL(file);
                    $(".view").text(file.path)
                    this.audio.src = url;
                    this.audio.play();
                      // keyboard shotcuts
        $(document).on("keydown",function(e){
            switch (e.key) {
                case " ":
                    // console.log(that.playing)
                    if(this.playing == true){
                        $("#play").show();
                        $("#pause").hide();
                        this.audio.pause();
                        // console.log(that.playing)
                    }else{
                        $("#play").hide();
                        $("#pause").show();
                        this.audio.play();
                        // console.log(that.playing)
                    }
                    break;
            }
        }.bind(this))
                    ID3.loadTags(url, () => {
                        var tags = ID3.getAllTags(url);
                        console.log(tags.genre);

                        $("#can").click(function() {
                            
                            $(".load-body").removeClass("active");
                        });

                    //     this._("#ok").onclick = (e) => {
                    //         let gen = ((tags.genre).toString()).toLowerCase();
                    //         switch (gen) {
                    //             case 'rap':
                    //             case 'hip-hop':
                    //             case 'hip-hop/rap':
                    //                 $("#eqns option").eq(1).text(tags.genre);
                    //                 autoGenre("bass");
                    //                 $(".load-body").removeClass("active");
                    //                 break;

                    //             case 'reggae':
                    //                 $("#eqns option").eq(4).text(tags.genre);
                    //                 autoGenre('reg');
                    //                 $(".load-body").removeClass("active");

                    //                 break;

                    //             case 'pop':
                    //                 $("#eqns option").eq(9).text(tags.genre);
                    //                 autoGenre('pop');
                    //                 $(".load-body").removeClass("active");

                    //                 break;

                    //             case 'latino':
                    //             case 'r&b/soul':
                    //                 $("#eqns option").eq(3).text(tags.genre);
                    //                 autoGenre('rnb');
                    //                 $(".load-body").removeClass("active");

                    //                 break;

                    //             case 'dance':
                    //             case 'alternative':
                    //                 $("#eqns option").eq(6).text(tags.genre);
                    //                 autoGenre('dance');
                    //                 break;

                    //             default:
                    //              autoGenre('heavy');
                    //                 break;
                    //         }
                    //    _(".load-body").classList.remove("active");

                    //     }
                        // display track information
                       this.trackInfo(tags,file)
                       $(".lyric-title").text(`${tags.title}`)
                       $('.lyric-artist').text(tags.artist);
                    //    image manuplation
                        var image = tags.picture;
                      this.base64Image(image);
                    }, {
                        dataReader: FileAPIReader(file),
                        tags: ["title", "artist","lyrics", "picture", "genre"]
                    });
                }
            };
            
            this.trackInfo = (tags,file)=>{
                
                // track title
               switch (tags.title) {
                   case undefined:
                       this._("#title").textContent = this.fileInfo.name(file);
                       break;

                   default:
                       this._("#title").textContent = tags.title;
                       break;
               }
            //    dispaly track artist
               switch (tags.artist) {
                   case undefined:
                    this._("#artist").textContent = "Unknown artist";
                       break;

                   default:
                       this._("#artist").textContent = tags.artist;
                       break;
               }
            //    display track album
               switch (tags.album) {
                   case undefined:
                       this._("#album").textContent = "Unknown album";
                       break;

                   default:
                       this._("#album").textContent = tags.album;
                       break;
               }
            }
            this.listTracks = (title,file)=>{
                switch (title) {
                    case undefined:
                        return this.fileInfo.name(file);
 
                    default:
                        return title;
                }
            }
            this.base64Image = (image)=>{
               if (image) {
                   var base64String = '';
                   for (var i = 0; i < image.data.length; i++) {
                       base64String += String.fromCharCode(image.data[i]);
                   }
                   this._("#trackId").src = "data:" + image.format + ";base64," + window.btoa(base64String);
                   this._(".swiper-container").style.backgroundImage = "url(data:" + image.format + ";base64," + window.btoa(base64String) + ")";
               } else {
                   this._("#trackId").src = defaultPic.image;
                   this._(".swiper-container").style.backgroundImage = "url(" + defaultPic.image + ")";
               }
            }
            this.base64Cover = (image)=>{
                if (image) {
                    var base64String = '';
                    for (var i = 0; i < image.data.length; i++) {
                        base64String += String.fromCharCode(image.data[i]);
                    }
                    return "data:" + image.format + ";base64," + window.btoa(base64String);
                
                } else {
                    return defaultPic.image;
                    
                }
            }
           
        }
        //Equalizer methods
    getFile(selector) {
        // loading one track at a time
        this._(selector).addEventListener('change', this.upload, false);
        // trigglering visualizers when the audio starts playing
        this.audio.addEventListener('playing', this.tune,false)
    }
    repeatStopTrack(a, b,c,d) {
        var that = this;
        // repeating current track
       $(a).show();
       $(b).hide();
        $(a).click(function() {
            $(this).hide();
            $(b).show().addClass('w3-black');
            that.audio.loop = true;
            // alert("clicked");
        });

        $(b).click(function() {
            $(this).hide().removeClass('w3-black');
            $(a).show();
            // alert("clicked");
            that.audio.loop = false;
        });
        // muting current track  
        $(d).hide();
        $(c).click(function(){
            $(this).hide()
            $(d).show().addClass('w3-black')
            that.audio.muted = true;
        });
        /* un mute */
        $(d).click(function(){
            $(this).hide()
            $(c).show()
            that.audio.muted = false;
        });

    }
    getProgressData(ql) {
        setInterval(() => {
            this._(ql).value = this.audio.currentTime;
            this._(ql).max = this.audio.duration;
        }, 500);
        //value of progress bar
        this._(ql).addEventListener('change', function() {
            this.audio.currentTime = this._(ql).value;
        }.bind(this), false);

    }
    getControlButtons(btn) {
        var btns = this.q(btn);
        btns.forEach((item, index) => {
            item.onclick = ()=>{
               if( index == 0){
                $("#play").show()
                $("#pause").hide()
                this.audio.pause();
               } else{
                $("#play").hide()
                $("#pause").show()
                this.audio.play();
               }
             ;
            }
        });
    }
    getTempo(q, t) {
        var slider = this._(q);
        var out = this._(t);
        slider.addEventListener('input', function() {
            out.textContent = parseFloat(slider.value).toFixed(2) + ' xp';
            this.audio.playbackRate = slider.value;
        }.bind(this), false);

    }
    getPlaylist(selector){
        var that = this;
        // hide next prev btns when not in playlist
        $('#nextTrack').hide();
        $('#prevTrack').hide();
    //    show pop up
        $('.loader-container').hide();
        $('.success-container').hide();
        $('.fab-btn').hide();
        // showloader
        function showLoader(output){          
           
            $('.text-output').text(output);
        }
        function hideLoader(time,playlist = []){
            console.info('Tracks loaded '+time+' ms')
            $('.success-container').show(function(){
            document.querySelector('.msg').textContent = " ("+parseInt(playlist.length)+") tracks in "+" "+time+' ms';
            }).delay(3500).hide(function(){
            $('.loader-container').hide();
            });
        }
    
       $(selector).on("change",function(e){
           var files = e.currentTarget.files;
          var playlist = Object.values(files);
         
           playlist.map((data,index,arrayList)=>{
               console.log(data.type)
            //    console.log(data.path)
            //    cover listStyle:
            var time = new Date().getUTCMilliseconds();
            $('.loader-container').show();
if (that.fileInfo.type(data) == "audio/mpeg") {
        var url = that.srcURL(data);
        $('.total').text(index+1);

            ID3.loadTags(url, () => {
                var tags = ID3.getAllTags(url);
                var image = tags.picture;
                var title = tags.title;
   

            (index < (playlist.length -1))?showLoader(that.listTracks(title,data)):hideLoader(time,playlist);

               var cover = $('<img/>').attr('src', that.base64Cover(image)).addClass('coverArt');
               var text = $("<b></b>").text("  "+that.listTracks(title,data))
               $("<p></p>").append(text).addClass('list-tile').prepend(cover).appendTo(".plist-body").click(function(){
        //  track next
        $(".total-tracks").show(function(){
            $(".current").text(`${(index + 1)}`);
            $(".tt-T").text(`${(playlist.length)}`);
        });
        // show track whose lyrics are to be displayed
        $(".lyric-title").text(`${tags.title}`)
        $('.lyric-artist').text(tags.artist);
        

        that.audio.ontimeupdate = ()=> {
            // show next when renaining 41seconds
            var crossfade = that.audio.duration - that.audio.currentTime;
            const result = Math.floor(parseInt(crossfade));
            console.log(result)
                // h += 0.65;
                //     $("pre").css("transform","translateY(-"+h+"px)")
            if(result == 41){
            const sourceCheck  = that.srcURL(arrayList[(index+1)]);
                showNextTrack(sourceCheck,arrayList[(index+1)])
            }
        }
        // keyboard shotcuts
        $(document).on("keydown",function(e){
            switch (e.key) {
                case " ":
                    console.log(that.playing)
                    if(that.playing == true){
                        $("#play").show();
                        $("#pause").hide();
                        that.audio.pause();
                        // console.log(that.playing)
                    }else{
                        $("#play").hide();
                        $("#pause").show();
                        that.audio.play();
                        // console.log(that.playing)
                    }
                    break;
                    case "ArrowRight":
                       $("#nextTrack").click();
                        break;
                    case "ArrowLeft":
                      $("#prevTrack").click();
                        break;
            }
        })
        that.audio.onended =  ()=>{ 
            that.h = 0;
            var next = index+=1;
            if((next +1) > playlist.length){
                $(".bottom-container").show(function(){
                    $(".bottom-sheet").addClass('active',function(){
                        // display name
                            $(".next-track").text('List finished')
                    
                    }).delay(20000).removeClass('active',function(){
                        $(".bottom-container").hide()
                    })
                })
                return true;
            }else{
                $(".current").text(`${(next) + 1 }`);
                $(".tt-T").text(`${(playlist.length)}`);
                    var url = that.srcURL(arrayList[next]);
                    nextTrack(url,arrayList[next])
            }
         }
        // click to next track
        $('#nextTrack').show().on('click',function(){
            that.h = 0;
            var next = index+=1;
            if((next + 1) > playlist.length){
                $(".bottom-container").show(function(){
                    $(".bottom-sheet").addClass('active',function(){
                        // display name
                            $(".next-track").text('List finished')
                    
                    }).delay(20000).removeClass('active',function(){
                        $(".bottom-container").hide()
                    })
                })
            }else{
                $(".current").text(`${(next) + 1 }`);
                $(".tt-T").text(`${(playlist.length)}`);
            
                var url = that.srcURL(arrayList[next]);
                 nextBtnTrack(url,arrayList[next]);
            }
        });
        //  click to back to prev track
        $('#prevTrack').show().on('click',function(){
            that.h = 0;
            var prev = index-=1;
            if(prev < 0){
                $(".bottom-container").show(function(){
                    $(".bottom-sheet").addClass('active',function(){
                        // display name
                            $(".next-track").text('No more previous tracks')
                    
                    }).delay(20000).removeClass('active',function(){
                        $(".bottom-container").hide()
                    })
                })
                return true;
            }else{
                $(".current").text(`${(prev) + 1 }`);
                $(".tt-T").text(`${(playlist.length)}`);
                 var url = that.srcURL(arrayList[prev]);
                prevTrack(url,arrayList[prev]);

            }
        });
                $(".plist").removeClass("w3-show").addClass('w3-hide')
           that._('.title').classList.add('active');
                that._('.artist').classList.add('active');
                that._('.album').classList.add('active');
                that._('.size').classList.add('active');
                that._('.separator').classList.add('active');
                that._('.separator2').classList.add('active');
                that._('.details').classList.add('active');
                that._('.image-container').classList.add('active');
                that._('.bottom-details').classList.add('active');
                that._('#trackId').style.animationPlayState = 'running';
           that._("#size").textContent = that.fileInfo.size(data);
                   that.audio.src = url;
                   console.log(data.path)
                   $(".view").text(data.path)
                   that.audio.play();
                       that.base64Image(tags.picture);
                       that.trackInfo(tags,data);
               });
            
               } , {
                     dataReader: FileAPIReader(data),
                     tags: ["title", "artist", "picture", "album","genre"]
                       });
                    }
           });
           $('.fab-btn').slideDown().on('click',function(){
        $('.plist').click(function(){ $(this).removeClass('w3-show').addClass('w3-hide')});
           
          }).hover(function(){
              $(this).addClass("fa fa-arrow-right");
          })
       });
    //    next track function
    const nextTrack = function(url,data){
       $(".view").text(data.path)
        ID3.loadTags(url, () => {
            var tags = ID3.getAllTags(url);
            var image = tags.picture;
            $(".lyric-title").text(`${tags.title}`)
            $('.lyric-artist').text(tags.artist);
        that.audio.src = url;
        that.audio.play();
        // $(".lyrics-track").text("Lyrics - "+that.listTracks(tags.title,data))

        that.base64Image(image);
        that.trackInfo(tags,data);
        } , {
        dataReader: FileAPIReader(data),
        tags: ["title", "artist", "picture", "album","genre"]
          });
       }

       const nextBtnTrack = function(url,data){
        $(".view").text(data.path)
        ID3.loadTags(url, () => {
            var tags = ID3.getAllTags(url);
            var image = tags.picture;
            $(".lyric-title").text(`${tags.title}`)
            $('.lyric-artist').text(tags.artist);
        that.audio.src = url;
        that.audio.play();
        that.base64Image(image);
        that.trackInfo(tags,data);
        } , {
        dataReader: FileAPIReader(data),
        tags: ["title", "artist", "picture", "album","genre"]
          });
       }
    //    show next track
    function showNextTrack(url,data){
        ID3.loadTags(url, () => {
            var tags = ID3.getAllTags(url);
            var image = tags.picture;
            let base64String = '';

            for (let index = 0; index < image.data.length; index++) {
                base64String += String.fromCharCode(image.data[index]);
            }
            let cover = $("<img/>").attr("src","data:"+image.format+";base64,"+window.btoa(base64String)).addClass('coverArt'); 
            let defaultCover = $("<img/>").attr("src",defaultPic.image).addClass('coverArt');
            
              switch (tags.title) {
                  case undefined:
                    $(".bottom-container").show(function(){
                        $(".bottom-sheet").addClass('active',function(){
                            // display name
                                $(".next-track").text(`${that.fileInfo.name(data)}`).prepend(defaultCover);
                        
                        }).delay(20000).removeClass('active',function(){
                            $(".bottom-container").fadeOut()
                        })
                    })
                    break;
                  default:
                     $(".bottom-container").show(function(){
                        $(".bottom-sheet").addClass('active',function(){
                            // display name
                                $(".next-track").text(`${tags.title}`).prepend(cover);
                        
                        }).delay(20000).removeClass('active',function(){
                            $(".bottom-container").fadeOut()
                        })
                    })
                    break;
              }
        } , {
        dataReader: FileAPIReader(data),
        tags: ["title","picture"]
          });
    }

    //    previous track function
      const prevTrack = function(url,data){
        $(".view").text(data.path)
        ID3.loadTags(url, () => {
            var tags = ID3.getAllTags(url);
            $(".lyric-title").text(`${tags.title}`)
            $('.lyric-artist').text(tags.artist);
            var image = tags.picture;
            // $(".lyrics-track").text("Lyrics - "+that.listTracks(tags.title,data))
        that.audio.src = url;
        that.audio.play();
        that.base64Image(image);
        that.trackInfo(tags,data);
        } , {
        dataReader: FileAPIReader(data),
        tags: ["title", "artist", "picture", "album","genre"]
          });
       }

      
    }
    getAudioVolume(volu, ou) {
        var volume = this._(volu);
        var out = this._(ou);
        volume.addEventListener('input', function() {
            out.textContent = Math.floor(parseFloat(volume.value).toFixed(2) * 100) + ' %';
            this.audio.volume = volume.value;
        }.bind(this), false);
    }
    getImageColorpicker({canvas,renderer,image}){
           var img = document.querySelector(image);
           // img.src = ;
           var canv = document.querySelector(canvas);
           var background = document.querySelector(renderer);
           var context = canv.getContext('2d');
           var x='',y='';

           img.onload = function(){
               img.width = canv.width;
               img.height = canv.height;
               context.drawImage(img,0,0,img.width,img.height);
           }

           img.onclick = function(){
               if(offsetX){
                   x = e.offsetX;
                   y = e.offsetY;
               }
               var imageData = context.getImageData(x,y,1,1);
               var pixel = imageData.data;
               background.style.backgroundColor = 'rgba('+pixel[0]+','+pixel[1]+','+pixel[2]+')';
           }
    }
    timeUpdate(tm) {
        var tmp = this.q(tm);
       var that = this;
        tmp.forEach((item, index) => {
            switch (parseInt(index)) {
                case 0:
                    this.audio.addEventListener('timeupdate', function() {
                        try {
                            new WebkitInputRangeFillLower({
                                selectors:["prog"],
                                color:"gold"
                            });
                            that.h += 0.65;
                            $("pre").css("transform","translateY(-"+that.h+"px)")
                            var sec = parseInt(this.audio.currentTime % 60);
                            var min = parseInt((this.audio.currentTime / 60) % 60);
                            sec < 10 ? item.textContent = min + ':' + '0' + sec : item.textContent = min + ':' + sec;
                        } catch (err) { alert(err); }
                    }.bind(this), false);
                    break;
                    //    Track Duration
                case 1:
                    this.audio.addEventListener('timeupdate', function() {
                        try {
                            var s = parseInt(this.audio.duration % 60);
                            var m = parseInt((this.audio.duration / 60) % 60);
                            s < 10 ? item.textContent = m + ':' + '0' + s : item.textContent = m + ':' + s;
                        } catch (err) { alert(err); }
                    }.bind(this), false);
                    break;
            }
        });
    }
}
var analyser, roomDefault, tuneDefault, eqDefault, monoChannel, stereoChannel, autoGenre;
//------------------Reset room button
_('.room').onclick = function(e) {
        $(".r-content").toggleClass("pop");
        $(".r-container").toggleClass("pop");
        $("#r-done").click(_ => resetEffects());
    }
    //------------------Reset tuning button

_('.tuning').onclick = function(e) {
    $(".t-content").toggleClass("pop");
    $(".t-container").toggleClass("pop");
    $("#t-done").click(_ => resetTune());
}

//------------------Reset equalizer button
_('.eq-reset').addEventListener('click', (e) => {
    $(".pop-content").toggleClass("pop");
    $(".pop-container").toggleClass("pop");
    $("#done").click(_ => resetEq());
});

function resetTune() {
    $(".out-container").show();
    $(".out-content").show();
    var id;
    id ? clearInterval(id) : console.log('again');
    id = setInterval(() => {
        $(".out-container").hide();
        $(".out-content").hide();
    }, 3000);
    $(".t-content").hide();
    $(".t-container").hide();
    tuneDefault();
    _("#rate-xp").value = 1;
    _("#sp-rate").textContent = 1 + " xp";
}

function resetEq() {
    $(".out-container").show();
    $(".out-content").show();
    var id;
    id ? clearInterval(id) : console.log('again');
    id = setInterval(() => {
        $(".out-container").hide();
        $(".out-content").hide();
    }, 3000);
    $(".pop-content").hide();
    $(".pop-container").hide();
    eqDefault();
}

function resetEffects() {
    /*------UI setting----------------*/
    $(".out-container").show();
    $(".out-content").show();
    var id;
    id ? clearInterval(id) : console.log('again');
    id = setInterval(() => {
        $(".out-container").hide();
        $(".out-content").hide();
    }, 3000);
    $(".r-content").hide();
    $(".r-container").hide();
    roomDefault();
}
function _(el) { return document.querySelector(el); }

function q(el) { return document.querySelectorAll(el); }

function renderCanvas(audioCtx,music) {
    try{
    var source = audioCtx.createMediaElementSource(music);
    var stereo = audioCtx.createBiquadFilter();
    var treble = audioCtx.createBiquadFilter();
    var dance = audioCtx.createBiquadFilter();
    var bass = audioCtx.createBiquadFilter();
    var echo = audioCtx.createDelay();
    analyser = audioCtx.createAnalyser();
    var feedback = audioCtx.createGain();
    var audioBoost = audioCtx.createGain();
    var delay1 = audioCtx.createDelay();
    var delay2 = audioCtx.createDelay();
    var size1 = audioCtx.createGain();
    var size2 = audioCtx.createGain();
    var bassBoost = audioCtx.createGain();
    var trebleBoost = audioCtx.createGain();
    var balance = audioCtx.createStereoPanner();
    var splitter = audioCtx.createChannelSplitter(2);
    var merger = audioCtx.createChannelMerger(2);
    var mono = audioCtx.createChannelMerger(1);
    var compressor = audioCtx.createDynamicsCompressor();
    var St_treble = audioCtx.createBiquadFilter();
    var St_treble_boost = audioCtx.createGain();
    var bst;
    //----------Mono---

    monoChannel = function() {
        //source.disconnect(treble);
        source.disconnect(trebleBoost);
        source.connect(mono);
        mono.connect(audioCtx.destination);
    }

    stereoChannel = function() {
            source.disconnect(mono);
        }
        //.......Audio balance...............
    _('#balance').oninput = function() {
        _('#bal').textContent = parseFloat(this.value).toFixed(1) + ' dB';
        balance.pan.setValueAtTime(this.value, audioCtx.currentTime);
    }

    //Audio Gain
    _('#audio-boost').oninput = function() {
            _('#audio-b').textContent = parseFloat(this.value).toFixed(1) + ' dB';
            audioBoost.gain.setValueAtTime(this.value, audioCtx.currentTime);
        }
        //Audio limit
     compressor.attack.setValueAtTime(0.003,audioCtx.currentTime); //(0->1)
	compressor.threshold.setValueAtTime(-24,audioCtx.currentTime);//(0-> -100)
	compressor.knee.setValueAtTime(30,audioCtx.currentTime);//(0 -> 40)
	compressor.ratio.setValueAtTime(12,audioCtx.currentTime);//( 1-> 20)
	compressor.release.setValueAtTime(0.250,audioCtx.currentTime);//(0-> 1)
	
	// settings
	$('#attack').on('input',function(){
        $('#limit').text(parseFloat($(this).val()).toFixed(1) + ' dB');
		compressor.attack.setValueAtTime($(this).val(),audioCtx.currentTime); //(0->1)
	})


	$('#threshold').on('input',function(){
        $('#threshold-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
		compressor.threshold.setValueAtTime($(this).val(),audioCtx.currentTime);//(0-> -100)
	})

	$('#knee').on('input',function(){
        $('#knee-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
		compressor.knee.setValueAtTime($(this).val(),audioCtx.currentTime);//(0 -> 40)
	})


	$('#ratio').on('input',function(){
        $('#ratio-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
		compressor.ratio.setValueAtTime($(this).val(),audioCtx.currentTime);//( 1-> 20)
	})

	$('#release').on('input',function(){
        $('#release-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
		compressor.release.setValueAtTime($(this).val(),audioCtx.currentTime);//(0-> 1)
	});
        // limit.threshold.value = -25;
    // limit.knee.value = 0;
    // limit.attack.value = 0.006;
    // limit.ratio.value = 12;
    // // limit.reduction.value = -1.5;
    // limit.release.value = 0.25;
    /*
        Auto-switch equalizer according to track genres.

    */

    autoGenre = function(genre) {
            _("#eqns").value = genre;
            switchEq(genre);
        }
        //Equalizer nodes
        /*
            Equalizer to default values
        */
    eqDefault = function() {
        _("#bass").value = 0
        _('#bb1').textContent = 0 + " dB";
        treble.type = 'allpass';
        treble.frequency.setValueAtTime(2000, audioCtx.currentTime);;
        _("#treb-boost").value = 0;
        _('#tb2').textContent = 0 + ' dB';
        _('#bass-boost').value = 0;
        trebleBoost.gain.setValueAtTime(0, audioCtx.currentTime);
        bassBoost.gain.setValueAtTime(0, audioCtx.currentTime);
        bass.frequency.setValueAtTime(0, audioCtx.currentTime);
        new WebkitInputRangeFillLower({
            selectors: ["bass-boost", "treb-boost", "treble", "bass"],
            color: '#63cdff'
        });
    }

    /*Treble node */
    _("#eqns").oninput = function() {
        switchEq(this.value);
    }
    var switchEq = function(value) {
            switch (value) {
                case 'normal':
                    treble.type = 'peaking';
                    bass.frequency.value = 20;
                    treble.frequency.value = 200;
                    bassCon(source, bassBoost, bass, audioCtx);
                    bassBoost.gain.setValueAtTime(1.40, audioCtx.currentTime);
                    // stereo.frequency.value = 0.60;
                    _("#bass").value = 40;
                    _('#bb2').textContent = Math.floor(parseFloat(1.4).toFixed(1)) + ' dB';
                    _('#bb1').textContent = Math.floor(parseFloat(40).toFixed(1)) + ' dB';
                    _("#treb-boost").value = 0.60;
                    _("#bass-boost").value = 1.4;
                    bst = 1.4;
                    _('#tb2').textContent = parseFloat(0.6).toFixed(3) + ' dB';
                    compressor.threshold.setValueAtTime(-58.4, audioCtx.currentTime);
                    _('#threshold').value = -58.4
                    _('#threshold-v').textContent = -58.4;
                    break;

                case 'rnb':
                    treble.type = 'lowpass';
                    treble.frequency.value = 60;
                    // treble.Q.value = 7;
                    bass.frequency.value = 58;
                    // bass.gain.value = 15;
                    bassBoost.gain.setValueAtTime(2.0, audioCtx.currentTime);
                    _("#bass-boost").value = 2.0;
                    bst = 2.0;

                    _("#bass").value = 58;
                    _('#bb2').textContent = Math.floor(parseFloat(2.0).toFixed(1)) + ' dB';
                    _('#bb1').textContent = Math.floor(parseFloat(58).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    stereo.frequency.value = 0.8;
                    _('#tb2').textContent = parseFloat(0.8).toFixed(3) + ' dB';
                    _('#threshold').value = 0;
                    _('#threshold-v').textContent = 0;
                    break;

                case 'dance':
                    treble.type = 'lowpass';
                    treble.frequency.value = 50;
                    // treble.gain.value = 16;
                    dance.type = 'bandpass';
                    dance.frequency.value = 100;
                    // dance.Q.value = 7;
                    bass.frequency.value = 46;
                    bassBoost.gain.setValueAtTime(2.7, audioCtx.currentTime);
                    _('#bb2').textContent = Math.floor(parseFloat(2.7).toFixed(2)) + ' dB';
                    _("#bass-boost").value = 2.7;
                      bst = 2.7;
                    _("#bass").value = 50;
                    _('#bb1').textContent = Math.floor(parseFloat(50).toFixed(1)) + ' dB';
                    bassConn(source, bassBoost, bass, dance, audioCtx);
                    stereo.frequency.value = 0.5;
                    _('#tb2').textContent = parseFloat(0.5).toFixed(3) + ' dB';
                    _('#threshold').value = 0;
                    _('#threshold-v').textContent = 0;
                    break;

                case 'reg':
                    treble.type = 'bandpass';
                    treble.frequency.value = 0;
                    bass.frequency.value = 35;
                    // bass.Q.value = 7;
                    bassBoost.gain.setValueAtTime(4.0, audioCtx.currentTime);
                    _("#treb-boost").value = 0.49;
                    stereo.frequency.value = 0.49;
                    _("#bass").value = 35;
                    bst = 4.0;
                    _('#bb2').textContent = Math.floor(parseFloat(4.0).toFixed(1)) + ' dB';
                    _("#bass-boost").value = 4.0;
                    _('#bb1').textContent = Math.floor(parseFloat(35).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(0.49).toFixed(2) + ' dB';
                    compressor.threshold.setValueAtTime(0, audioCtx.currentTime);
                    _('#threshold').value = 0
                    _('#threshold-v').textContent = 0;
                    break;

                case 'bass':
                    treble.type = 'bandpass';
                    treble.frequency.value = 0;
                    bass.frequency.value = 55;
                    // bass.Q.value = 3;
                    bassBoost.gain.setValueAtTime(2.5, audioCtx.currentTime);
                    _("#treb-boost").value = 0.70;
                    stereo.frequency.value = 0.70;
                    _("#bass").value = 55;
                    bst = 2.5;
                    _('#bb2').textContent = Math.floor(parseFloat(3.5).toFixed(1)) + ' dB';
                    _("#bass-boost").value = 2.5;
                    _('#bb1').textContent = Math.floor(parseFloat(58).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(0.7).toFixed(3) + ' dB';
                    _('#threshold').value = 0;
                    _('#threshold-v').textContent = 0;
                    break;

                case 'flat':
                    treble.type = 'peaking';
                    bass.frequency.value = 30;
                    treble.frequency.value = 2000;
                    bassBoost.gain.setValueAtTime(1.0, audioCtx.currentTime);
                    _('#bb2').textContent = Math.floor(parseFloat(1.0).toFixed(1)) + ' dB';
                    _("#bass-boost").value = 0;
                    bst = 1.0;

                    _("#bass").value = 30;
                    _('#bb1').textContent = Math.floor(parseFloat(30).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(1).toFixed(3) + ' dB';
                    break;

                case 'rock':
                    treble.type = 'bandpass';
                    bass.frequency.value = 73;
                    treble.frequency.value = 1800;
                    _("#bass-boost").value = 2.59;
                    bassBoost.gain.setValueAtTime(2.59, audioCtx.currentTime);
                    _('#bb2').textContent = Math.floor(parseFloat(2.59).toFixed(1)) + ' dB';

                    _("#bass").value = 73;
                    _('#bb1').textContent = Math.floor(parseFloat(75).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(0.5).toFixed(3) + ' dB';
                    _("#treb-boost").value = 0.50;
                    stereo.frequency.value = 0.50;
                    compressor.threshold.setValueAtTime(-72.4, audioCtx.currentTime);
                    bst = 2.59;
                    _('#threshold').value = -72.4
                    _('#threshold-v').textContent = -72.4;
                    break;

                case 'heavy':
                    treble.type = 'notch';
                    bass.frequency.value = 60;
                    treble.frequency.value = 160;
                    _("#treb-boost").value = 0.89;
                    stereo.frequency.value = 0.89;

                    bassBoost.gain.setValueAtTime(3.6, audioCtx.currentTime);
                    _('#bb2').textContent = Math.floor(parseFloat(3.6).toFixed(1)) + ' dB';

                    _("#bass").value = 60;
                    _('#bb1').textContent = Math.floor(parseFloat(3.6).toFixed(1)) + ' dB';
                    bst = 3.6;
                    _("#bass-boost").value = 3.6;
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(0.89).toFixed(3) + ' dB';
                    compressor.threshold.setValueAtTime(-58.4, audioCtx.currentTime);
                    _('#threshold').value = -58.4
                    _('#threshold-v').textContent = -58.4;
                    break;

                case 'vocal':
                    treble.type = 'allpass';
                    bass.frequency.value = 0;
                    bassBoost.gain.setValueAtTime(0, audioCtx.currentTime);
                    _('#bb2').textContent = Math.floor(parseFloat(0).toFixed(1)) + ' dB';

                    treble.frequency.value = 2000;
                    _("#bass").value = 0;
                    bst = 0;
                    _('#bb1').textContent = Math.floor(parseFloat(0).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(0).toFixed(2) + ' dB';
                    _("#bass-boost").value = 0;
                    _("#treb-boost").value = 0.8;
                    stereo.frequency.value = 0.8;
                   compressor.threshold.setValueAtTime(-35.6, audioCtx.currentTime);
                    _('#threshold').value = -35.6
                    _('#threshold-v').textContent = -35.6;
                    break;

                case 'pop':
                    treble.type = 'notch';
                    bass.frequency.value = 70;
                    bass.Q.value = 9;
                    treble.frequency.value = 600;
                    _("#treb-boost").value = 0.7;
                    stereo.frequency.value = 0.7;
                    bassBoost.gain.setValueAtTime(2.0, audioCtx.currentTime);
                    _("#bass").value = 70;
                    bst = 2.0;
                    _("#bass-boost").value = 2.0;
                    _('#bb2').textContent = Math.floor(parseFloat(2.0).toFixed(1)) + ' dB';

                    _('#bb1').textContent = Math.floor(parseFloat(70).toFixed(1)) + ' dB';
                    bassCon(source, bassBoost, bass, audioCtx);
                    _('#tb2').textContent = parseFloat(0.7).toFixed(3) + ' dB';
                    _("#treb-boost").value = 0.7;
                    compressor.threshold.setValueAtTime(-58.4, audioCtx.currentTime);
                     _('#threshold').value = -58.4
                     _('#threshold-v').textContent = -58.4;
                    break;
            }
        }
        //  	mid
    stereo.type = 'highpass';
    stereo.frequency.value = 20000;
    trebleBoost.gain.value = 0;
    //Connections	
    source.connect(trebleBoost);
    trebleBoost.connect(stereo);
    stereo.connect(analyser);
    analyser.connect(audioCtx.destination);

    _("#treb-boost").oninput = function() {
        _('#tb2').textContent = parseFloat(this.value).toFixed(3) + ' dB';
        trebleBoost.gain.setValueAtTime(this.value, audioCtx.currentTime);
    }

    /* Stereo*/
    St_treble.type = 'highpass';
    St_treble.frequency.value = 4830.11;
    St_treble.gain.value = 10;
    St_treble.Q.value = 10;

    var valueSt = 0;
    $('#stereo').on('input',function(){
        valueSt = $(this).val();
        $("#st-out").text(parseFloat(valueSt));
        St_treble_boost.gain.value = valueSt;
        source.connect(St_treble)
        St_treble.connect(St_treble_boost)
        St_treble_boost.connect(analyser)
        analyser.connect(audioCtx.destination)
    });
    /*
    Bass node 
    */
    bass.type = 'lowpass';
    var b1 = 30,
        b2 = 2.0;

    // from user
    _("#bass").oninput = function() {
            _('#bb1').textContent = Math.floor(parseFloat(this.value).toFixed(1)) + ' dB';
            bass.frequency.setValueAtTime(this.value, audioCtx.currentTime);
        }
        // initial values 
    _('#bb1').textContent = Math.floor(parseFloat(b1).toFixed(1)) + ' dB';
    //-----------Bassbooster

    //-------Initials
    _('#bb2').textContent = parseFloat(b2).toFixed(2) + ' dB';
    bassBoost.gain.value = b2;

    // from user 
    _('#bass-boost').oninput = function() {
            _('#bb2').textContent = parseFloat(this.value).toFixed(2) + ' dB';
            bst = parseFloat(this.value).toFixed(2) + ' dB';
            bassBoost.gain.setValueAtTime(this.value, audioCtx.currentTime);
            var val = parseInt(this.value);
            nodeSwitch(val, source, bassBoost);
        }
        //disconnect nodes
    var nodeSwitch = function(value, a, b) {
            switch (value) {
                case 0:
                    a.disconnect(b);
                    b.disconnect(bass);
                    a.connect(bass);
                    bass.connect(analyser);
                    analyser.connect(audioCtx.destination);
                    break;

                default:
                    a.connect(b);
                    b.connect(bass);
                    bass.connect(analyser);
                    analyser.connect(audioCtx.destination);
                    break;
            }
        }
        // Default `normal`
    treble.type = 'peaking';
    bass.frequency.value = 20;
    treble.frequency.value = 2000;
    // treble.Q.value = 16;
    // treble.gain.value = 10;
    _("#bass").value = 120;
    _("#treb-boost").value = 0.6;
    _('#bb1').textContent = Math.floor(parseFloat(30).toFixed(1)) + ' dB';
    bassCon(source, bassBoost, bass, audioCtx);
    _('#tb2').textContent = parseFloat(0.6).toFixed(3) + ' dB';
   compressor.threshold.setValueAtTime(-58.4, audioCtx.currentTime);
    _('#threshold').value = -58.4
    _('#threshold-v').textContent = -58.4;
    ///////////////////////////////////////////////////////
    new WebkitInputRangeFillLower({
        selectors: 'treb-boost',
        color: '#63cdff'
    });
    //Connections
    source.connect(treble);
    treble.connect(compressor);
    compressor.connect(audioBoost);
    audioBoost.connect(balance);
    balance.connect(analyser);
    analyser.connect(audioCtx.destination);
    // --Analyser settings
    analyser.fftSize = 1024;
    analyser.minDecibels = -80;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.89;    
    // disconnect audio nodes on audio stop

    //--------------------Tune Default
    var tx = music;
    tuneDefault = function() {
        _('#audio-boost').value = 1;
        _('#audio-b').textContent = 1 + " dB";
        _('#threshold').value = 0;
        _('#threshold-v').textContent = 0 + " dB";
        _("#vol-add").value = 0.17;
        _("#rate-xp").value = 1;
        _("#sp-rate").textContent = 1;
        _("#vol").textContent = 17 + "%";
        tx.volume.value = 0.17;
        tx.playbackRate = 1;
        audioBoost.gain.setValueAtTime(1, audioCtx.currentTime);
        compressor.threshold.setValueAtTime(0, audioCtx.currentTime);
        balance.pan.setValueAtTime(0, audioCtx.currentTime);
        new WebkitInputRangeFillLower({
            selectors: ["audio-boost", "audio-limit", "vol-add", "rate-xp"],
            color: '#63cdff'
        });
    }

    /*
     *Room Effects
     *
     */
    /*   Effects switch on
     */

    $(".off").click(function() {
        $(this).hide();
        $(".on").show();
            effectsOn(source, splitter, merger, audioCtx) 
            // effectsOff(source, splitter, merger, audioCtx);
        })
        $(".on").click(function() {
            $(this).hide();
            $(".off").show();
                // effectsOn(source, splitter, merger, audioCtx) 
                effectsOff(source, splitter, merger, audioCtx);
            })
        // // switch off;
        /*____________________________________*/
    var Room = '';

    _("#r-effects").oninput = function() {
        Room = this.value;
        chooseEffect(Room);
    }

    function chooseEffect(effect) {
        switch (effect) {
            case 'echo':
                d1 = 0.11;
                s1 = 0.36;
                d2 = 0.10;
                s2 = 0.50;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            case 'auditorium':
                d1 = 0.06;
                s1 = 0.29;
                d2 = 0.08;
                s2 = 0.35;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            case 'scene':
                d1 = 0.04;
                s1 = 0.35;
                d2 = 0.07;
                s2 = 0.37;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            case 'smallroom':
                d1 = 0.03;
                s1 = 0.46;
                d2 = 0.012;
                s2 = 0.51;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            case 'medium':
                d1 = 0.19;
                s1 = 0.38;
                d2 = 0.18;
                s2 = 0.47;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            case 'greathall':
                d1 = 0.13;
                s1 = 0.53;
                d2 = 0.08;
                s2 = 0.6;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            case 'stadium':
                d1 = 0.11;
                s1 = 0.69;
                d2 = 0.11;
                s2 = 0.71;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            default:
                roomDefault();
                break;
        }
    }
    var d1, d2, s1, s2;

    /*----------Delay 01-----------*/
    _("#d1-v").oninput = function() {
        _("#d1").textContent = this.value + ' dB';
        delay1.delayTime.value = this.value;
    }

    /*----------Delay 02--------------*/
    _("#d2-v").oninput = function() {
        _("#d2").textContent = this.value + ' dB';
        delay2.delayTime.value = this.value;
    }

    /*----------Size 01------------*/
    _("#s1-v").oninput = function() {
        _("#s1").textContent = this.value + ' dB';
        size1.gain.value = this.value;
    }

    /*----------Size 02----------*/
    _("#s2-v").oninput = function() {
        _("#s2").textContent = this.value + ' dB';
        size2.gain.value = this.value;
    }

    //Room effects connections
    function nodeCons() {
        //
        //source.connect(audioCtx.destination);
        splitter.connect(delay1, 0);
        delay1.connect(size1);
        size1.connect(delay2);
        //right delay
        splitter.connect(delay2, 1);
        delay2.connect(size2);
        size2.connect(delay1);
        //left and right delay connected to the merger
        size1.connect(merger, 0, 0);
        size2.connect(merger, 0, 1);
    }


    //Reset to default
    roomDefault = function() {
        _("#d1-v").value = 0;
        _("#d1").textContent = 0 + ' dB';
        _("#d2-v").value = 0;
        _("#d2").textContent = 0 + ' dB';
        _("#s1-v").value = 0;
        _("#s1").textContent = 0 + ' dB';
        _("#s2-v").value = 0;
        _("#s2").textContent = 0 + ' dB';
        //Echo
        echo.delayTime.value = 0;
        feedback.gain.value = 0;
        //Values
        delay1.delayTime.value = 0;
        delay2.delayTime.value = 0;
        size1.gain.value = 0;
        size2.gain.value = 0;

        _("#r-effects").value = 'None';
        /*-------------Styling siders on change*/
        new WebkitInputRangeFillLower({
            selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
            color: '#63cdff'
        });
    }

    //Update RoomEffects sliders
    function updateREffects(a, b, c, d) {
        _("#d1-v").value = a;
        _("#d1").textContent = a + ' dB';
        _("#d2-v").value = b;
        _("#d2").textContent = b + ' dB';
        _("#s1-v").value = c;
        _("#s1").textContent = a + ' dB';
        _("#s2-v").value = d;
        _("#s2").textContent = d + ' dB';
        //Echo Values
        echo.delayTime.value = a;
        feedback.gain.value = b;

        //Other Values
        delay1.delayTime.value = a;
        delay2.delayTime.value = b;
        size1.gain.value = c;
        size2.gain.value = d;
        //-------------Styling siders on change
        new WebkitInputRangeFillLower({
            selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
            color: '#63cdff'
        });
    }
    /*
        Echo settings
    */
    function echoCons() {
        //disconnect splitter
        source.disconnect(splitter);
        merger.disconnect(audioCtx.destination);
    }
    renderSpec();
    renderFrame();
    glassPills();
    renderUpFrame();
    renderDownFrame();
    waveForm();
    ripleWaves()
    barHistogram()
    spiralVisual();
}catch (e){
    console.error(e)
}
} 




function effectsOff(source, splitter, merger, audioCtx) {
    source.disconnect(splitter);
    merger.disconnect(audioCtx.destination);
    $("#d1-v").attr('disabled', true);
    $("#d2-v").prop('disabled', true);
    $("#s1-v").prop('disabled', true);
    $("#s2-v").prop('disabled', true);
    $("#r-effects").prop('disabled', true);
    $("#tx").text("Off");
}

function effectsOn(source, splitter, merger, audioCtx) {
    source.connect(splitter);
    merger.connect(audioCtx.destination);
    $("#d1-v").attr('disabled', false);
    $("#d2-v").prop('disabled', false);
    $("#s1-v").prop('disabled', false);
    $("#s2-v").prop('disabled', false);
    $("#tx").text("On");
    $("#r-effects").prop('disabled', false);
}

function bassCon(source, bassBoost, bass, audioCtx) {
    new WebkitInputRangeFillLower({
        selectors: ["bass", "bass-boost", "treb-boost"],
        color: '#63cdff'
    });

    source.connect(bassBoost);
    bassBoost.connect(bass);
    bass.connect(analyser);
    analyser.connect(audioCtx.destination);
}


function bassConn(source, bassBoost, bass, dance, audioCtx) {
    // if (bst <= 2) {
    //     new WebkitInputRangeFillLower({
    //         selectors: "bass-boost",
    //         color: '#63cdff'
    //     });
    // } else if (bst >= 3 || bst <= 4) {
    //     new WebkitInputRangeFillLower({
    //         selectors: "bass-boost",
    //         color: 'orange'
    //     });
    // } else if (bst >= 5) {
    //     new WebkitInputRangeFillLower({
    //         selectors: "bass-boost",
    //         color: 'red'
    //     });
    // } else if (bst == 0) {
    //     new WebkitInputRangeFillLower({
    //         selectors: "bass-boost",
    //         // color: ''
    //     });
    // }
    new WebkitInputRangeFillLower({
        selectors: ["bass", "treb-boost"],
        color: '#63cdff'
    });

    source.connect(bassBoost);
    bassBoost.connect(bass);
    bass.connect(dance);
    dance.connect( analyser);
    analyser.connect(audioCtx.destination);
}

/*			Rendering the bars-Canvas-visual   */
 function renderSpec(){
  window.requestAnimationFrame(renderSpec);
     var Domain = new Uint8Array(analyser.frequencyBinCount);
     analyser.getByteTimeDomainData(Domain);
    analyser.getByteFrequencyData(Domain);
     var canvas = _("#spec-visual");
     $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight)
     window.onresize = ()=>  $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
     var speContext = canvas.getContext("2d");
     speContext.clearRect(0, 0, canvas.width, canvas.height);

     for (var i = 0; i < canvas.width; i++) {
         var specX = 5;
         var value = Domain[i] / 126;
         var height = canvas.height * value;
         var specHeight = canvas.height - height - 1;
         speContext.fillStyle = "gold";
         speContext.fillRect(i * specX, specHeight, 5, 5);
     }
 }
/*			Rendering the bars-Canvas-visual   */
function renderFrame() {
 window.requestAnimationFrame(renderFrame);

    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);
    //analyser.getByteTimeDomainData(freqDomain);
    var canvas = _('#bars-visual');
    $(canvas).attr("width",window.innerWidth ).attr("height",window.innerHeight/1.2);
    window.onresize = ()=>  $(canvas).attr("width",window.innerWidth ).attr("height",window.innerHeight/1.2);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#00ccff';
    for (var i = 0; i < (analyser.frequencyBinCount); i++) {
        var barWidth = i * 4;
        var barX = 3;
        var percent = freqDomain[i] / 270;
        var height = ( canvas.height * percent);
        var barHeight = canvas.height - height - 1;
        context.fillRect(barWidth, barHeight, barX, height);
    }
}

//up spectrum bars.
function renderUpFrame() {
 window.requestAnimationFrame(renderUpFrame);
    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);
    //analyser.getByteTimeDomainData(freqDomain);
    var canvas = _('#up-bars-visual');
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#00ffcc';
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var barWidth = i * 2;
        var barX = 1;
        var percent = freqDomain[i] / 300;
        var height = (canvas.height * percent) / 1.6;
        var barHeight = canvas.height - height - 1;
        context.fillRect(barWidth, barHeight, barX, height);
        //context.fillRect(barWidth,barHeight,1,1);
    }
}
// down spec-bar
function renderDownFrame() {
 window.requestAnimationFrame(renderDownFrame);
    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);
    //analyser.getByteTimeDomainData(freqDomain);
    var canvas = _('#dw-bars-visual');
    // $(canvas).attr("width",window.innerWidth /2).attr("height",window.innerHeight);
    // window.onresize = ()=>  $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#00ffcc';
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var barWidth = i * 2;
        var barX = 1;
        var percent = freqDomain[i] / 300;
        var height = (canvas.height * percent) /1.6;
        var barHeight = canvas.height - height - 1;
        context.fillRect(barWidth, barHeight, barX, height);
        //context.fillRect(barWidth,barHeight,1,1);
    }

}

var spiralVisual = function() {
   window.requestAnimationFrame(spiralVisual);
    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);

    var visuals = document.querySelectorAll(".sp1");
    var context;
    // creating spiral visualizer
    visuals.forEach(elem => {
        context = elem.getContext("2d");
        $(elem).attr("width",window.innerWidth ).attr("height",window.innerHeight/2);
        window.onresize = ()=>  $(elem).attr("width",window.innerWidth).attr("height",window.innerHeight/2);
       var WIDTH = elem.width;
       var HEIGHT = elem.height;
        context.clearRect(0, 0, WIDTH, HEIGHT);
       
        context.fillStyle = "#C9FF4A";
        for (let index = 0; index < WIDTH; index++) {
            var barX = index * 3;
            var barWidth = 1.6;
            var element = freqDomain[index] / 220;
            var offset = HEIGHT * element;
            var height = HEIGHT - offset - 1;
            context.fillRect(barX, height, barWidth, offset);
        }
    });
   
}
 // wave form
var waveForm = function(){
    window.requestAnimationFrame(waveForm);
    var bufferLength = analyser.frequencyBinCount;
    var frequencyDomain = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(frequencyDomain)
    analyser.getByteTimeDomainData(frequencyDomain)

    var canvas = _('.wave-full');
    var ctx = canvas.getContext("2d");
   $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
   window.onresize = ()=>  $(elem).attr("width",window.innerWidth).attr("height",window.innerHeight);
    var sliceWidth = (canvas.width) * 1.0 / bufferLength;
            let start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
            ctx.lineWidth = 2.9;
            ctx.strokeStyle = "#EB7E7E"
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.beginPath();
         var x = 0;
            for (var i = start; i < bufferLength; i++) {
                var v = frequencyDomain[i] / 125.0;
                var y = v * (canvas.height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x = i * sliceWidth //frequencyBins/analyser.sampleRate;
            }
            ctx.lineTo((canvas.width), frequencyDomain[0] / 128.0 * (canvas.height) / 2);
            ctx.stroke();
    }

    var glassPills = function(){
        window.requestAnimationFrame(glassPills);
    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqDomain);
    // analyser.getByteTimeDomainData(freqDomain);
    var canvas = _('.canvas-full');
    $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight)
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#D2EE85';
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var barWidth = i * 6;
        var barX = 5;
        var percent = freqDomain[i] / 227;
        var height = ( canvas.height * percent);
        var barHeight = canvas.height - height - 1;
        context.strokeRect(barWidth, barHeight, barX, height);
    }
    
}

var barHistogram = function(){
    window.requestAnimationFrame(barHistogram);
var freqDomain = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteTimeDomainData(freqDomain);
analyser.getByteFrequencyData(freqDomain);
var canvas = _('.histogram-full');
$(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight)
var context = canvas.getContext("2d");
context.clearRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < analyser.frequencyBinCount; i++) {
    var barWidth = i * 6;
    var barX = 30;
    var percent = freqDomain[i] / 400;
    var height = ( canvas.height * percent);
    var barHeight = canvas.height - height - 1;
    context.fillStyle = '#0C968F';
    context.fillRect(barWidth, barHeight, barX, height);
    }
}
var ripleWaves = function(){
    window.requestAnimationFrame(ripleWaves);
    var bufferLength = analyser.frequencyBinCount;
    var canvas = _('.ripple-wave');
    $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
    window.onresize = ()=> $(canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
    var ctx = canvas.getContext('2d');
    var sliceWidth = (canvas.width) * 1.0 / bufferLength;
    var freqD = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(freqD);
    analyser.getByteFrequencyData(freqD);

    // riple cicle
    var  radius = canvas.height < canvas.width ? canvas.height :canvas.width;
    radius = (radius * 0.65 / 3);
            let start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
            ctx.lineWidth = 1.6;
            ctx.strokeStyle = '#FFC964'
            
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.beginPath();
         var x = 0;
            for (var i = start; i < bufferLength; i++) {
                var v = freqD[i] / 880.0;
                var y = v * (canvas.height) / 9;

                if (i === 0) {
                    ctx.arc(700,300,(x*=i) / ( y * i),0,(Math.PI*2),false)
                } else {
                    ctx.arc(700,300,(y/=i) / (x * i),0,(Math.PI*2),false)
                }
                    ctx.arc(700,300,(y/i) / ((x) * i),0,(Math.PI*2),false)
                    ctx.arc(700,300,(++i) / ((x) * i),0,(Math.PI*2),false)
                    ctx.arc(700,300,(y*i) / ((x*y) * i),0,(Math.PI*2),false)
                    ctx.arc(700,300,(radius/i) / ((x/i) * y),0,(Math.PI*2),false)
                    ctx.arc(700,300,(y*i) / ((x/radius) * i),0,(Math.PI*2),false)
                
                x = i * sliceWidth //frequencyBins/analyser.sampleRate;
            }
            ctx.stroke();
            ctx.closePath()
}
export { Equalizer};
