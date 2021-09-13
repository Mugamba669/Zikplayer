
const FileSaver = require('file-saver')
document.querySelector('.load').onchange = function(e){
    var file = e.currentTarget.files[0];
    console.log((file))
    var reader = new FileReader();
    reader.onload = (e)=>{
        var arrayBuffer = e.target.result;
        var writer = new ID3Writer(arrayBuffer);
        writer.setFrame('TIT2',"500 veces")
        .setFrame('TALB','500-Veces')
        .setFrame('TPE1',['Ally Brooke & Messah']);
        writer.addTag();
        var blob = writer.getBlob();
        const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
        FileSaver.saveAs(blob,file.path)
    }
    reader.readAsArrayBuffer(file)
}

