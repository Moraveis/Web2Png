var fs = require('fs');
var webp = require('webp-converter');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];
var chapters = [];
var hashmap = [];

fs.readdir(path, function (err, items) {
    for (var i = 0; i < items.length; ++i) {
        fs.stat(path.concat(items[i]), callback(path.concat(items[i])));
    }

    setTimeout(function () {
        read_chapter(chapters.shift());
    }, 30000);

});

function callback(file) {
    return function (err, stats) {
        if (err)
            console.log(err);
        else {
            if (stats.isDirectory()) {
                chapters.push(file.concat("/"));
            }
        }
    };
}

function read_chapter(chapter) {
    this.imgs = [];
    fs.readdir(chapter, function (err, items) {
        for (var i = 0; i < items.length; ++i) {
            this.file = chapter.concat(items[i]);
            fs.stat(file, function (f) {
                return function (err, stats) {
                    imgs.push(f.concat("/"));
                }
            }(file));
        }
        callback();
    });

    setTimeout(function(){
        hashmap.push([chapter, imgs]);
        console.log(chapter);
        console.log(imgs);

        if(chapters.length > 0) // stopping condition
            read_chapter(chapters.shift());
        else{
            console.log("FIM DA RECURSAO");
            console.log(hashmap);
        }
            
    }, 10000);
}

/* var original = folder + '/' + items[i];
var conv = destiny + "/" + items[i].replace(".webp", ".png");

webp.dwebp(original, conv, "-o", function (status) {
    if (status === '100')
        console.log("Imagem '" + conv + "' exicuted successfully");
    else
        console.log("exicuted unsuccessfully status " + status);
}); */