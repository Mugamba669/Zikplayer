/**
 * This section aids in modifying the music played through providing equalizer settings ,room effects,visualizers and compressor
 * @ Mugamba Bruno 2021
 */
const $ = require('jquery');
const EqKnobs = require('../Plugins/Eq-knobs');
const Visualizer = require('./Visualizer');

class AudioEngine{
    constructor(audio = {}){
        this.bst = 0;
        this.globalBass = 0;
        this.globalBBoost = 0;
        this.globalStereo = 0;
        this.globalTreb = 0;
      
        this.si1 = null
        this.dy2 = null
        this.si2 = null;
        this.audio  = audio;
        this.changeColor = (value = 0)=>{
            if(value < 20){
                return "#88ff88";
            }else if(value < 40 ){
        
            }else if(value < 60){
                return "#567CE4";
            }else if(value < 101){
                return "#FF0101";
            }
        }
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
        this.dy1 = (value)=>{
           return new EqKnobs({
                initialValue:value,
                minValue:0,
                maxValue:1.6,
                size:140,
                trackWidth:0.4,
                trackColor:'#ccff00'
            });
        }
        this.eqsw = false;
        new WebkitInputRangeFillLower({
            selectors: 'treb-boost',
            color: '#63cdff'
        });

       

          /* Visualisser */
          try {
            $(".canvas-full").hide();
            $(".sp1").hide();
            } catch (error) {
                console.log(error)
            }

        this.visualizer = new Visualizer(this.analyser,'.canvas-full')
        var that = this;
            // this.visualizer.barsVisualiser();
        $(".visual-table tr").eq(0).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.barsVisualiser();
        })

        $(".visual-table tr").eq(2).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.choroFloroVisualiser();
        });

        $(".visual-table tr").eq(1).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
             that.visualizer.dustyParticles();
        });

        $(".visual-table  tr").eq(6).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.glassTilesVisualiser();
        });

        $(".visual-table  tr").eq(5).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.historgramVisualiser();
        })

        $(".visual-table  tr").eq(7).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.ripleWaveVisualiser()
        })

        $(".visual-table  tr").eq(8).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.colorstetchVisualiser()
        })

        $(".visual-table  tr").eq(4).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.sineWaveVisualiser();
        });

        $(".visual-table  tr").eq(3).on('click',function() {
            $(".canvas-full").hide();
            $(".sp1").show();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.spiralVisualiser(".sp1");
        })

        $(".visual-table  tr").eq(9).on('click',function() {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            that.visualizer.floatingBars();
        })

        $(".visual-table  tr").eq(10).on('click',function() {
            $(".canvas-full").hide();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
        })
        /*=============================================*/
        /**
         * Enable Eq settings
         */
        $(".tune-on-eq").on('change',() => {
            if($(".tune-on-eq").get(0).checked  == true){
                this.eqsw = true;
                $('#eqns').attr('disabled',false);
                // this.source.diconnect(this.analyser)
                // this.analyser.disconnect(this.audioCtx.destination);

                this.source.connect(this.treble)
                this.treble.connect(this.compressor);
                this.compressor.connect(this.audioBoost);
                this.audioBoost.connect(this.balance);
                this.balance.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                bassCon(this.source, this.bassBoost, this.bass, this.audioCtx,this.analyser);
            }else{
                // bassDisCon(this.source, this.bassBoost, this.bass, this.audioCtx,this.analyser);
                this.eqsw = false;
                $('#eqns').attr('disabled',true);
                this.source.disconnect(this.treble)
                this.treble.disconnect(this.compressor);
                this.compressor.disconnect(this.audioBoost);
                this.audioBoost.disconnect(this.balance);
                this.balance.disconnect(this.analyser);
                this.analyser.disconnect(this.audioCtx.destination);

                this.source.connect(this.analyser)
                this.analyser.connect(this.audioCtx.destination);
            }
        });
         /**
         * connections
         */
          this.source.connect(this.analyser)
          this.analyser.connect(this.audioCtx.destination);
         // --Analyser settings
         this.analyser.fftSize = 1024;
         this.analyser.minDecibels = -90;
         this.analyser.maxDecibels = 0;
         this.analyser.smoothingTimeConstant = 0.88; 
    }
    tuneStereo(selector){
        var that =this;
       new EqKnobs({
        trackColor:"#D4E069",
        size:110,
        trackWidth:0.3,
        initialValue:this.globalStereo,
        minValue:0,
        bgColor:'#333333',
        maxValue:5,
       }).knobControl(selector,(knob,output)=>{
            $("#st-out").text((output).toFixed(2));
            that.St_treble_boost.gain.value = output;
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
                $('#bb2').text(Math.floor(parseFloat(1.4).toFixed(1)) + ' dB');
                $('#bb1').text(Math.floor(parseFloat(20).toFixed(1)) + ' dB');
                this.globalTreb = 0.60;
               this.globalBBoost = 1.4;
               this.globalBass = 20;
               this.globalStereo = 0;
                this.bst = 1.4;
                $('#tb2').text(parseFloat(0.6).toFixed(3) + ' dB');
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0);
                $('#threshold-v').text(0);
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser)
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

               this.globalTreb = 0.8;
               this.globalBBoost = 2.0;
               this.globalBass = 58;
               this.globalStereo = 0;
                this.bst = 2.0;
                $('#bb2').text(Math.floor(parseFloat(2.0).toFixed(1)) + ' dB');
                $('#bb1').text(Math.floor(parseFloat(58).toFixed(1)) + ' dB');
                $('#tb2').text(parseFloat(0.8).toFixed(3) + ' dB');
                $('#threshold').val(-58.4)
                $('#threshold-v').text(-58.4);
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
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
    
                  this.bst = 2.7;
                  this.globalTreb = 0.50;
                  this.globalBBoost = 1.4;
                  this.globalBass = 46;
                  this.globalStereo = 0;
                $('#bb1').text(Math.floor(parseFloat(50).toFixed(1)) + ' dB');
                $('#tb2').text(parseFloat(0.5).toFixed(3) + ' dB');
                $('#threshold').val(0);
                $('#threshold-v').text(0);

            if(this.eqsw == true){
                 this.source.connect(this.bassBoost);
                this.bassBoost.connect(this.bass);
                this.bass.connect(this.dance);
                this.dance.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
            }else{
                this.source.disconnect(this.bassBoost);
                this.bassBoost.disconnect(this.bass);
                this.bass.disconnect(this.dance);
                this.dance.disconnect(this.analyser);
                this.analyser.disconnect(this.audioCtx.destination);
            }
               
                break;

            case 'reg':
                this.treble.type = 'bandpass';
                this.treble.frequency.value = 0;
                this.bass.frequency.value = 35;
                // bass.Q.value = 7;
                this.bassBoost.gain.setValueAtTime(4.0, this.audioCtx.currentTime);
                this.stereo.frequency.value = 0.49;
        
                this.bst = 4.0;
                this.globalTreb = 0.49;
                this.globalBBoost = 4.0;
                this.globalBass = 35;
                this.globalStereo = 0;
                $('#bb2').text(Math.floor(parseFloat(4.0).toFixed(1)) + ' dB');
                $("#bass-boost").val(parseFloat(4.0).toFixed(1) + ' dB');
                $('#tb2').text(parseFloat(0.49).toFixed(2) + ' dB');
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0)
                $('#threshold-v').text(0);
               
                break;

            case 'bass':
                this.treble.type = 'bandpass';
                this.treble.frequency.value = 0;
                this.bass.frequency.value = 55;
                // bass.Q.value = 3;
                this.bassBoost.gain.setValueAtTime(2.5, this.audioCtx.currentTime);
                
                this.stereo.frequency.value = 0.70;
               
                this.bst = 2.5;
                this.globalTreb = 0.70;
                this.globalBBoost = 2.5;
                this.globalBass = 55;
                this.globalStereo = 0;
                $('#bb2').textContent = Math.floor(parseFloat(3.5).toFixed(1)) + ' dB';

                $('#bb1').text(Math.floor(parseFloat(58).toFixed(1)) + ' dB');
             
                $('#tb2').text(parseFloat(0.7).toFixed(3) + ' dB');
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx,this.analyser);
                break;

            case 'flat':
                this.treble.type = 'peaking';
               this.bass.frequency.value = 20;
                this.treble.frequency.value = 2000;
                // this.stereo.frequency.value = 
                this.bassBoost.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(1.0).toFixed(1)) + ' dB');
                
                this.bst = 1.0;
                this.globalTreb = 0.60;
                this.globalBBoost = 1.0;
                this.globalBass = 20;
                this.globalStereo = 0;
                
                $('#bb1').text(Math.floor(parseFloat(30).toFixed(1)) + ' dB');
               
                $('#tb2').text(parseFloat(1).toFixed(3) + ' dB');
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx ,this.analyser);
                break;

            case 'rock':
                this.treble.type = 'bandpass';
                this.bass.frequency.value = 53;
                this.treble.frequency.value = 1800;
               
                this.bassBoost.gain.setValueAtTime(2.59, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(2.59).toFixed(1)) + ' dB');


                $('#bb1').text(Math.floor(parseFloat(75).toFixed(1)) + ' dB');
              
                $('#tb2').text(parseFloat(0.5).toFixed(3) + ' dB');
             
                this.stereo.frequency.value = 0.50;
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                this.bst = 2.59;
                $('#threshold').val(0)
                $('#threshold-v').text(0);
                this.globalTreb = 0.50;
                this.globalBBoost = 2.59;
                this.globalBass = 53;
                this.globalStereo = 0;
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
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
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;

            case 'vocal':
                this.treble.type = 'allpass';
                this.bass.frequency.value = 0;
                this.bassBoost.gain.setValueAtTime(0, this.audioCtx.currentTime);
                $('#bb2').text(Math.floor(parseFloat(0).toFixed(1)) + ' dB');

                this.treble.frequency.value = 2000;
        
                this.bst = 0;
                this.globalTreb = 1.8;
                this.globalBBoost = 0;
                this.globalBass = 0;
                this.globalStereo = 0;
                $('#bb1').text(Math.floor(parseFloat(0).toFixed(1)) + ' dB');
               
                $('#tb2').textContent = parseFloat(1.8).toFixed(2) + ' dB';
             
               
                this.stereo.frequency.value = 1.8;
               this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                $('#threshold').val(0)
                $('#threshold-v').text(0);
                // bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;

            case 'pop':
                this.treble.type = 'notch';
                this.bass.frequency.value = 70;
               this.treble.Q.value = 1;
               this.treble.frequency.value = 600;
                
                this.stereo.frequency.value = 0.7;
                this.bassBoost.gain.setValueAtTime(2.0, this.audioCtx.currentTime);
             
                this.bst = 2.0;
                this.globalTreb = 0.70;
                this.globalBBoost = 2.0;
                this.globalBass = 70;
                this.globalStereo = 0;
                
                $('#bb2').text(Math.floor(parseFloat(2.0).toFixed(1)) + ' dB');

                $('#bb1').text(Math.floor(parseFloat(70).toFixed(1)) + ' dB');
                
                $('#tb2').textContent = parseFloat(0.7).toFixed(3) + ' dB';
              
                this.compressor.threshold.setValueAtTime(0, this.audioCtx.currentTime);
                 $('#threshold').val(0)
                 $('#threshold-v').text(0);
                //  bassCon(this.source, this.bassBoost, this.bass, this.audioCtx , this.analyser);
                break;
        }
    }
    tuneBass(selector){
    // from user 
       
 new EqKnobs({
        trackColor:"#88ff88",
        size:120,
        trackWidth:0.45,
        initialValue:this.globalBass,
        bgColor:'#333333',
        minValue:0,
        maxValue:120,
    }).knobControl(selector,(knob,output)=>{
        //   console.log('bass '+output)
            $('#bb1').text((output).toFixed(1) + ' dB');
            // this.changeColor(knobs.)
            this.bass.frequency.setValueAtTime(output, this.audioCtx.currentTime);
    });
    }

    tuneMidVocal(selector){
        this.treble.type = 'peaking';
        this.treble.frequency.value = 2000;

       new EqKnobs({
            trackColor:"#D4E069",
            size:110,
            trackWidth:0.3,
            initialValue:this.globalTreb,
            minValue:0,
            bgColor:'#333333',
            maxValue:4,
        }).knobControl(selector,(knob,output)=>{
            $('#tb2').text((output.toFixed(2))+ ' dB');
            this.trebleBoost.gain.setValueAtTime(output, this.audioCtx.currentTime);
        })
    }

    /**
     * 
     * @param {BassBooster} selector 
     * Tuning the bassboaster
     */
    tuneBassBooster(selector){
    //-------Initials 
    $('#bb2').text(parseFloat(2.0).toFixed(2) + ' dB');
    this.bassBoost.gain.value = 2.0;

    var nodeSwitch = (value, a, b) => {
        switch (value) {
            case 0:
                a.disconnect(b);
                b.disconnect(this.bass);
                a.connect(this.bass);
                this.bass.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                break;

            default:
                a.connect(b);
                b.connect(this.bass);
                this.bass.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                break;
        }
    }
        let bbvalue = parseFloat($('#bb2').text());
     new EqKnobs({
        trackColor:"#88ff88",
        size:120,
        trackWidth:0.45,
        bgColor:'#333333',
        initialValue:bbvalue,
        value:this.globalBBoost,
        minValue:0,
        maxValue:4,
    }).knobControl(selector, (knob,value)=>{
        $('#bb2').text((value).toFixed(2) + ' dB');
        this.bst = (value) + ' dB';
        this.bassBoost.gain.setValueAtTime(value, this.audioCtx.currentTime);
        if(this.eqsw == true){
            nodeSwitch(value, this.source, this.bassBoost);
        }
      
    });
   
      
    
    }
    /**
     * This method aids in tunning the audio compressions
     */
    tuneCompressor(selector){
        var inputs = document.querySelectorAll(selector);
        var that = this;
        $(inputs).each((index,dom) => {
            switch (index) {
                case 2:
                    // $(dom).val()
                    new EqKnobs({
                            trackColor:"red",
                            trackWidth:0.4,
                            bgColor:"#222",
                            initialValue:0.003,
                            maxValue:1,
                            size:140,
                            minValue:0,
                        }).knobControl(dom,(knob,value)=>{
                        $('#attack-v').text(parseFloat(value).toFixed(1) + ' dB');
                        this.compressor.attack.setValueAtTime(value,this.audioCtx.currentTime); //(0->1)
                    })
                break;
                
                case 0:
                    new EqKnobs({
                        trackColor:"#73EEE8",
                        trackWidth:0.4,
                        bgColor:"#222",
                        initialValue:0,
                        maxValue:0,
                        size:140,
                        minValue:-100,
                    }).knobControl(dom,(knob,value)=>{
                        $('#threshold-v').text(parseFloat(value).toFixed(1) + ' dB');
                        this.compressor.threshold.setValueAtTime(value,this.audioCtx.currentTime);//(0-> -100)
                })

                break;

                case 1:
                    
                    new EqKnobs({
                        trackColor:"#8D60F8E7",
                        trackWidth:0.4,
                        bgColor:"#222",
                        initialValue:20,
                        maxValue:30,
                        size:140,
                        minValue:0,
                    }).knobControl(dom,(knob,value)=>{
                        $('#knee-v').text(parseFloat(value).toFixed(1) + ' dB');
                        this.compressor.knee.setValueAtTime(value.toFixed(2),this.audioCtx.currentTime);//(0 -> 40)
                })
                break;
                
                case 4:
                    
                    new EqKnobs({
                        trackColor:"#65D14A",
                        trackWidth:0.4,
                        bgColor:"#222",
                        initialValue:12,
                        maxValue:20,
                        size:140,
                        minValue:1,
                    }).knobControl(dom,(knob,value)=>{
                      
                        $('#ratio-v').text(parseFloat(value).toFixed(1) + ' dB');
                        this.compressor.ratio.setValueAtTime(value.toFixed(2),this.audioCtx.currentTime);//( 1-> 20)
                })
                break;

                case 3:
                    new EqKnobs({
                        trackColor:"#D1C44A",
                        trackWidth:0.4,
                        bgColor:"#222",
                        initialValue:0.25,
                        maxValue:1,
                        size:140,
                        minValue:0,
                    }).knobControl(dom,(knob,value)=>{
                        $('#release-v').text(parseFloat(value).toFixed(2) + ' dB');
                        this.compressor.release.setValueAtTime(value,this.audioCtx.currentTime);//(0-> 1)
                })
                break;
            }
        })
    }
    tuneRoomOptions(selector){

        var d1 = 0, d2 = 0, s1 = 0, s2 = 0,that = this;
        
        $(selector).on('input',()=> {
        switch ($(selector).val()) {
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
        
    })
    that.dy1(d1).knobControl('.dy1',(knob,value)=>{
        $("#d1").text(value.toFixed(2)+ ' dB');
         this.delay1.delayTime.setValueAtTime(value,this.audioCtx.currentTime)
       })
           new EqKnobs({
            initialValue:d2,
            minValue:0,
            maxValue:1.6,
            size:140,
            trackWidth:0.4,
            trackColor:'#ccff00'
        }).knobControl('.d2',(knob,value)=>{
         $("#d2").text(value.toFixed(2)+ ' dB');
          this.delay1.delayTime.setValueAtTime(value,this.audioCtx.currentTime)
        })

        new EqKnobs({
            initialValue:s1,
            minValue:0,
            maxValue:1.5,
            size:140,
            trackWidth:0.4,
            trackColor:'#ccff00'
        }).knobControl('.s1',(knob,value)=>{
         $("#s1").text(value.toFixed(2)+ ' dB');
          this.size1.gain.setValueAtTime(value,this.audioCtx.currentTime)
        })

        new EqKnobs({
            initialValue:s2,
            minValue:0,
            maxValue:1.5,
            size:140,
            trackWidth:0.4,
            trackColor:'#ccff00'
        }).knobControl('.s2',(knob,value)=>{
         $("#s2").text(value.toFixed(2) + ' dB');
          this.size2.gain.setValueAtTime(value,this.audioCtx.currentTime)
        })

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
            // new WebkitInputRangeFillLower({
            //     selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
            //     color: '#63cdff'
            // });
        }
    
        //Update RoomEffects sliders
        function updateREffects(a, b, c, d) {
            let pos = 0;
            // $("#d1-v").val(a);
           
            $("#d1").text(a + ' dB');
            // $("#d2-v").val(b);
            $("#d2").text(b + ' dB');
            // $("#s1-v").val(c);
            $("#s1").text(a + ' dB');
            // $("#s2-v").val(d);
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
            // new WebkitInputRangeFillLower({
            //     selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
            //     color: '#63cdff'
            // });
        }
    }
    tuneRoomEffects(selectors){

        var inputs = document.querySelectorAll(selectors);
        var that = this;
        $(inputs).each((index,domElement) => {
            switch (index) {
                        case 3:
                           
                            break;
            
                            case 2:
                              
                                break;
            }
        })  
    }
    tuneRoomSwitch(selector){
         /*
     *Room Effects
     *
     */
    /*   Effects switch on
     */
       
        function effectsOff(source, splitter, merger, audioCtx) {
            source.disconnect(splitter);
            merger.disconnect(audioCtx.destination);
            $('.switch-label').text('off');
            $("#r-effects").prop('disabled', true);
        }

        function effectsOn(source, splitter, merger, audioCtx) {
            source.connect(splitter);
            merger.connect(audioCtx.destination)
            $('.switch-label').text('on');
            $("#r-effects").prop('disabled', false);
        }


        $(selector).on('change',() => {       
                $(selector).get(0).checked?
                effectsOn(this.source, this.splitter, this.merger, this.audioCtx):
                effectsOff(this.source, this.splitter, this.merger, this.audioCtx);
       })
    }
    tuneAudioBalance(selector){
        new EqKnobs({
            trackWidth:0.4,
            bgColor:'#222222',
            trackColor:"#65F32C",
            minValue:-1,
            initialValue:0,
            maxValue:1,
            size:150
        }).knobControl(selector,(knob,value)=>{
            $('#bal').text(value.toFixed(1) + ' dB');
            this.balance.pan.setValueAtTime(value.toFixed(2),this.audioCtx.currentTime);
        })
    }
    tuneAudioPower(selector){
        //Audio Gain
    new EqKnobs({
        trackWidth:0.4,
        bgColor:'#222222',
        trackColor:"#65F32C",
        minValue:0,
        initialValue:1,
        maxValue:4,
        size:170
    }).knobControl(selector,(knob,value)=>{
        $('#audio-b').text((value).toFixed(1) + ' dB');
        this.audioBoost.gain.setValueAtTime(value, this.audioCtx.currentTime);
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

function bassDisCon(source, bassBoost, bass, audioCtx,analyser) {

    source.disconnect(bassBoost);
    bassBoost.disconnect(bass);
    bass.disconnect(analyser);
    analyser.disconnect(audioCtx.destination);
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