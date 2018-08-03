var fs = require('fs');
var webp = require('webp-converter');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];

function read_folder(path){
    fs.readdir(path, function(err, items){
        if(err != undefined)
            console.log(err);
        else{
            var stop_loop = false;
            for(var i = 0; i < items.length; i++){
                if(stop_loop)
                    break;
                else {
                    var new_path = path.endsWith("/") ? path.concat(items[1]) : path.concat("/").concat(items[1]);
                    fs.stat(new_path, function(err, stats){
                        if(err != undefined)
                            console.log(err);
                        else{
                            if(stats.isDirectory())
                                read_folder(new_path);
                            else
                                stop_loop = true;
                        }
                    });
                }
            }
            convert(path);
        }
    });
}

function convert(folder){
    var destiny = folder.concat("_conv");

    if(!fs.existsSync(destiny)){
        fs.mkdirSync(destiny);
    }

    fs.readdir(folder, function(err, items) {
        if(err != undefined)
            console.log(err);
        else { 
            for (var i=0; i<items.length; i++) {
                var original = folder + '/' + items[i];
                var conv = destiny + "/" + items[i].replace(".webp", ".png");

                webp.dwebp(original, conv, "-o", function(status){
                    if(status === '100')
                        console.log("Imagem '" + conv + "' exicuted successfully");
                    else
                        console.log("exicuted unsuccessfully status " + status);
                });
            }
        }
    });
}

function main(path){
    read_folder(path);
}

main(path);