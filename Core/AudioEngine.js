/**
 * This section aids in modifying the music played through providing equalizer settings ,room effects,visualizers and compressor
 * @ Mugamba Bruno 2021
 */
const $ = require('jquery');
const EqKnobs = require('../Plugins/Eq-knobs');
const { presets, Rooms } = require('./Presets');
const Visualizer = require('./Visualizer');
const bands = document.querySelectorAll('.bands');
const bandValue = document.querySelectorAll('.bd');
class AudioEngine{
    constructor(audio = {}){
        this.bst = 0;
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
        this.sourceNode = new MediaElementAudioSourceNode(this.audioCtx,{mediaElement:this.audio});
        this.analyser = new AnalyserNode(this.audioCtx,{minDecibels:-80,maxDecibels:-10,smoothingTimeConstant:0.88});
          //  bands 
        this.bandFilter1 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:32,type:'peaking'});
        this.bandFilter2 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:62,type:'peaking'});
        this.bandFilter3 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:125,type:'peaking'});
        this.bandFilter4 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:250,type:'peaking'});
        this.bandFilter5 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:500,type:'peaking'});
        this.bandFilter6 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:1000,type:'peaking'});
        this.bandFilter7 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:2000,type:'peaking'});
        this.bandFilter8 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:4000,type:'peaking'});
        this.bandFilter9 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:8000,type:'peaking'});
        this.bandFilter10 = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:16000,type:'peaking'});
        this.gainNode = new GainNode(this.audioCtx,{gain:0.9});
        // Tone
        this.bassAmp = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:20,type:'peaking'});
        this.trebleAmp = new BiquadFilterNode(this.audioCtx,{gain:0,frequency:18000,type:'peaking',Q:0.46});
       
        /**
         * Audio Balance
         */
        this.balance = new StereoPannerNode(this.audioCtx,{pan:0});
        /**
         * Audio Compressor
         */
        this.compressor = new DynamicsCompressorNode(this.audioCtx,{threshold:0,knee:10,release:0,ratio:1,attack:0.3});
         /* Room Effects
         */
        this.splitter = new ChannelSplitterNode(this.audioCtx,{numberOfOutputs:2});
        this.merger = new ChannelMergerNode(this.audioCtx,{numberOfInputs:2});
        /**
         * Delay nodes to help in create the room effects
         */
         this.leftDelay = new DelayNode(this.audioCtx,{delayTime:0});
         this.rightDelay = new DelayNode(this.audioCtx,{delayTime:0});
         this.midDelay = new DelayNode(this.audioCtx,{delayTime:0});
        /**
         * Gain nodes to aid in audio audibility
         */
        this.leftGain = new GainNode(this.audioCtx,{gain:0});
        this.rightGain = new GainNode(this.audioCtx,{gain:0});
        this.midGain = new GainNode(this.audioCtx,{gain:0});
        /**
         * Method to update the bands
         *  */   
     
    this.updateBands = (band1 = 0,band2 = 0,band3 = 0,band4 = 0,band5 = 0,band6 = 0,band7 = 0,band8 = 0,band9 = 0,band10 = 0) => {
         bands[0].value = band1;
         bands[1].value = band2;
         bands[2].value = band3;
         bands[3].value = band4;
         bands[4].value = band5;
         bands[5].value = band6;
         bands[6].value = band7;
         bands[7].value = band8;
         bands[8].value = band9;
         bands[9].value = band10;
         // band Values
         bandValue[0].textContent = band1;
         bandValue[1].textContent = band2;
         bandValue[2].textContent = band3;
         bandValue[3].textContent = band4;
         bandValue[4].textContent = band5;
         bandValue[5].textContent = band6;
         bandValue[6].textContent = band7;
         bandValue[7].textContent = band8;
         bandValue[8].textContent = band9;
         bandValue[9].textContent = band10;
         
     
     }

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

       

          /* Visualizers */
          try {
            $(".canvas-full").hide();
            $(".sp1").hide();
            } catch (error) {
                console.log(error)
            }
            this.audio.addEventListener('playing',() => {
                // connections
                this.sourceNode.connect(this.balance);
                this.balance.connect(this.analyser)
                this.analyser.connect(this.audioCtx.destination)
            },false)
        const visualizer = new Visualizer(this.analyser,'.canvas-full');
            // this.visualizer.barsVisualiser();
        $(".visual-table tr").eq(0).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.barsVisualiser();
        })

        $(".visual-table tr").eq(2).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.choroFloroVisualiser();
        });

        $(".visual-table tr").eq(1).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
             visualizer.dustyParticles();
        });

        $(".visual-table  tr").eq(6).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.glassTilesVisualiser();
        });

        $(".visual-table  tr").eq(5).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.historgramVisualiser();
        })

        $(".visual-table  tr").eq(7).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.ripleWaveVisualiser()
        })

        $(".visual-table  tr").eq(8).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.colorstetchVisualiser()
        })

        $(".visual-table  tr").eq(4).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.sineWaveVisualiser();
        });

        $(".visual-table  tr").eq(3).on('click',() => {
            $(".canvas-full").hide();
            $(".sp1").show();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.spiralVisualiser(".sp1");
        })

        $(".visual-table  tr").eq(9).on('click',() => {
            $(".canvas-full").show();
            $(".sp1").hide();
            $('.Visualbox .body').removeClass('active')
            $('.Visualbox').removeClass('active')
            visualizer.floatingBars();
        })

        $(".visual-table  tr").eq(10).on('click',() => {
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
                this.sourceNode.disconnect(this.balance);
                this.balance.disconnect(this.analyser)
                this.analyser.disconnect(this.audioCtx.destination)
                    // connections
                    this.sourceNode.connect(this.bandFilter1);
                    this.bandFilter1.connect(this.bandFilter2);
                    this.bandFilter2.connect(this.bandFilter3);
                    this.bandFilter3.connect(this.bandFilter4);
                    this.bandFilter4.connect(this.bandFilter5);
                    this.bandFilter5.connect(this.bandFilter6);
                    this.bandFilter6.connect(this.bandFilter7);
                    this.bandFilter7.connect(this.bandFilter8);
                    this.bandFilter8.connect(this.bandFilter9);
                    this.bandFilter9.connect(this.bandFilter10);
                    this.bandFilter10.connect(this.gainNode);
                    this.gainNode.connect(this.bassAmp);
                    this.bassAmp.connect(this.trebleAmp);
                    this.trebleAmp.connect(this.balance)
                    this.balance.connect(this.analyser)
                    this.analyser.connect(this.audioCtx.destination)
            }else{
                this.eqsw = false;
                $('#eqns').attr('disabled',true);
                this.sourceNode.disconnect(this.bandFilter1);
                this.bandFilter1.disconnect(this.bandFilter2);
                this.bandFilter2.disconnect(this.bandFilter3);
                this.bandFilter3.disconnect(this.bandFilter4);
                this.bandFilter4.disconnect(this.bandFilter5);
                this.bandFilter5.disconnect(this.bandFilter6);
                this.bandFilter6.disconnect(this.bandFilter7);
                this.bandFilter7.disconnect(this.bandFilter8);
                this.bandFilter8.disconnect(this.bandFilter9);
                this.bandFilter9.disconnect(this.bandFilter10);
                this.bandFilter10.disconnect(this.gainNode);
                this.gainNode.disconnect(this.bassAmp);
                this.bassAmp.disconnect(this.trebleAmp);
                this.trebleAmp.disconnect(this.balance)
                this.balance.disconnect(this.analyser)
                this.analyser.disconnect(this.audioCtx.destination)

                this.sourceNode.connect(this.balance);
                this.balance.connect(this.analyser)
                this.analyser.connect(this.audioCtx.destination)
            }
        });

         /**
         * Reset Equaliser settings
         */
          this.resetEqualiser =  ()=>{
            this.updateBands(0,0,0,0,0,0,0,0,0,0);
            $(".tune-on-eq").get(0).checked = false;
            this.eqsw = false;
            $('#eqns').val('Preset');
            $('#eqns').attr('disabled',true);
            this.sourceNode.disconnect(this.bandFilter1);
            this.bandFilter1.disconnect(this.bandFilter2);
            this.bandFilter2.disconnect(this.bandFilter3);
            this.bandFilter3.disconnect(this.bandFilter4);
            this.bandFilter4.disconnect(this.bandFilter5);
            this.bandFilter5.disconnect(this.bandFilter6);
            this.bandFilter6.disconnect(this.bandFilter7);
            this.bandFilter7.disconnect(this.bandFilter8);
            this.bandFilter8.disconnect(this.bandFilter9);
            this.bandFilter9.disconnect(this.bandFilter10);
            this.bandFilter10.disconnect(this.gainNode);
            this.gainNode.disconnect(this.bassAmp);
            this.bassAmp.disconnect(this.trebleAmp);
            this.trebleAmp.disconnect(this.balance)
            this.balance.disconnect(this.analyser)
            this.analyser.disconnect(this.audioCtx.destination)

            this.sourceNode.connect(this.balance);
            this.balance.connect(this.analyser)
            this.analyser.connect(this.audioCtx.destination)
        }
