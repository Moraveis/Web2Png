var fs = require('fs');
var webp = require('webp-converter');

if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var from = process.argv[2];
var to = process.argv[3];

main(from, to);

function main(from, to){
    if(!fs.existsSync(to)){
        fs.mkdirSync(to);
    }

    fs.readdir(from, function(err, items) {
        if(err != undefined)
            console.log(err);
        else
            for (var i=0; i<items.length; i++) {
                var file = from + '/' + items[i];
                var fileConv = to + '/' + items[i].replace(".webp", ".png");
        
                console.log("Start: " + file);
                fs.stat(file, generate_callback(file));

                webp.dwebp(file, fileConv, "-o", function(status){
                    if(status === '100')
                        console.log("Imagem '" + file + "' exicuted successfully");
                    else
                        console.log("exicuted unsuccessfully status " + status);
                });
            }
    });
}
 
function generate_callback(file) {
    return function(err, stats) {
            console.log(file);
            console.log(stats["size"]);
        }
};