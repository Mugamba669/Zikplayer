/**
 * This section aids in modifying the music played through providing equalizer settings ,room effects,visualizers and compressor
 * @ Mugamba Bruno 2021
 */
const $ = require('jquery');
const Visualizer = require('./Visualizer');

class AudioEngine{
    constructor(audio = {}){
        this.bst = 0;
        this.audio  = audio;
        this.audioCtx = new AudioContext();
        this.source = this.audioCtx.createMediaElementSource(this.audio);
        this.analyser = this.audioCtx.createAnalyser();
        this.stereo = this.audioCtx.createBiquadFilter();
        this.treble = this.audioCtx.createBiquadFilter();
        this.dance = this.audioCtx.createBiquadFilter();
        this.bass = this.audioCtx.createBiquadFilter();
        this.echo = this.audioCtx.createDelay();
        this.feedback = this.audioCtx.createGain();
        this.audioBoost = this.audioCtx.createGain();
        this.delay1 = this.audioCtx.createDelay();
        this.delay2 = this.audioCtx.createDelay();
        this.size1 = this.audioCtx.createGain();
        this.size2 = this.audioCtx.createGain();
        this.bassBoost = this.audioCtx.createGain();
        this.trebleBoost = this.audioCtx.createGain();
        this.balance = this.audioCtx.createStereoPanner();
        this.splitter = this.audioCtx.createChannelSplitter(2);
        this.merger = this.audioCtx.createChannelMerger(2);
        this.mono = this.audioCtx.createChannelMerger(1);
        this.compressor = this.audioCtx.createDynamicsCompressor();
        this.St_treble = this.audioCtx.createBiquadFilter();
        this.St_treble_boost = this.audioCtx.createGain();

        this.St_treble.type = 'highpass';
        this.St_treble.frequency.value = 4530.11;
        this.St_treble.gain.value = 2;
        this.St_treble.Q.value = 3;
        /**
         * Audio Balance
         */
        this.balance = this.audioCtx.createStereoPanner()
        /**
         * Audio Compressor
         */
        this.compressor = this.audioCtx.createDynamicsCompressor();
        /**
         * Compressor props
         */
        this.compressor.threshold.value = 0;//( -100 -> 0)
        this.compressor.attack.value = 0.3;//(0->1)
        this.compressor.release.value = 0;//(0-> 1)
        this.compressor.knee.value = 10;//(0 -> 40)
        this.compressor.ratio.value = 1;//( 1-> 20)

        
      
        //Connections	
        this.source.connect(this.trebleBoost);
        this.trebleBoost.connect(this.stereo);
        this.stereo.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);

      /* Visualisser */
        this.visualizer = new Visualizer(this.analyser,'.canvas-full')
        var that = this;
            // this.visualizer.barsVisualiser();
        $(".body p").eq(0).click(function() {
        that.visualizer.barsVisualiser();
        })

        $(".body p").eq(2).click(function() {
        that.visualizer.choroFloroVisualiser();
        })

        $(".body p").eq(1).click(function() {
        that.visualizer.dustyParticles();
        });

        $(".body p").eq(6).click(function() {
        that.visualizer.glassTilesVisualiser();
        })

        $(".body p").eq(5).click(function() {
        that.visualizer.historgramVisualiser();
        })

        $(".body p").eq(7).click(function() {
        that.visualizer.ripleWaveVisualiser()
        })

        $(".body p").eq(4).click(function() {
        that.visualizer.sineWaveVisualiser();
        });

        $(".body p").eq(3).click(function() {
        that.visualizer.spiralVisualiser(".sp1");
        })
        /*=============================================*/

        this.stereo.type = 'highpass';
        this.bass.type = 'lowpass';
  
       
        this.stereo.frequency.value = 20000;
        this.trebleBoost.gain.value = 0;