/**
 * Button to activate equalizer reset
 */
        $('.eq-reset').on('click',()=>{
            $('.alert-msg').text('Equaliser settings have been reset')
            $('.alert-notification').slideDown(200).delay(4000).slideUp(100)
            this.resetEqualiser();
        });
    }

    /**
     * AudioEngine Methods
     */
    tuneStereo(selector){
       new EqKnobs({
        trackColor:"#D4E069",
        size:100,
        trackWidth:0.4,
        initialValue:0,
        minValue:0,
        bgColor:'#333333',
        maxValue:80,
       }).knobControl(selector,(knob,output)=>{
            $(".treble-Val").text((output).toFixed(1)+'dB');
            this.trebleAmp.gain.setValueAtTime(output,this.audioCtx.currentTime);
        });
    }
    tuneEq(preset){
        switch (preset) {
            case 'Normal':
                this.bandFilter1.gain.value = presets.Normal[0]
                this.bandFilter2.gain.value = presets.Normal[1]
                this.bandFilter3.gain.value = presets.Normal[2]
                this.bandFilter4.gain.value = presets.Normal[3]
                this.bandFilter5.gain.value = presets.Normal[4]
                this.bandFilter6.gain.value = presets.Normal[5]
                this.bandFilter7.gain.value = presets.Normal[6]
                this.bandFilter8.gain.value = presets.Normal[7]
                this.bandFilter9.gain.value = presets.Normal[8]
                this.bandFilter10.gain.value = presets.Normal[9]
                this.updateBands(presets.Normal[0],presets.Normal[1],presets.Normal[2],presets.Normal[3],presets.Normal[4],presets.Normal[5],presets.Normal[6],presets.Normal[7],presets.Normal[8],presets.Normal[9])
    
                // update 
                break;
                case 'Bass':
                this.bandFilter1.gain.value = presets.Bass[0]
                this.bandFilter2.gain.value = presets.Bass[1]
                this.bandFilter3.gain.value = presets.Bass[2]
                this.bandFilter4.gain.value = presets.Bass[3]
                this.bandFilter5.gain.value = presets.Bass[4]
                this.bandFilter6.gain.value = presets.Bass[5]
                this.bandFilter7.gain.value = presets.Bass[6]
                this.bandFilter8.gain.value = presets.Bass[7]
                this.bandFilter9.gain.value = presets.Bass[8]
                this.bandFilter10.gain.value = presets.Bass[9]
                this.updateBands(presets.Bass[0],presets.Bass[1],presets.Bass[2],presets.Bass[3],presets.Bass[4],presets.Bass[5],presets.Bass[6],presets.Bass[7],presets.Bass[8],presets.Bass[9])
    
                    break;
                case 'Pop':
                this.bandFilter1.gain.value = presets.Pop[0]
                this.bandFilter2.gain.value = presets.Pop[1]
                this.bandFilter3.gain.value = presets.Pop[2]
                this.bandFilter4.gain.value = presets.Pop[3]
                this.bandFilter5.gain.value = presets.Pop[4]
                this.bandFilter6.gain.value = presets.Pop[5]
                this.bandFilter7.gain.value = presets.Pop[6]
                this.bandFilter8.gain.value = presets.Pop[7]
                this.bandFilter9.gain.value = presets.Pop[8]
                this.bandFilter10.gain.value = presets.Pop[9]
                this.updateBands(presets.Pop[0],presets.Pop[1],presets.Pop[2],presets.Pop[3],presets.Pop[4],presets.Pop[5],presets.Pop[6],presets.Pop[7],presets.Pop[8],presets.Pop[9])
    
                        break;
    
                        case 'Treble':
                            this.bandFilter1.gain.value = presets.Treble[0]
                            this.bandFilter2.gain.value = presets.Treble[1]
                            this.bandFilter3.gain.value = presets.Treble[2]
                            this.bandFilter4.gain.value = presets.Treble[3]
                            this.bandFilter5.gain.value = presets.Treble[4]
                            this.bandFilter6.gain.value = presets.Treble[5]
                            this.bandFilter7.gain.value = presets.Treble[6]
                            this.bandFilter8.gain.value = presets.Treble[7]
                            this.bandFilter9.gain.value = presets.Treble[8]
                            this.bandFilter10.gain.value = presets.Treble[9]
                            this.updateBands(presets.Treble[0],presets.Treble[1],presets.Treble[2],presets.Treble[3],presets.Treble[4],presets.Treble[5],presets.Treble[6],presets.Treble[7],presets.Treble[8],presets.Treble[9])
                
                           break;
    
    
                           case 'Live':
                            this.bandFilter1.gain.value = presets.Live[0]
                            this.bandFilter2.gain.value = presets.Live[1]
                            this.bandFilter3.gain.value = presets.Live[2]
                            this.bandFilter4.gain.value = presets.Live[3]
                            this.bandFilter5.gain.value = presets.Live[4]
                            this.bandFilter6.gain.value = presets.Live[5]
                            this.bandFilter7.gain.value = presets.Live[6]
                            this.bandFilter8.gain.value = presets.Live[7]
                            this.bandFilter9.gain.value = presets.Live[8]
                            this.bandFilter10.gain.value = presets.Live[9]
                            this.updateBands(presets.Live[0],presets.Live[1],presets.Live[2],presets.Live[3],presets.Live[4],presets.Live[5],presets.Live[6],presets.Live[7],presets.Live[8],presets.Live[9])
                
                           break;
    
                           case 'Loud':
                            this.bandFilter1.gain.value = presets.Loud[0]
                            this.bandFilter2.gain.value = presets.Loud[1]
                            this.bandFilter3.gain.value = presets.Loud[2]
                            this.bandFilter4.gain.value = presets.Loud[3]
                            this.bandFilter5.gain.value = presets.Loud[4]
                            this.bandFilter6.gain.value = presets.Loud[5]
                            this.bandFilter7.gain.value = presets.Loud[6]
                            this.bandFilter8.gain.value = presets.Loud[7]
                            this.bandFilter9.gain.value = presets.Loud[8]
                            this.bandFilter10.gain.value = presets.Loud[9]
                            this.updateBands(presets.Loud[0],presets.Loud[1],presets.Loud[2],presets.Loud[3],presets.Loud[4],presets.Loud[5],presets.Loud[6],presets.Loud[7],presets.Loud[8],presets.Loud[9])
                
                           break;
                
                case 'Reggea':
                this.bandFilter1.gain.value = presets.Reggea[0]
                this.bandFilter2.gain.value = presets.Reggea[1]
                this.bandFilter3.gain.value = presets.Reggea[2]
                this.bandFilter4.gain.value = presets.Reggea[3]
                this.bandFilter5.gain.value = presets.Reggea[4]
                this.bandFilter6.gain.value = presets.Reggea[5]
                this.bandFilter7.gain.value = presets.Reggea[6]
                this.bandFilter8.gain.value = presets.Reggea[7]
                this.bandFilter9.gain.value = presets.Reggea[8]
                this.bandFilter10.gain.value = presets.Reggea[9]
                this.updateBands(presets.Reggea[0],presets.Reggea[1],presets.Reggea[2],presets.Reggea[3],presets.Reggea[4],presets.Reggea[5],presets.Reggea[6],presets.Reggea[7],presets.Reggea[8],presets.Reggea[9])
    
                break;
    
                case 'Folk':
                    this.bandFilter1.gain.value = presets.Folk[0]
                this.bandFilter2.gain.value = presets.Folk[1]
                this.bandFilter3.gain.value = presets.Folk[2]
                this.bandFilter4.gain.value = presets.Folk[3]
                this.bandFilter5.gain.value = presets.Folk[4]
                this.bandFilter6.gain.value = presets.Folk[5]
                this.bandFilter7.gain.value = presets.Folk[6]
                this.bandFilter8.gain.value = presets.Folk[7]
                this.bandFilter9.gain.value = presets.Folk[8]
                this.bandFilter10.gain.value = presets.Folk[9]
                this.updateBands(presets.Folk[0],presets.Folk[1],presets.Folk[2],presets.Folk[3],presets.Folk[4],presets.Folk[5],presets.Folk[6],presets.Folk[7],presets.Folk[8],presets.Folk[9])
    
                break;
    
                case 'Dance':
                this.bandFilter1.gain.value = presets.Dance[0]
                this.bandFilter2.gain.value = presets.Dance[1]
                this.bandFilter3.gain.value = presets.Dance[2]
                this.bandFilter4.gain.value = presets.Dance[3]
                this.bandFilter5.gain.value = presets.Dance[4]
                this.bandFilter6.gain.value = presets.Dance[5]
                this.bandFilter7.gain.value = presets.Dance[6]
                this.bandFilter8.gain.value = presets.Dance[7]
                this.bandFilter9.gain.value = presets.Dance[8]
                this.bandFilter10.gain.value = presets.Dance[9]
                this.updateBands(presets.Dance[0],presets.Dance[1],presets.Dance[2],presets.Dance[3],presets.Dance[4],presets.Dance[5],presets.Dance[6],presets.Dance[7],presets.Dance[8],presets.Dance[9])
    
                break;
    
                case 'SoftTreble':
                this.bandFilter1.gain.value = presets.SoftTreble[0]
                this.bandFilter2.gain.value = presets.SoftTreble[1]
                this.bandFilter3.gain.value = presets.SoftTreble[2]
                this.bandFilter4.gain.value = presets.SoftTreble[3]
                this.bandFilter5.gain.value = presets.SoftTreble[4]
                this.bandFilter6.gain.value = presets.SoftTreble[5]
                this.bandFilter7.gain.value = presets.SoftTreble[6]
                this.bandFilter8.gain.value = presets.SoftTreble[7]
                this.bandFilter9.gain.value = presets.SoftTreble[8]
                this.bandFilter10.gain.value = presets.SoftTreble[9]
                this.updateBands(presets.SoftTreble[0],presets.SoftTreble[1],presets.SoftTreble[2],presets.SoftTreble[3],presets.SoftTreble[4],presets.SoftTreble[5],presets.SoftTreble[6],presets.SoftTreble[7],presets.SoftTreble[8],presets.SoftTreble[9])
    
                break;
                case 'SoftBass':
                    this.bandFilter1.gain.value = presets.SoftBass[0]
                this.bandFilter2.gain.value = presets.SoftBass[1]
                this.bandFilter3.gain.value = presets.SoftBass[2]
                this.bandFilter4.gain.value = presets.SoftBass[3]
                this.bandFilter5.gain.value = presets.SoftBass[4]
                this.bandFilter6.gain.value = presets.SoftBass[5]
                this.bandFilter7.gain.value = presets.SoftBass[6]
                this.bandFilter8.gain.value = presets.SoftBass[7]
                this.bandFilter9.gain.value = presets.SoftBass[8]
                this.bandFilter10.gain.value = presets.SoftBass[9]
                this.updateBands(presets.SoftBass[0],presets.SoftBass[1],presets.SoftBass[2],presets.SoftBass[3],presets.SoftBass[4],presets.SoftBass[5],presets.SoftBass[6],presets.SoftBass[7],presets.SoftBass[8],presets.SoftBass[9])
    
                break;
                case 'Classic':
                this.bandFilter1.gain.value = presets.Classic[0]
                this.bandFilter2.gain.value = presets.Classic[1]
                this.bandFilter3.gain.value = presets.Classic[2]
                this.bandFilter4.gain.value = presets.Classic[3]
                this.bandFilter5.gain.value = presets.Classic[4]
                this.bandFilter6.gain.value = presets.Classic[5]
                this.bandFilter7.gain.value = presets.Classic[6]
                this.bandFilter8.gain.value = presets.Classic[7]
                this.bandFilter9.gain.value = presets.Classic[8]
                this.bandFilter10.gain.value = presets.Classic[9]
                this.updateBands(presets.Classic[0],presets.Classic[1],presets.Classic[2],presets.Classic[3],presets.Classic[4],presets.Classic[5],presets.Classic[6],presets.Classic[7],presets.Classic[8],presets.Classic[9])
    
                break;
    
                case 'Flat':
                    this.bandFilter1.gain.value = presets.Flat[0]
                this.bandFilter2.gain.value = presets.Flat[1]
                this.bandFilter3.gain.value = presets.Flat[2]
                this.bandFilter4.gain.value = presets.Flat[3]
                this.bandFilter5.gain.value = presets.Flat[4]
                this.bandFilter6.gain.value = presets.Flat[5]
                this.bandFilter7.gain.value = presets.Flat[6]
                this.bandFilter8.gain.value = presets.Flat[7]
                this.bandFilter9.gain.value = presets.Flat[8]
                this.bandFilter10.gain.value = presets.Flat[9]
                this.updateBands(presets.Flat[0],presets.Flat[1],presets.Flat[2],presets.Flat[3],presets.Flat[4],presets.Flat[5],presets.Flat[6],presets.Flat[7],presets.Flat[8],presets.Flat[9])
    
                break;
                case 'Rock':
                this.bandFilter1.gain.value = presets.Rock[0]
                this.bandFilter2.gain.value = presets.Rock[1]
                this.bandFilter3.gain.value = presets.Rock[2]
                this.bandFilter4.gain.value = presets.Rock[3]
                this.bandFilter5.gain.value = presets.Rock[4]
                this.bandFilter6.gain.value = presets.Rock[5]
                this.bandFilter7.gain.value = presets.Rock[6]
                this.bandFilter8.gain.value = presets.Rock[7]
                this.bandFilter9.gain.value = presets.Rock[8]
                this.bandFilter10.gain.value = presets.Rock[9]
                this.updateBands(presets.Rock[0],presets.Rock[1],presets.Rock[2],presets.Rock[3],presets.Rock[4],presets.Rock[5],presets.Rock[6],presets.Rock[7],presets.Rock[8],presets.Rock[9])
                break;
    
                case 'Techno':
                    this.bandFilter1.gain.value = presets.Techno[0]
                    this.bandFilter2.gain.value = presets.Techno[1]
                    this.bandFilter3.gain.value = presets.Techno[2]
                    this.bandFilter4.gain.value = presets.Techno[3]
                    this.bandFilter5.gain.value = presets.Techno[4]
                    this.bandFilter6.gain.value = presets.Techno[5]
                    this.bandFilter7.gain.value = presets.Techno[6]
                    this.bandFilter8.gain.value = presets.Techno[7]
                    this.bandFilter9.gain.value = presets.Techno[8]
                    this.bandFilter10.gain.value = presets.Techno[9]
                    this.updateBands(presets.Techno[0],presets.Techno[1],presets.Techno[2],presets.Techno[3],presets.Techno[4],presets.Techno[5],presets.Techno[6],presets.Techno[7],presets.Techno[8],presets.Techno[9])
                    break;
    
            default:
                break;
        }
    }
    /**
     * This method provides functionality to eq knobs
     */
    adjustBands(){
        bands.forEach((filter,index)=>{
            switch (index) {
                case 0:
                    filter.addEventListener('input',() => {
                        bandValue[0].textContent = filter.value
                        this.bandFilter1.gain.value = filter.value;
                    },false)
                break;
        
                case 1:
                    filter.addEventListener('input',() => {
                        bandValue[1].textContent = filter.value
                        this.bandFilter2.gain.value = filter.value;
                    },false)
                break;
        
                case 2:
                    filter.addEventListener('input',() => {
                        bandValue[2].textContent = filter.value
                        this.bandFilter3.gain.value = filter.value;
                    },false)
                break;
        
                case 3:
                    filter.addEventListener('input',() => {
                        bandValue[3].textContent = filter.value
                        this.bandFilter4.gain.value = filter.value;
                    },false);
                break;
            
                case 4:
                    filter.addEventListener('input',() => {
                        bandValue[4].textContent = filter.value
                        this.bandFilter5.gain.value = filter.value;
                    },false);
                break;
        
                case 5:
                    filter.addEventListener('input',() => {
                        bandValue[5].textContent = filter.value
                        this.bandFilter6.gain.value = filter.value;
                    },false);
                break;
        
                case 6:
                    filter.addEventListener('input',() => {
                        bandValue[6].textContent = filter.value
                        this.bandFilter7.gain.value = filter.value;
                    },false);
                break;
        
                case 7:
                    filter.addEventListener('input',() => {
                        bandValue[7].textContent = filter.value
                        this.bandFilter8.gain.value = filter.value;
                    },false);
                break;
        
                case 8:
                    filter.addEventListener('input',() => {
                        bandValue[8].textContent = filter.value
                        this.bandFilter9.gain.value = filter.value;
                    },false);
                break;
        
                case 9:
                    filter.addEventListener('input',() => {
                        bandValue[9].textContent = filter.value
                        this.bandFilter10.gain.value = filter.value;
                    },false);
                break;
            }
        })
    }
   /**
     * 
     * @param {BassBooster} selector 
     * Tuning the bassboaster
     */
    tuneBassBooster(selector){
    //-------Initials 
     new EqKnobs({
        trackColor:"#56B7F0",
        size:100,
        trackWidth:0.4,
        
        bgColor:'#333333',
        initialValue:0,
        minValue:0,
        maxValue:60,
    }).knobControl(selector, (knob,value)=>{
        $('.bass-Val').text(value.toFixed(1)+'dB')
        this.bassAmp.gain.setValueAtTime(value,this.audioCtx.currentTime);
    });
   
      
    
    }
    /**
     * This method aids in tunning the audio compressions
     */
    tuneCompressor(selector){
        var inputs = document.querySelectorAll(selector);
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

        var that = this;
        
        $(selector).on('input',()=> {
        switch ($(selector).val()) {
            case 'echo':
                nodeCons();
                updateREffects(Rooms.Echo[0],Rooms.Echo[1],Rooms.Echo[2],Rooms.Echo[3]);
                break;

            case 'auditorium':
                nodeCons();
                updateREffects(Rooms.Audit[0],Rooms.Audit[1],Rooms.Audit[2],Rooms.Audit[3]);
                break;

            case 'scene':
                nodeCons();
                updateREffects(Rooms.Scene[0],Rooms.Scene[1],Rooms.Scene[2],Rooms.Scene[3]);
                break;

            case 'smallroom':
                nodeCons();
                updateREffects(Rooms.Sm[0],Rooms.Sm[1],Rooms.Sm[2],Rooms.Sm[3]);
                break;

            case 'medium':
                nodeCons();
                updateREffects(Rooms.Medi[0],Rooms.Medi[1],Rooms.Medi[2],Rooms.Medi[3]);
                break;

            case 'greathall':
                nodeCons();
                updateREffects(Rooms.GtH[0],Rooms.GtH[1],Rooms.GtH[2],Rooms.GtH[3]);
                break;

            case 'stadium':
                nodeCons();
                updateREffects(Rooms.Stadi[0],Rooms.Stadi[1],Rooms.Stadi[2],Rooms.Stadi[3]);
                break;

            default:
                roomDefault();
                break;

        }
        
    })
    that.dy1(d1).knobControl('.dy1',(knob,value)=>{
        $("#d1").text(value.toFixed(2)+ ' dB');
         this.leftDelay.delayTime.setValueAtTime(value,this.audioCtx.currentTime)
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
          this.rightDelay.delayTime.setValueAtTime(value,this.audioCtx.currentTime)
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
          this.leftGain.gain.setValueAtTime(value,this.audioCtx.currentTime)
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
          this.rightGain.gain.setValueAtTime(value,this.audioCtx.currentTime)
        })

        /**
         * Helper methods
         */
         function nodeCons() {
            //
            //source.connect(audioCtx.destination);
            that.splitter.connect(that.leftDelay, 0);
            that.leftDelay.connect(that.leftGain);
            that.leftGain.connect(that.rightDelay);
            //right delay
            that.splitter.connect(that.rightDelay, 1);
            that.rightDelay.connect(that.rightGain);
            that.rightGain.connect(that.leftDelay);
            //left and right delay connected to the merger
            that.leftGain.connect(that.merger, 0, 0);
            that.rightGain.connect(that.merger, 0, 1);
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
            //Values
            that.leftDelay.delayTime.value = 0;
            that.rightDelay.delayTime.value = 0;
            that.leftGain.gain.value = 0;
            that.rightGain.gain.value = 0;
    
           $("#r-effects").val('None');
            /*-------------Styling sliders on change*/
            // new WebkitInputRangeFillLower({
            //     selectors: ["s1-v", "s2-v", "d1-v", "d2-v"],
            //     color: '#63cdff'
            // });
        }
    
        //Update RoomEffects sliders
        function updateREffects(a = 0, b = 0, c = 0, d = 0) {
            $("#d1").text(a + ' dB');
            // $("#d2-v").val(b);
            $("#d2").text(c + ' dB');
            // $("#s1-v").val(c);
            $("#s1").text(b + ' dB');
            // $("#s2-v").val(d);
            $("#s2").text(d + ' dB');
    
            //Other Values
            that.leftDelay.delayTime.value = a;
            that.rightDelay.delayTime.value = c;
            that.leftGain.gain.value = b;
            that.rightGain.gain.value = d;
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
                effectsOn(this.sourceNode, this.splitter, this.merger, this.audioCtx):
                effectsOff(this.sourceNode, this.splitter, this.merger, this.audioCtx);
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
        initialValue:0.8,
        maxValue:4,
        size:170
    }).knobControl(selector,(knob,value)=>{
        $('#audio-b').text((value).toFixed(1) + ' dB');
        this.gainNode.gain.setValueAtTime(value, this.audioCtx.currentTime);
    })
    }
}
module.exports = AudioEngine;