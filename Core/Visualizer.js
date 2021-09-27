/**
 * @2021 Mugamba Bruno 
 * This library introduces audio visualisation by converting audio signals into 
 * animated-2d graphics with the help of WebAudioApi and Canvas Api
 */
const $ = require('jquery');
module.exports = class Visualizer{
    constructor(analyser,canvas) {
        this.analyser = analyser;
        this.cs = canvas;
        this.canvas = document.querySelector(this.cs);
        this.context = this.canvas.getContext('2d');
        this.bufferLength = this.analyser.frequencyBinCount;
        this.freqDomain = new Uint8Array(this.bufferLength);
    }
    // bufferLength
  
     barsVisualiser(){

         var renderCanvas = ()=>{
         window.requestAnimationFrame(renderCanvas);
            this.analyser.getByteFrequencyData(this.freqDomain)

            $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight)
            window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
        /**
         *Lets start by clearing the canvas
         */
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        // set visual Color: 
        this.context.fillStyle = "#FDDD74";
        /**
         * draw visual bars
         */
        for (let index = 0; index < this.bufferLength; index++) {
            var value = this.freqDomain[index] /200;
            var barX = index * 3;//This works on bar spacing
            var barWidth = 2;//This handles the barWidth
            var height = (this.canvas.height) * value;
            var barHeight = this.canvas.height - height - 1;
            /**
             * Now lets draw the bars basing on the array length
             * following this format CanvasRect.fillRect(x: number, y: number, w: number, h: number): void
             *              */
            this.context.fillRect(barX,barHeight,barWidth,height)
        }
    }
renderCanvas()
    }

    /**
     * This method outputs the dirty particles visualiser.
     */
     dustyParticles(){
        var renderDusty = ()=>{
            window.requestAnimationFrame(renderDusty);
            this.analyser.getByteTimeDomainData(this.freqDomain)
               this.analyser.getByteFrequencyData(this.freqDomain)
               $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight)
               window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
           /**
            *Lets start by clearing the canvas
            */
           this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
           // set visual Color: 
           this.context.fillStyle = "#66D9EE";
           /**
            * draw visual bars
            */
           for (let index = 0; index < this.bufferLength; index++) {
               var value = this.freqDomain[index] / 200;
               var barX = index * 3;//This works on bar spacing
               var height = (this.canvas.height) * value;
               var barHeight = this.canvas.height - height - 1;
               /**
                * Now lets draw the bars basing on the array length
                * following this format CanvasRect.fillRect(x: number, y: number, w: number, h: number): void
                *              */
               this.context.fillRect(barX,barHeight,4,4)
           }
       }
       renderDusty()
    }
    sineWaveVisualiser(){
        var renderSineWave = ()=>{
            window.requestAnimationFrame(renderSineWave);
               this.analyser.getByteFrequencyData(this.freqDomain)
               this.analyser.getByteTimeDomainData(this.freqDomain)

               $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight)
               window.onresize = ()=>  $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
           /**
            *Lets start by clearing the canvas
            */
           this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
           /**
            * draw visual bars
            */
            var sliceWidth = (this.canvas.width) * 1.0 / this.bufferLength;
            let start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
            this.context.lineWidth = 2.9;
            this.context.strokeStyle = "#60EEE7"
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.context.beginPath();
            var x = 0;
           for (let index = 0; index < this.bufferLength; index++) {
            var v = this.freqDomain[index] / 125.0;
            var y = v * (this.canvas.height) / 2;

            if (index === 0) {
                this.context.moveTo(x, y);
            } else {
                this.context.lineTo(x, y);
            }

            x = index * sliceWidth //frequencyBins/analyser.sampleRate;
        }
        this.context.lineTo((this.canvas.width), this.freqDomain[0] / 128.0 * (this.canvas.height) / 2);
        this.context.stroke();
       }
       renderSineWave()
    }

    historgramVisualiser(){
        var barHistogram = ()=>{
            window.requestAnimationFrame(barHistogram);
        this.analyser.getByteTimeDomainData(this.freqDomain);
        this.analyser.getByteFrequencyData(this.freqDomain);
        $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight)
        window.onresize = ()=>  $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (var i = 0; i < this.bufferLength; i++) {
            var barWidth = i * 6;
            var barX = 30;
            var percent = this.freqDomain[i] / 400;
            var height = ( this.canvas.height * percent);
            var barHeight = this.canvas.height - height - 1;
            this.context.fillStyle = '#FC78C9';
            this.context.fillRect(barWidth, barHeight, barX, height);
            }
        }
        barHistogram()
    }

    ripleWaveVisualiser(){
        var ripleWaves = ()=>{
            window.requestAnimationFrame(ripleWaves);
            var sliceWidth = (this.canvas.width) * 1.0 / this.bufferLength;
            // var freqD = new Uint8Array(bufferLength);
            this.analyser.getByteTimeDomainData(this.freqDomain);
            this.analyser.getByteFrequencyData(this.freqDomain);
            $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight)
            window.onresize = ()=>  $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
            // riple cicle
            var  radius = this.canvas.height < this.canvas.width ? this.canvas.height :this.canvas.width;
            radius = (radius * 0.65 / 3);
            let WIDTH = this.canvas.width / 2; // default 700
            let HEIGHT = this.canvas.height / 2 // default 300
                    let start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
                    this.context.lineWidth = 1.6;
                    this.context.strokeStyle = '#FFC964'
                    
                    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
                    this.context.beginPath();
                 var x = 0;
                    for (var i = start; i < this.bufferLength; i++) {
                        var v = this.freqDomain[i] / 880.0;
                        var y = v * (this.canvas.height) / 9;
        
                        if (i === 0) {
                            this.context.arc(WIDTH,HEIGHT,(x*=i) / ( y * i),0,(Math.PI*2),false)
                        } else {
                            this.context.arc(WIDTH,HEIGHT,(y/=i) / (x * i),0,(Math.PI*2),false)
                        }
                            this.context.arc(WIDTH,HEIGHT,(y/i) / ((x) * i),0,(Math.PI*2),false)
                            this.context.arc(WIDTH,HEIGHT,(++i) / ((x) * i),0,(Math.PI*2),false)
                            this.context.arc(WIDTH,HEIGHT,(y*i) / ((x*y) * i),0,(Math.PI*2),false)
                            this.context.arc(WIDTH,HEIGHT,(radius/i) / ((x/i) * y),0,(Math.PI*2),false)
                            this.context.arc(WIDTH,HEIGHT,(y*i) / ((x/radius) * i),0,(Math.PI*2),false)
                        
                        x = i * sliceWidth //frequencyBins/analyser.sampleRate;
                    }
                    this.context.stroke();
                    this.context.closePath()
        }
        ripleWaves();
    }

   choroFloroVisualiser(){

   var renderUpDownFrame  = ()=>  {
        window.requestAnimationFrame(renderUpDownFrame);
           var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
          this.analyser.getByteFrequencyData(freqDomain);
          
           $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
           window.onresize = ()=>  $(this.canvas).attr("width",window.innerWidth).attr("height",window.innerHeight);
           this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
           for(let i = 0;i < this.bufferLength;i++){
			var value = freqDomain[i*2] / 400;
			var barx = i * 5.5;
			var barW = 2;
			var height = this.canvas.height * value;
			var barH = this.canvas.height - height - 1;

		// Up frame
			this.context.fillStyle = "#E8F572";
			this.context.setTransform(1, 0, 0, 1, 0, 0);
			this.context.translate(1300, -400);
			this.context.scale(-1, 1)
			this.context.fillRect(barx,barH,barW,height);
            // down frame
			this.context.fillStyle = "#E8F572";
			this.context.setTransform(1, 0, 0, 1, 0, 0);
			this.context.translate(1300, 1080);// 1050, 916
			this.context.scale(-1,-1);
			this.context.fillRect(barx,barH,barW,height);
			}
       }
       renderUpDownFrame();
   }

   spiralVisualiser(selector){
    var that = this;
    var spiralVisual = () => {
    window.requestAnimationFrame(spiralVisual);
    var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freqDomain);

    var visuals = document.querySelectorAll(selector);
    var context;
    // creating spiral visualizer
    visuals.forEach(elem => {
        context = $(elem).get(0).getContext("2d");
        $(elem).attr("width",window.innerWidth ).attr("height",window.innerHeight/2);
        window.onresize = ()=>  $(elem).attr("width",window.innerWidth).attr("height",window.innerHeight/2);
       var WIDTH = elem.width;
       var HEIGHT = elem.height;
        context.clearRect(0, 0, WIDTH, HEIGHT);
       
        context.fillStyle = "#FFB28F";
        for (let index = 0; index < WIDTH; index++) {
            var barX = index * 3;
            var barWidth = 2;
            var element = freqDomain[index] / 220;
            var offset = HEIGHT * element;
            var height = HEIGHT - offset - 1;
            context.fillRect(barX, height, barWidth, offset);
        }
    });
}
spiralVisual()
}

   glassTilesVisualiser(){
    var glassPills = ()=>{
        window.requestAnimationFrame(glassPills);
    this.analyser.getByteFrequencyData(this.freqDomain);
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = '#85EE8A';
    for (var i = 0; i < this.bufferLength / 5 ; i++) {
        var barWidth = i * 12;
        var barX = 7.5;
        var percent = this.freqDomain[i] / 327;
        var height = (this.canvas.height * percent);
        var barHeight = this.canvas.height - height - 1;
        this.context.strokeRect(barWidth, barHeight, barX, height);
    }
     }
   glassPills();
   }

}