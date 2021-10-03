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
        // setup = true;
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
            // this.analyser.getByteTimeDomainData(this.freqDomain)
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
            
               this.analyser.getByteTimeDomainData(this.freqDomain)

               $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight)
               window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
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
        
        this.analyser.getByteFrequencyData(this.freqDomain);
        $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight)
        window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
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
            this.analyser.getByteFrequencyData(this.freqDomain);
            var sliceWidth = (this.canvas.width) * 1.0 / this.bufferLength;
            
            $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight)
            window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
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
        this.analyser.getByteFrequencyData(this.freqDomain);
           $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
           window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
           this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
           for(let i = 0;i < this.bufferLength;i++){
			var value = this.freqDomain[i*2] / 400;
			var barx = i * 5.5;
			var barW = 2;
			var height = this.canvas.height * value;
			var barH = this.canvas.height - height - 1;

		// Up frame
			this.context.fillStyle = "#E8F572";
			this.context.setTransform(1, 0, 0, 1, 0, 0);
            $(window).on('resize',()=>{
                this.context.translate(1300, -400);
            })
			this.context.translate(1300, -400);
			this.context.scale(-1, 1)
			this.context.fillRect(barx,barH,barW,height);
            // down frame
			this.context.fillStyle = "#E8F572";
			this.context.setTransform(1, 0, 0, 1, 0, 0);
            $(window).on('resize',()=>{
                this.context.translate(1300, -400);
            })
			this.context.translate(1300, 1080);// 1050, 916
			this.context.scale(-1,-1);
			this.context.fillRect(barx,barH,barW,height);
			}
       }
       renderUpDownFrame();
   }
/**
 * 
 * @param {*} 
 * This method renders the spiral visualiser
 * 
 */
   spiralVisualiser(selector){
    var spiralVisual = () => {
    window.requestAnimationFrame(spiralVisual);
    // var freqDomain = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(this.freqDomain);

    var visuals = document.querySelectorAll(selector);
    // creating spiral visualizer
    visuals.forEach(elem => {
        $(elem).attr("width",window.innerWidth ).attr("height",window.innerHeight/2);
        window.onresize = ()=>  $(elem).attr("width",window.innerWidth).attr("height",window.innerHeight/2);
       var WIDTH = elem.width;
       var HEIGHT = elem.height;
       var context = elem.getContext("2d");
    //    console.log(context)
        context.clearRect(0, 0, WIDTH, HEIGHT);
       
        context.fillStyle = "#FFB28F";
        for (let index = 0; index < WIDTH; index++) {
            var barX = index * 3;
            var barWidth = 2;
            var element = this.freqDomain[index] / 220;
            var offset = HEIGHT * element;
            var height = HEIGHT - offset - 1;
            context.fillRect(barX, height, barWidth, offset);
        }
    });
}
spiralVisual()
}
/**
 * This method illustrates glass pills visualisation
 */
 glassTilesVisualiser(){
    var glassPills = ()=>{
        window.requestAnimationFrame(glassPills);
    this.analyser.getByteFrequencyData(this.freqDomain);

    $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
    /**
     * 
     * @returns Update canvas on resize
     */
    window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = '#85EE8A';
    for (var i = 0; i < this.bufferLength / 3 ; i++) {
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

   floatingBars(){
    var floatingPills = ()=>{
        window.requestAnimationFrame(floatingPills);
    this.analyser.getByteFrequencyData(this.freqDomain);

    $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
    /**
     * 
     * @returns Update canvas on resize
     */
    window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = '#99C437';
    for (var i = 0; i < this.bufferLength / 3 ; i++) {
        this.context.strokeRect(100+i*4,100+256-this.freqDomain[i]*2,3,100);
    }
     }
   floatingPills();
   }
   /**
    * This method renders a stretched image on the canvas
    */
   colorstetchVisualiser(){
   
    var w = window.innerWidth;
    var h = window.innerHeight;
   
    var rtick = 0;
    var gtick = 0;
    var btick = 0;
    var buffer1 = null;
    var buffer2 = null;
    var setup = false;

    /**
     * 
     * @returns responsible for updating the canvas image
     */
    const update = () => {
        window.requestAnimationFrame(update);
        $(this.cs).attr('width',window.innerWidth).attr('height',window.innerHeight)
        this.analyser.getByteFrequencyData(this.freqDomain);

        window.onresize = ()=>  $(this.cs).attr("width",window.innerWidth).attr("height",window.innerHeight);
        // if(!setup) return;
        
       if(!buffer1){
            // console.log('creating');
           buffer1 = document.createElement("canvas");
            $(buffer1).attr('width',w).attr('height',h)
            buffer2 = document.createElement("canvas");
            $(buffer2).attr('width',w).attr('height',h)
       }
       window.onresize = ()=>  $(buffer1).attr("width",w).attr("height",h);
        window.onresize = ()=>  $(buffer2).attr("width",w).attr("height",h);
        var bctx1 = buffer1.getContext('2d');
        var bctx2 = buffer2.getContext('2d');
        
        //copy buffer1 to buffer2
        bctx2.drawImage(buffer1,0,0);
    
    
        //draw music into buffer 2
        rtick = (rtick+1)%(10);
        gtick = (gtick+2)%(200);
        btick = (btick+3)%(90);
      
        bctx2.strokeStyle =  "rgba("+rtick+","+gtick+","+btick+")";
        bctx2.beginPath();
        
        var s = this.freqDomain.length/2*4;
        
        var l = w/2-s/2;
        var t = h/2-256/2;
        bctx2.moveTo(l, t+128-this.freqDomain[0]+100);
        
        for(var i=0; i<this.freqDomain.length/2; i++) {
            bctx2.lineTo(l+i*4, t+128-this.freqDomain[i]+10);
        }
        
        for(var i=(this.freqDomain.length/2)-1; i>=0; i--) {
            var max = this.freqDomain.length/2-1;
            bctx2.lineTo(l+(max-i)*4, t+128-this.freqDomain[i]+100);
        }
        bctx2.stroke()
        
        //copy buffer2 to buffer1, stretched
        //draw more onto buffer
        bctx1.drawImage(buffer2, 0,0,w,h,-5,-5, w+10,h+10);
        //draw buffer1 back to screen
        this.context.drawImage(buffer1,0,0);   
    }
    update();
   }
}