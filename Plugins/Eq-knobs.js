const PureKnob = require('./pureknob.js')
const $ = require('jquery');
// console.log()
/**
 * Mugamba Bruno Copyright 2021
 * @param {{ bgColor:string,maxValue : number,trackColor:string }} values
 * 
 */
module.exports = class EqKnobs{
    constructor({
            bgColor = '',
            maxValue = 0,
            minValue = 0,
            trackColor = '',
            size = 0,
            initialValue = 0,
            trackWidth = 0,
            textScale = 0,
            readOnly = false,
            needleMode = false,
            label = null,
            value = 0
        }){
        this.values = {
            maxValue : maxValue,
            minValue : minValue,
            trackWidth : trackWidth,
            trackColor : trackColor,
            size : size,
            initialValue : initialValue,
            bgColor : bgColor,
            needle:needleMode,
            label:label,
            value:value,
            textScale:textScale,
            readOnly:readOnly,
        };
    }
    /**
     * this method provides custom settings to the slider
     * trackWidth = 0.4;
     * trackColor = '#00ccff'
     * maxValue = 100,
     * size =  300,
     *  */
    knobControl(selector,listener){

          const knob = new PureKnob().createKnob(this.values.size, this.values.size)
        // Set properties.
        knob.setProperty('angleStart', -0.75 * Math.PI);
        knob.setProperty('angleEnd', 0.75 * Math.PI);
        knob.setProperty('colorFG', this.values.trackColor);
        knob.setProperty('trackWidth', this.values.trackWidth);
        knob.setProperty('valMin', this.values.minValue);
        knob.setProperty('valMax', this.values.maxValue);
        knob.setProperty('colorBG',this.values.bgColor)
        knob.setProperty('readonly',this.values.readOnly);
        knob.setProperty('textScale',this.values.textScale);
        knob.setProperty('needle',this.values.needle);
        knob.setProperty('label',this.values.label);
        knob.setProperty('val',this.values.value);


        // Set initial value.
    knob.setValue(this.values.initialValue);

    knob.addListener(listener);

    // Create element node.
    const node = knob.node();
    // Add it to the DOM.
    $(node).appendTo(selector)
    }
}