        this.bass.frequency.value = 20;
          /**
         * Room Effects
         */
        this.splitter = this.audioCtx.createChannelSplitter(2);
        this.merger = this.audioCtx.createChannelMerger(2);
        /**
         * Delay nodes to help in create the room effects
         */
         this.leftDelay = this.audioCtx.createDelay();
         this.rightDelay = this.audioCtx.createDelay();

         this.midDelay = this.audioCtx.createDelay();
        /**
         * Gain nodes to aid in audio audibilty
         */
        this.leftGain = this.audioCtx.createGain();
        this.rightGain = this.audioCtx.createGain();
        this.midGain = this.audioCtx.createGain();
        //     

        new WebkitInputRangeFillLower({
            selectors: 'treb-boost',
            color: '#63cdff'
        });

        /**
         * connections
         */
        this.source.connect(this.treble)
         this.treble.connect(this.compressor);
         this.compressor.connect(this.audioBoost);
         this.audioBoost.connect(this.balance);
         this.balance.connect(this.analyser);
         this.analyser.connect(this.audioCtx.destination);
         // --Analyser settings
         this.analyser.fftSize = 1024;
         this.analyser.minDecibels = -80;
         this.analyser.maxDecibels = -10;
         this.analyser.smoothingTimeConstant = 0.90; 
    }
    tuneStereo(selector){
        var valueSt = 0,that =this;
        $(selector).on('input',function(){
            valueSt = $(this).val();
            $("#st-out").text(parseFloat(valueSt));
            that.St_treble_boost.gain.value = valueSt;
            that.source.connect(that.St_treble)
            that.St_treble.connect(that.St_treble_boost)
            that.St_treble_boost.connect(that.analyser)
            that.analyser.connect(that.audioCtx.destination)
        });
    }
    tuneEq(tune){
        var that = this;   

        switch (tune) {
            case 'normal':
                this.treble.type = 'peaking';
                this.treble.frequency.value = 2000;
                // stereo.frequency.value = 0.60;
                $("#bass").val(20);
                $('#bb2').text(Math.floor(parseFloat(1.4).toFixed(1)) + ' dB');
                $('#bb1').text(Math.floor(parseFloat(20).toFixed(1)) + ' dB');
                $("#treb-boost").val(0.60);
                $("#bass-boost").val(1.4);
                this.bst = 1.4;
                $('#tb2').text(parseFloat(0.6).toFixed(3) + ' dB');
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0);
                $('#threshold-v').text(0);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser)
                break;

            case 'rnb':
                this.stereo.frequency.value = 0.8;
                this.compressor.threshold.setValueAtTime(-58.4, this.audioCtx.currentTime);
                this.treble.type = 'lowpass';
                this.treble.frequency.value = 60;
                // treble.Q.value = 7;
                this.bass.frequency.value = 58;
                // bass.gain.value = 15;
               this.bassBoost.gain.setValueAtTime(2.0, this.audioCtx.currentTime);
                $("#bass-boost").val(2.0);
                this.bst = 2.0;
                $("#treb-boost").val(0.80);
                $("#bass").val(58);
                $('#bb2').text(Math.floor(parseFloat(2.0).toFixed(1)) + ' dB');
                $('#bb1').text(Math.floor(parseFloat(58).toFixed(1)) + ' dB');
                $('#tb2').text(parseFloat(0.8).toFixed(3) + ' dB');
                $('#threshold').val(-58.4)
                $('#threshold-v').text(-58.4);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;

            case 'dance':
                this.treble.type = 'lowpass';
                this.bassBoost.gain.setValueAtTime(1.40, this.audioCtx.currentTime);

                this.stereo.frequency.value = 0.5;
                this.treble.frequency.value = 50;
                // treble.gain.value = 16;
                this.dance.type = 'bandpass';
                this.dance.frequency.value = 100;
                // dance.Q.value = 7;
                this.bass.frequency.value = 46;
                this.bassBoost.gain.setValueAtTime(2.7, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(2.7).toFixed(2)) + ' dB');
                $("#bass-boost").val(1.4);
                  this.bst = 2.7;
                $("#bass").val(46);
                $('#bb1').text(Math.floor(parseFloat(50).toFixed(1)) + ' dB');
                $('#tb2').text(parseFloat(0.5).toFixed(3) + ' dB');
                $('#threshold').val(0);
                $('#threshold-v').text(0);
                new WebkitInputRangeFillLower({
                    selectors: ["bass","threshold","bass-boost","treb-boost"],
                    color: '#63cdff'
                });
            
                this.source.connect(this.bassBoost);
                this.bassBoost.connect(this.bass);
                this.bass.connect(this.dance);
                this.dance.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                break;

            case 'reg':
                this.treble.type = 'bandpass';
                this.treble.frequency.value = 0;
                this.bass.frequency.value = 35;
                // bass.Q.value = 7;
                this.bassBoost.gain.setValueAtTime(4.0, this.audioCtx.currentTime);
                $("#treb-boost").val(0.49);
                this.stereo.frequency.value = 0.49;
                $("#bass").val(35);
                this.bst = 4.0;
                $('#bb2').text(Math.floor(parseFloat(4.0).toFixed(1)) + ' dB');
                $("#bass-boost").val(parseFloat(4.0).toFixed(1) + ' dB');
                $('#tb2').text(parseFloat(0.49).toFixed(2) + ' dB');
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0)
                $('#threshold-v').text(0);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx,this.analyser);
                break;

            case 'bass':
                this.treble.type = 'bandpass';
                this.treble.frequency.value = 0;
                this.bass.frequency.value = 55;
                // bass.Q.value = 3;
                this.bassBoost.gain.setValueAtTime(2.5, this.audioCtx.currentTime);
                $("#treb-boost").val(0.70);
                this.stereo.frequency.value = 0.70;
                $("#bass").val(55);
                this.bst = 2.5;
                $('#bb2').textContent = Math.floor(parseFloat(3.5).toFixed(1)) + ' dB';
                $("#bass-boost").val(2.5);
                $('#bb1').text(Math.floor(parseFloat(58).toFixed(1)) + ' dB');
             
                $('#tb2').text(parseFloat(0.7).toFixed(3) + ' dB');
                $('#threshold').val(0);
                $('#threshold-v').text(0);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx,this.analyser);
                break;

            case 'flat':
                this.treble.type = 'peaking';
               this.bass.frequency.value = 20;
                this.treble.frequency.value = 2000;
                // this.stereo.frequency.value = 
                this.bassBoost.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(1.0).toFixed(1)) + ' dB');
                $("#bass-boost").val(1.0);
                this.bst = 1.0;

                $("#bass").val(20);
                $('#bb1').text(Math.floor(parseFloat(30).toFixed(1)) + ' dB');
               
                $('#tb2').text(parseFloat(1).toFixed(3) + ' dB');
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx ,this.analyser);
                break;

            case 'rock':
                this.treble.type = 'bandpass';
                this.bass.frequency.value = 53;
                this.treble.frequency.value = 1800;
                $("#bass-boost").val(2.59);
                this.bassBoost.gain.setValueAtTime(2.59, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(2.59).toFixed(1)) + ' dB');

                $("#bass").val(53);
                $('#bb1').text(Math.floor(parseFloat(75).toFixed(1)) + ' dB');
              
                $('#tb2').text(parseFloat(0.5).toFixed(3) + ' dB');
                $("#treb-boost").val(0.50);
                this.stereo.frequency.value = 0.50;
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                this.bst = 2.59;
                $('#threshold').val(0)
                $('#threshold-v').text(0);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;

            case 'heavy':
                this.treble.type = 'notch';
                this.bass.frequency.value = 60;
                this.treble.frequency.value = 160;
                $("#treb-boost").val(0.89);
                this.stereo.frequency.value = 0.89;

                this.bassBoost.gain.setValueAtTime(3.6, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(3.6).toFixed(1)) + ' dB');

                $("#bass").val(60);
                $('#bb1').text(Math.floor(parseFloat(3.6).toFixed(1)) + ' dB');
                this.bst = 3.6;
                $("#bass-boost").val(3.6);
                
                $('#tb2').text(parseFloat(0.89).toFixed(3) + ' dB');
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0)
                $('#threshold-v').text(0);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;

            case 'vocal':
                this.treble.type = 'allpass';
                this.bass.frequency.value = 0;
                this.bassBoost.gain.setValueAtTime(0, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(0).toFixed(1)) + ' dB');

                this.treble.frequency.value = 2000;
                $("#bass").val(0);
                $("#bass-boost").val(0);
                this.bst = 0;
                $('#bb1').text(Math.floor(parseFloat(0).toFixed(1)) + ' dB');
               
                $('#tb2').textContent = parseFloat(1.8).toFixed(2) + ' dB';
             
                $("#treb-boost").val(1.8);
                this.stereo.frequency.value = 1.8;
               this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0)
                $('#threshold-v').text(0);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;

            case 'pop':
                this.treble.type = 'notch';
                this.bass.frequency.value = 70;
               this.treble.Q.value = 1;
               this.treble.frequency.value = 600;
                $("#treb-boost").val(0.7);
                this.stereo.frequency.value = 0.7;
                this.bassBoost.gain.setValueAtTime(2.0, this.audioCtx.currentTime);
                $("#bass").val(70);
                this.bst = 2.0;
                $("#bass-boost").val(2.0);
                $('#bb2').text(Math.floor(parseFloat(2.0).toFixed(1)) + ' dB');

                $('#bb1').text(Math.floor(parseFloat(70).toFixed(1)) + ' dB');
                
                $('#tb2').textContent = parseFloat(0.7).toFixed(3) + ' dB';
                $("#treb-boost").val(0.7);
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                 $('#threshold').val(0)
                 $('#threshold-v').text(0);
                 bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;
        }
    }
    tuneBass(selector){
        var b1 = 30,
        that = this;

    // from user 
    $(selector).on('input', function(){
            $('#bb1').text(Math.floor(parseFloat(this.value).toFixed(1)) + ' dB');
            that.bass.frequency.setValueAtTime(this.value, that.audioCtx.currentTime);
        })
        // initial values 
    $('#bb1').text(Math.floor(parseFloat(b1).toFixed(1)) + ' dB');
    }

    tuneMidVocal(selector){
        this.treble.type = 'peaking';
        this.treble.frequency.value = 2000;
        var that = this;
        $(selector).on('input',function() {
            $('#tb2').text(parseFloat($(this).val()).toFixed(3) + ' dB');
             that.trebleBoost.gain.setValueAtTime($(this).val(), that.audioCtx.currentTime);
         })
    }

    /**
     * 
     * @param {BassBooster} selector 
     * Tuning the bassboaster
     */
    tuneBassBooster(selector){
    //-------Initials 
    var that = this;
    $('#bb2').text(parseFloat(2.0).toFixed(2) + ' dB');
    this.bassBoost.gain.value = 2.0;

    $(selector).on('input',function(){
        $('#bb2').text(parseFloat(this.value).toFixed(2) + ' dB');
        that.bst = parseFloat(this.value).toFixed(2) + ' dB';
        that.bassBoost.gain.setValueAtTime($(this).val(), that.audioCtx.currentTime);
        var val = parseInt(this.value);
        nodeSwitch(val, that.source, that.bassBoost);
    });

    var nodeSwitch = function(value, a, b) {
        switch (value) {
            case 0:
                a.disconnect(b);
                b.disconnect(that.bass);
                a.connect(that.bass);
                that.bass.connect(that.analyser);
                that.analyser.connect(that.audioCtx.destination);
                break;

            default:
                a.connect(b);
                b.connect(that.bass);
                that.bass.connect(that.analyser);
                that.analyser.connect(that.audioCtx.destination);
                break;
        }
    }
    }
    /**
     * This method aids in tunning the audio compressions
     */
    tuneCompressor(selector){
        var inputs = document.querySelectorAll(selector);
        var that = this;
        $(inputs).each(function(index,dom){
            switch (index) {
                case 2:
                    // $(dom).val()
                    $(dom).on('input',function(){
                        $('#knee-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
                        that.compressor.attack.setValueAtTime($(this).val(),that.audioCtx.currentTime); //(0->1)
                    })
                break;
                
                case 0:
                    $(dom).on('input',function(){
                        $('#threshold-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
                        that.compressor.threshold.setValueAtTime($(this).val(),that.audioCtx.currentTime);//(0-> -100)
                    })
                break;

                case 1:
                    $(dom).on('input',function(){
                        $('#knee-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
                        that.compressor.knee.setValueAtTime($(this).val(),that.audioCtx.currentTime);//(0 -> 40)
                    })
                break;
                
                case 4:
                    $(dom).on('input',function(){
                        $('#ratio-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
                        that.compressor.ratio.setValueAtTime($(this).val(),that.audioCtx.currentTime);//( 1-> 20)
                    })
                break;

                case 3:
                    $(dom).on('input',function(){
                        $('#release-v').text(parseFloat($(this).val()).toFixed(1) + ' dB');
                        that.compressor.release.setValueAtTime($(this).val(),that.audioCtx.currentTime);//(0-> 1)
                    });
                break;
            }
        })
    }
    tuneRoomOptions(options){

        var d1, d2, s1, s2,that = this;
        switch (options) {
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
                d1 = 0.14;
                s1 = 0.35;
                d2 = 0.11;
                s2 = 0.25;
                nodeCons();
                updateREffects(d1, d2, s1, s2);
                break;

            default:
                roomDefault();
                break;
        }
        /**
         * Helper methods
         */
         function nodeCons() {
            //
            //source.connect(audioCtx.destination);
            that.splitter.connect(that.delay1, 0);
            that.delay1.connect(that.size1);
            that.size1.connect(that.delay2);
            //right delay
            that.splitter.connect(that.delay2, 1);
            that.delay2.connect(that.size2);
            that.size2.connect(that.delay1);
            //left and right delay connected to the merger
            that.size1.connect(that.merger, 0, 0);
            that.size2.connect(that.merger, 0, 1);
        }
    
    
        //Reset to default
        let roomDefault = function() {
           $("#d1-v").val(0);
           $("#d1").text(0 + ' dB');
           $("#d2-v").val(0);
           $("#d2").text(0 + ' dB');
           $("#s1-v").val(0);
           $("#s1").text(0 + ' dB');
           $("#s2-v").val(0);
           $("#s2").text(0 + ' dB');
            //Echo
            that.echo.delayTime.value = 0;
            that.feedback.gain.value = 0;
            //Values
            that.delay1.delayTime.value = 0;
            that.delay2.delayTime.value = 0;
            that.size1.gain.value = 0;
            that.size2.gain.value = 0;
    
           $("#r-effects").val('None');
            /*-------------Styling siders on change*/
            new WebkitInputRangeFillLower({
                selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
                color: '#63cdff'
            });
        }
    
        //Update RoomEffects sliders
        function updateREffects(a, b, c, d) {
            $("#d1-v").val(a);
            $("#d1").text(a + ' dB');
            $("#d2-v").val(b);
            $("#d2").text(b + ' dB');
            $("#s1-v").val(c);
            $("#s1").text(a + ' dB');
            $("#s2-v").val(d);
            $("#s2").text(d + ' dB');
            //Echo Values
            that.echo.delayTime.value = a;
            that.feedback.gain.value = b;
    
            //Other Values
            that.delay1.delayTime.value = a;
            that.delay2.delayTime.value = b;
            that.size1.gain.value = c;
            that.size2.gain.value = d;
            //-------------Styling siders on change
            new WebkitInputRangeFillLower({
                selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
                color: '#63cdff'
            });
        }
    }
    tuneRoomEffects(selectors){

        var inputs = document.querySelectorAll(selectors);
        var that = this;
        $(inputs).each(function(index,domElement){
            switch (index) {
                case 0:
                    // $(domElement).val(0.5)
                    $(domElement).on('input',function(){
                        $("#d1").text($(this).val()+ ' dB');
                        that.delay1.delayTime.setValueAtTime($(this).val(),that.audioCtx.currentTime)
                    })
                    break;

                    case 1:
                        // $(domElement).val(0.6)
                        $(domElement).on('input',function(){
                            $("#s1").text($(this).val()+ ' dB');
                        that.size1.gain.setValueAtTime($(this).val(),that.audioCtx.currentTime)
                            
                        })
                        break;

                        case 3:
                            // $(domElement).val(0.6)
                            $(domElement).on('input',function(){
                            $("#s2").text($(this).val()+ ' dB');
                        that.size2.gain.setValueAtTime($(this).val(),that.audioCtx.currentTime)
                                
                            })
                            break;
            
                            case 3:
                                // $(domElement).val(0.5)
                                $(domElement).on('input',function(){
                                    $("#d2").text($(this).val() + ' dB');
                        that.delay2.delayTime.setValueAtTime($(this).val(),that.audioCtx.currentTime)
                                })
                                break;
            }
        })  
    }
    tuneRoomSwitch(){
         /*
     *Room Effects
     *
     */
    /*   Effects switch on
     */
       let that = this;
    $(".off").click(function() {
        console.log(this)
        $(this).hide();
        $(".on").show();
            effectsOn(that.source, that.splitter, that.merger, that.audioCtx) 
            // effectsOff(source, splitter, merger, audioCtx);
        })
        $(".on").click(function() {
            $(this).hide();
            $(".off").show();
                // effectsOn(source, splitter, merger, audioCtx) 
                effectsOff(that.source, that.splitter, that.merger, that.audioCtx);
            })
        
/**
 * 
 * @param {Helpers} source 
 * @param {*} splitter 
 * @param {*} merger 
 * @param {*} audioCtx 
 */

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
    }
    tuneAudioBalance(selector){
        var that = this;
        $(selector).on('input',function(){
            $('#bal').text(parseFloat(this.value).toFixed(1) + ' dB');
            that.balance.pan.setValueAtTime($(this).val(),that.audioCtx.currentTime);
        })
    }
    tuneAudioPower(selector){
        //Audio Gain
        var that = this;
    $(selector).on('input', function() {
        $('#audio-b').text(parseFloat($(this).val()).toFixed(1) + ' dB');
        that.audioBoost.gain.setValueAtTime(this.value, that.audioCtx.currentTime);
    })

    }
}

var bassConn = function(source, bassBoost, bass, dance, audioCtx){
    new WebkitInputRangeFillLower({
        selectors: ["bass", "treb-boost"],
        color: '#63cdff'
    });

    // source.connect(bassBoost);
    bassBoost.connect(bass);
    bass.connect(dance);
    dance.connect(analyser);
    analyser.connect(audioCtx.destination);
}

function bassCon(source, bassBoost, bass, audioCtx,analyser) {
    new WebkitInputRangeFillLower({
        selectors: ["bass","bass-boost","threshold","treb-boost"],
        color: '#63cdff'
    });

    source.connect(bassBoost);
    bassBoost.connect(bass);
    bass.connect(analyser);
    analyser.connect(audioCtx.destination);
}

let  eqDefault = function() {
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
module.exports = AudioEngine;