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
    }, 5000);
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
            }(items[i]));
        }
        callback();
    });

    setTimeout(function () {
        hashmap.push([chapter, imgs]);

        if (chapters.length > 0)
            read_chapter(chapters.shift());
        else {
            console.log("__STARTING CONVERTION__");
            this.first = hashmap.shift();
            convert(this.first[0], this.first[1]);
        }

    }, 5000);
}

function convert(folder, imgArray) {
    console.log("CONVERTING >> " + folder);
    this.f_orig = folder;
    this.f_dest = folder.endsWith("/") ? folder.substring(0, folder.lastIndexOf("/")).concat("_conv") : folder.concat("_conv");

    if (!fs.existsSync(f_dest))
        fs.mkdirSync(f_dest);

    for (var a = 0; a < imgArray.length; ++a) {
        this.img_ = imgArray[a].replace("/", "");
        this.in = f_orig.endsWith("/") ? f_orig.concat(this.img_) : f_orig.concat("/").concat(this.img_);
        this.out = f_dest.endsWith("/") ? f_dest.concat(this.img_.replace("webp", "png")) : f_dest.concat("/").concat(this.img_.replace("webp", "png"));

        webp.dwebp(this.in, this.out, "-o", function (status) {
            if (status === '101')
                console.log("Executed unsuccessfully status " + status + " - file: " + this.in);
        });
    }

    setTimeout(function () {
        if (hashmap.length > 0) {
            this.next = hashmap.shift();
            convert(this.next[0], this.next[1]);
        }
    }, 15000);
}