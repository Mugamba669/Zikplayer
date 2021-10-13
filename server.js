// var str2ab = require('string-to-arraybuffer');
// console.log(str2ab('Bruno'))

const readdirp = require('readdirp');
const os = require('os');
const fs = require('fs')
const ytdl = require('ytdl-core');
const NodeID3 = require('node-id3');

// Use streams to achieve small RAM & CPU footprint.
// 1) Streams example with for-await.
// const dir = `${os.homedir()}/Music`;
// readdirp(dir, {fileFilter: '*.mp3', alwaysStat: true})
//   .on('data', (entry) => {
//     const {path, stats: {size}} = entry;
//     console.log(`${dir}/${path}`);
//   })
  // google image search
var gis = require('g-i-s');
const { app } = require('electron');

//gis('gashi',(err,data)=>{
 // console.log(data)
//})
// const searchYoutube = require('youtube-api-v3-search');
// (async ()=>{
//     var result = await searchYoutube(`AIzaSyAkgiQaLzuswUP-Jd1xwENo7u2YF5Xtq_c`,
//                                     {q:'nodejs',part:'snippet',type:'video'});
//     console.log(result.items)
// })()

//  NodeID3.update({title:'Veces'},'/home/mugamba/Music/January/500 Veces ( 256kbps cbr ).mp3');
 var tags = NodeID3.read('/home/mugamba/Music/March/Kelsea Ballerini - bragger (Official Audio)(MP3_160K)_1.mp3');

