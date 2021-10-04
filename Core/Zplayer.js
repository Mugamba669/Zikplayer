'use strict';
const fs = require('fs');
const { ipcRenderer } = require('electron');
const defaultPic = require("./default");
const { extname, normalize }= require('path');
const Axios = require('axios');
const cheerio = require("cheerio");
const EqKnobs = require('../Plugins/Eq-knobs');
const $ = require('jquery');
const isOnline = require('is-online');
class ZPlayer {

    constructor(audio) {
            this.audio = audio;
            this.h = 0;
            this.playing = true;
            this.shuffle = false;
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
                $(".lyrics-wrapper").removeClass('active')
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
                this.audio.voume = 0.17
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
        var out = this._(t);
        /**
         * new slider settings
         */
        new EqKnobs({
            trackWidth:0.4,
           size:150,
           initialValue:1,
           bgColor:"#222222",
           trackColor:"#80F135",
           maxValue:2,
           minValue:0
        }).knobControl(q,(knob,value)=>{
            out.textContent = value.toFixed(2) + ' xp';
            this.audio.playbackRate = value.toFixed(2);
        })

    }
    getPlaylist(tags = {},index = 0,playlist = []){
        var that = this;
            // var time = new Date().getUTCMilliseconds();
            $('.total').text(`${index+1}`).css({
                "color":"#fff",
            });
 /**=================================== */
            $('.tt-T').text(playlist.length);


                let check = $("<input/>").attr('type','checkbox').attr('name','listtile').attr('value',`${index}`).css({"appearance":"none"}).addClass('radiolist');
                var erase = $('<td></td>').append(
                    $('<button></button>').addClass('material-icons-round mi-delete').on('click',function(){
                        let songTorenove = (`${(tags.path).replace('file:','')}`)
                        $(".list-tile").eq(index).hide();
                        ipcRenderer.send('removedSong',tags);
                        fs.unlinkSync(normalize(songTorenove));
                    }).css({
                        "width":"40px",
                        "height":"40px",
                        "borderRadius":"50%",
                        "color":"#fff",
                        "cursor":"pointer",
                        "backgroundColor":"transparent",
                        "outline":"none",
                         "border":"1px solid #ccc"
                    })
                )

                var artWork = $("<td></td>").append( $('<img/>').attr('src', tags.artwork).addClass('coverArt'));
               let ext = (`${extname(tags.path)}`).replace('.','');
                var trailing = $('<td></td>').append(
                    $("<span><span>").text(`${tags.size}MB | ${ext}`).css({"color":"inherit","fontSize":"16"})
                )
                var tile = $("<td></td>").append($("<p></p>").text(tags.title)).append($("<p></p>").text(tags.artist))
                .on('click',function(){
                    $('title').text(`${tags.title}`);
                    $(".total-tracks").show(function(){
                        $(".current").text(`${(index + 1)}`);

                    });
                    //  track next
                    // $('.view').text(`${(tags.path).replace('file://','')}`)


                ipcRenderer.send('trackUrl',tags)
                that.h = 0;


                    // show track whose lyrics are to be displayed
                    $(".lyric-title").text(`${tags.title}`)
                    $('.lyric-artist').text(tags.artist);

               new Notification(tags.title,{
                icon:tags.artwork,
                body:tags.artist,
            }).onclick = (e)=>{
                ipcRenderer.send('showApp');
            };
            // var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
                        $('.size').text(`${tags.size} MB`)
                        $('#title').text(tags.title)
                        $('#album').text(tags.album)
                        $('#artist').text(tags.artist)
        that.audio.ontimeupdate = ()=> {
            // show next when renaining 41seconds
            var crossfade = that.audio.duration - that.audio.currentTime;
            const result = Math.floor(parseInt(crossfade));
            // console.log(result)
            if(result == 41){
                showNextTrack(playlist[(index+1)])
            }
        }
        /**
         * Enable or diable shuffling music
         */
         $('.random-off').on('click',function(){
            $(this).hide();
            $('.random-on').show().addClass('w3-black');
            that.shuffle = true;
        });

        $('.random-on').on('click',function(){
            $(this).hide();
            $('.random-off').show();
            that.shuffle = false;
        })
        // keyboard shotcuts
        $(document).on("keydown",function(e){
            switch (e.key) {
                case " ":
                    // console.log(that.playing)
                    if(that.playing == true){
                        $("#play").show();
                        $("#pause").hide();
                        // that.audio.pause();
                        // console.log(that.playing)
                    }else{
                        $("#play").hide();
                        $("#pause").show();
                        // that.audio.play();
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
            ipcRenderer.send('trackEnd');
            that.h = 0;


            if(that.shuffle  == true){
                var next = Math.floor((Math.random() * (playlist.length)));
                    $(".current").text(`${(next)}`);
                    $(".tt-T").text(`${(playlist.length)}`);
                    nextTrack(playlist[next],next)
            }else{
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
         }


        // click to next track
        $('#nextTrack').show().on('click',function(){
            that.h = 0;
            if(that.shuffle == true){
                var next = Math.floor((Math.random() * (playlist.length)));
                    $(".current").text(`${(next) + 1 }`);
                    $(".tt-T").text(`${(playlist.length)}`);
                     nextBtnTrack(playlist[next]);
            }else{
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
            }
        });


        //  click to back to prev track
        $('#prevTrack').show().on('click',function(){
            that.h = 0;

            if(that.shuffle == true){
                var prev = Math.floor((Math.random() * (playlist.length)));
                    $(".current").text(`${(prev) + 1 }`);
                    $(".tt-T").text(`${(playlist.length)}`);
                    prevTrack(playlist[prev]);
            }else{
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
            }

        });
                $(".plist").removeClass("active")
                $(".plist-cont").removeClass("active")
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
     $("<tr></tr>").append(artWork).append(tile).addClass('list-tile').append(check).append(erase).append(trailing).appendTo(".plist-body")

    //    next track function
    const nextTrack = function(tags){
        that.h = 0;

        ipcRenderer.send('trackUrl',tags)
        // $('.view').text(`${(tags.path).replace('file://','')}`)
        new Notification(tags.title,{
            icon:tags.artwork,
            body:tags.artist,

        }).onclick = (e)=>{
            ipcRenderer.send('showApp')
        };
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
        that.h = 0;

        ipcRenderer.send('trackUrl',tags)
        // var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
        $('.size').text(`${tags.size} MB`)
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
            that.h = 0;

            ipcRenderer.send('trackUrl',tags)
            // var size = ((fs.statSync(((tags.path).replace('file://',''))).size) / 1000000).toFixed(2);
            $('.size').text(`${tags.size} MB`);

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
        var out = this._(ou);
       new EqKnobs({
           trackWidth:0.4,
           size:140,
           initialValue:0.17,
           bgColor:"#222222",
           trackColor:"#00ffcc",
           maxValue:1,
           minValue:0
       }).knobControl(volu,(knob,value)=>{
            out.textContent = (value.toFixed(1) * 100 )+ ' %';
            this.audio.volume = value.toFixed(2);
       })
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
                    this.audio.addEventListener('timeupdate', () => {
                        try {
                            new WebkitInputRangeFillLower({
                                selectors:["prog"],
                                color:"gold",
                            });
                            /**
                             *
                             * @returns Synchronised lyrics
                             */
                            $.fn.syncLyrics = function(){
                                var options = $.extend({
                                    speed: 1000
                                }, arguments[0] || {});
                                return this.each(function(){
                                    setTimeout(()=>{
                                        $(this).get(0).scroll({
                                            top:that.h+=0.65,
                                            behavior:'smooth'
                                        });
                                    },options.speed)
                                })
                            }

                           $('.lyrics').syncLyrics();

                            var sec = parseInt(this.audio.currentTime % 60);
                            var min = parseInt((this.audio.currentTime / 60) % 60);
                            sec < 10 ? item.textContent = min + ':' + '0' + sec : item.textContent = min + ':' + sec;
                        } catch (err) { alert(err); }
                    }, false);
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
    /**
     * this method implements online music from nowviba.com
     */
     searchSongs(query) {

        console.log(query);
        // var streams = JSON.parse(fs.readFileSync(path.join(__dirname,"./streams.json")));
      let searchSource = `https://www.nowviba.com/music/pages/search.php?q=${query}`;
        if(typeof query != 'string') throw new Error("Only strings are allowed");

        $('.stream-component').remove();
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

				var streamComponent = function(avatar = '',title = ''){
					var avatar = $('<img/>').attr('src',avatar).addClass('stream-component-avatar');
					var componentHeader = $('<div></div>').addClass("stream-component-header").append(avatar);
				// stream content body
				var track = `<table class="panel">
								<tr class="title-panel">
									<td class="title">${title}</td>
								</tr>
							</table>`;
				var streamBodyComponent = $('<div></div>').addClass('stream-component-body').append(track);
					// main component
					var downloadBtn = $('<button></button>').addClass('stream-play')
                        .append(
                            $('<a></a>').addClass('fa fa-download').attr('href',sourceFile).attr('download',`${sourceFile.replace(/(.*)[\/\\]/,"").replace(" ","_")}`)
                        )
						.on('click',function(){
                            ipcRenderer.send('downloadsong');
                            $('.download-body').addClass('active')
                            $('.download-container').addClass('active')
                            /**
                             * show receved bytes
                             */
                            ipcRenderer.on('downloading',(event,args)=>{
                                console.log(args)
                                $('.dw-currnet-size').text(`${(args/1000000).toFixed(2)}mbs`)
                            })
                            /**
                             * show tottal bytes
                             */
                             ipcRenderer.on('totaldownload',(event,args)=>{
                                // console.log(args)
                                $('.total-dn-size').text(`${(args/1000000).toFixed(2)}mbs`)
                            })
                            /**
                             * show  start time
                             */
                             ipcRenderer.on('starttime',(event,args)=>{
                                console.log(args)
                                $('.dwn-time').text(args)
                            })
                            /**
                             * show file being downloaded
                             */
                             ipcRenderer.on('filedownload',(event,args)=>{
                                console.log(args)
                                $('.sg-title').text(args)
                            });
                            /**
                             * update progress bar
                             */
                             ipcRenderer.on('progressbytes',(event,args)=>{
                                // console.log(args)
                                var percent = args * 100;
                                $('.dwn-time').text(`${percent.toFixed(2)}%`)
                                    $('.download-progress').css({
                                          'width':percent+'%'
                                    });
                            });
                            /**
                             * close download panel when done
                             */
                             ipcRenderer.on('downloadcompleted',(event,args)=>{
                                $('.download-body').removeClass(args)
                                $('.download-container').removeClass(args)
                            });
							// alert($(this))
						});

						/* Stream component*/
					var component = $("<div></div>").addClass("stream-component").append(componentHeader)
					.append(streamBodyComponent).append(downloadBtn);
					$('.stream-body').append(component);
				}
                streamComponent(stream.coverArt,stream.title)
            })
        })

    });

    }
    streamHot100(){
        async function checkConnection(){
            let netCheck = await isOnline();
            if(netCheck == false){
                $('<p></p>').text(
                    `😓 Sorry, but your currently offline , try checking your connection or data plan`
                 ).css({
                     "color": "#ffffff",
                     "fontWeight": "300",
                     "fontSize": "24px",
                     "fontFamily": "Ubuntu"
                 }).addClass('pick-msg').appendTo('.streaming-cont')
            }else{

        Axios.get(`https://www.nowviba.com/music/pages/top100.php`).then((dom)=>{
            var response = dom.data;
            const ch = cheerio.load(response);
            let trackList = ch('.hot100')
            // let trackPic = ch('img.imagefillstr');
        trackList.map((index,element)=>{
            // console.log()
            let hot100 = {
                title:`${element.children[0].children[5].children[0].children[0].data}`,
                artist:`${element.children[0].children[5].children[1].children[0].data}`,
                artWork:`${element.children[0].children[3].children[1].attribs.data}`,
                url:element.children[2].children[3].children[1].attribs.src
            }
            // $(".lyrics").text("You are currently offline cannot fetch the Lyrics")
        // .prepend($('<span></span>').addClass('material-icons-round mi-wifi-off'));


				var streamComponent = function(avatar = '',title = ''){
					var avatar = $('<img/>').attr('src',avatar).addClass('stream-component-avatar');
					var componentHeader = $('<div></div>').addClass("stream-component-header").append(avatar);
				// stream content body
				var track = `<table class="panel">
								<tr class="title-panel">
									<td class="title">${title}</td>
								</tr>
							</table>`;
				var streamBodyComponent = $('<div></div>').addClass('stream-component-body').append(track);
					// main component
                    var downloadBtn = $('<button></button>').addClass('stream-play')
                    .append(
                        $('<a></a>').addClass('fa fa-download').attr('href',`${hot100.url}`).attr('download',`${hot100.url.replace(/(.*)[\/\\]/,"").replace(" ","_")}`)
                    ).on('click',function(){
                        ipcRenderer.send('downloadsong');
                        $('.download-body').addClass('active')
                        $('.download-container').addClass('active')
                        /**
                         * show receved bytes
                         */
                        ipcRenderer.on('downloading',(event,args)=>{
                            console.log(args)
                            $('.dw-currnet-size').text(`${(args/1000000).toFixed(2)}mbs`)
                        })
                        /**
                         * show tottal bytes
                         */
                         ipcRenderer.on('totaldownload',(event,args)=>{
                            // console.log(args)
                            $('.total-dn-size').text(`${(args/1000000).toFixed(2)}mbs`)
                        })
                        /**
                         * show  start time
                         */
                         ipcRenderer.on('starttime',(event,args)=>{
                            console.log(args)
                            $('.dwn-time').text(args)
                        })
                        /**
                         * show file being downloaded
                         */
                         ipcRenderer.on('filedownload',(event,args)=>{
                            console.log(args)
                            $('.sg-title').text(args)
                        });
                        /**
                         * update progress bar
                         */
                         ipcRenderer.on('progressbytes',(event,args)=>{
                            // console.log(args)
                            var percent = args * 100;
                            $('.dwn-time').text(`${percent.toFixed(2)}%`)
                                $('.download-progress').css({
                                      'width':percent+'%'
                                });
                        });
                        /**
                         * close download panel when done
                         */
                         ipcRenderer.on('downloadcompleted',(event,args)=>{
                            $('.download-body').removeClass(args)
                            $('.download-container').removeClass(args)
                        });
                        // alert($(this))
                    });
						/* Stream component*/
					var component = $("<div></div>").addClass("stream-component").append(componentHeader)
					.append(streamBodyComponent).append(downloadBtn);
					$('.stream-body').append(component);
				}
                streamComponent(hot100.artWork,hot100.title);

        })

        })
    }
}
checkConnection();
    }

}
module.exports =  ZPlayer;
