'use strict';
const fs = require('fs');
const defaultPic = require("./default");
const path = require('path');
class ZPlayer {

    constructor(audio) {
            this.audio = audio;
            this.h = 0;
            this.playing = true;
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
        }
        //Equalizer methods
    startPlayer() {
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
    getPlaylist(tags = {},index = 0,playlist = []){
        var that = this;      
        // $('.fab-btn').hide();
    

/**========================================================== */
     
    /**=================================== */
            // var time = new Date().getUTCMilliseconds();
            $('.total').text(`${index+1}`).css({
                "color":"#fff",
            });
 /**=================================== */
           

             
                let check = $("<input/>").attr('type','radio').attr('name','listtile').attr('value',`${index}`).css({"appearance":"none"}).addClass('radiolist');
                // console.log(check.val())
                var artWork = $("<td></td>").append( $('<img/>').attr('src', tags.artwork).addClass('coverArt'));
                var tile = $("<td></td>").append($("<p></p>").text(tags.title)).append($("<p></p>").text(tags.artist))
                $("<tr></tr>").append(artWork).append(tile).addClass('list-tile').append(check).appendTo(".plist-body")
                .on('click',function(){
                    $('title').text(`${tags.title}`);

                    //  track next
                    $(".total-tracks").show(function(){
                        $(".current").text(`${(index + 1)}`);
                        $(".tt-T").text(`${(playlist.length)}`);
                    });
                    // show track whose lyrics are to be displayed
                    $(".lyric-title").text(`${tags.title}`)
                    $('.lyric-artist').text(tags.artist);
            
               new Notification(tags.title,{
                icon:tags.artwork,
                body:tags.artist,
                timestamp:200,
                
            })
            var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
                        $('.size').text(`${size} MB`)
                        $('#title').text(tags.title)
                        $('#album').text(tags.album)
                        $('#artist').text(tags.artist)
        that.audio.ontimeupdate = ()=> {
            // show next when renaining 41seconds
            var crossfade = that.audio.duration - that.audio.currentTime;
            const result = Math.floor(parseInt(crossfade));
            // console.log(result)
                // h += 0.65;
                //     $("pre").css("transform","translateY(-"+h+"px)")
            if(result == 41){
                showNextTrack(playlist[(index+1)])
            }
        }
        // keyboard shotcuts
        $(document).on("keydown",function(e){
            switch (e.key) {
                case " ":
                    // console.log(that.playing)
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
                $(".bottom-container").show();

                $('.bottom-sheet').addClass('active');
                $(".Art").attr("src",defaultPic.image); 
                 $(".next-track").text('List finished')
                 setTimeout(() => {
                    $('.bottom-sheet').removeClass('active');
                   }, 8000);
                return true;
            }else{
                $(".current").text(`${(next) + 1 }`);
                $(".tt-T").text(`${(playlist.length)}`);
                    nextTrack(playlist[next],next)
            }
         }


        // click to next track
        $('#nextTrack').show().on('click',function(){
            that.h = 0;
            var next = index+=1;
            if((next + 1) > playlist.length){

                $(".bottom-container").show()
                $('.bottom-sheet').addClass('active');
                $(".Art").attr("src",defaultPic.image); 
                $
                 $(".next-track").text('List finished')
                 setTimeout(() => {
                    $('.bottom-sheet').removeClass('active');
                    $(".bottom-container").hide();
                   }, 8000);
    
            }else{
                $(".current").text(`${(next) + 1 }`);
                $(".tt-T").text(`${(playlist.length)}`);
                 nextBtnTrack(playlist[next]);
            }
        });


        //  click to back to prev track
        $('#prevTrack').show().on('click',function(){
            that.h = 0;
            var prev = index-=1;
            if(prev < 0){

                $(".bottom-container").show()
                $('.bottom-sheet').addClass('active');
                $(".Art").attr("src",defaultPic.image); 
                
                 $(".next-track").text('No more previous tracks')
                 setTimeout(() => {
                    $('.bottom-sheet').removeClass('active');
                   }, 8000);
                return true;
            }else{
                $(".current").text(`${(prev) + 1 }`);
                $(".tt-T").text(`${(playlist.length)}`);
                prevTrack(playlist[prev]);

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
           

                   that.audio.src = tags.path;
                   
                   $(".view").text(tags.path);// for getting lyrics
                   that.audio.play();
                   $("#trackId").attr('src',tags.artwork);
                   $(".swiper-container").css({"backgroundImage": `url(${tags.artwork})`})
               });
           
    //    next track function
    const nextTrack = function(tags){
        new Notification(tags.title,{
            icon:tags.artwork,
            body:tags.artist,
            timestamp:200,
            
        });
        var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
        $('.size').text(`${size} MB`)
            $('title').text(`${tags.title}`)
            $(".view").text(tags.path)
            $('#title').text(tags.title)
            $('#album').text(tags.album)
            $('#artist').text(tags.artist)
            $(".lyric-title").text(`${tags.title}`)
            $('.lyric-artist').text(tags.artist);
            that.audio.play();
            $("#trackId").attr('src',tags.artwork);
            $(".swiper-container").css({"backgroundImage": `url(${tags.artwork})`})
        that.audio.src = tags.path;
        that.audio.play();
       }

       const nextBtnTrack = function(tags){
        new Notification(tags.title,{
            icon:tags.artwork,
            body:tags.artist,
            timestamp:200,
            
        })
        var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
        $('.size').text(`${size} MB`)
        $(".view").text(tags.path);
        $('#title').text(tags.title)
        $('#album').text(tags.album)
        $('#artist').text(tags.artist)
        $('title').text(`${tags.title}`)
        $(".lyric-title").text(`${tags.title}`)
        $('.lyric-artist').text(tags.artist);
        that.audio.play();
        $("#trackId").attr('src',tags.artwork);
        $(".swiper-container").css({"backgroundImage": `url(${tags.artwork})`})
        that.audio.src = tags.path;
        that.audio.play();
       }
    //    show next track
    function showNextTrack(tags){
        // console.log('next track'+tags.title)
            $(".bottom-container").show()
            $('.bottom-sheet').addClass('active');
            $(".Art").attr("src",tags.artwork); 
            $
             $(".next-track").text(tags.title)
             setTimeout(() => {
                $('.bottom-sheet').removeClass('active');
               }, 20000);

    }

    //    previous track function
        const prevTrack = function(tags){
            new Notification(tags.title,{
                icon:tags.artwork,
                body:tags.artist,
                timestamp:200,
                
            })
            var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
            $('.size').text(`${size} MB`);

            $('title').text(`${tags.title}`)
            $(".view").text(tags.path)
                $(".lyric-title").text(`${tags.title}`)
                $('.lyric-artist').text(tags.artist);
                that.audio.src = tags.path;
                that.audio.play();
                $('#title').text(tags.title)
                $('#album').text(tags.album)
                $('#artist').text(tags.artist)
                that.audio.play();
                $("#trackId").attr('src',tags.artwork);
                $(".swiper-container").css({"backgroundImage": `url(${tags.artwork})`})
        
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
module.exports =  ZPlayer;
