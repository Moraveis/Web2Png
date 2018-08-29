var fs = require('fs');
var excelbuilder = require('msexcel-builder');

var path = process.argv[2];
var chapters = [];

fs.readdir(path, function (err, items) {
    for (var i = 0; i < items.length; ++i) {
        fs.stat(path.concat(items[i]), callback(path.concat(items[i])));
    }

    setTimeout(function () {
        //console.log(chapters);
        writeInFile(chapters);
        writeExcelFile(chapters);
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

function writeInFile(content){
    this.item = "";
    content.forEach(element => {
        this.item += element.concat("\n");
    });


    fs.writeFile("/Users/joao/Documents/Mangas/ListaMangas.txt", this.item,  function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
}

function writeTextFile(content){
    this.item = "";
    content.forEach(element => {
        this.item += element.replace("/Users/joao/Documents/Mangas/", "").concat("\n");
    });


    fs.writeFile("/Users/joao/Documents/Mangas/ListaMangas.txt", this.item,  function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
}

function writeExcelFile(content){
     // Create a new workbook file in current working-path
    var workbook = excelbuilder.createWorkbook('/Users/joao/Documents/Mangas/', 'ListaMangas.xlsx')
    
    // Create a new worksheet with 10 columns and 12 rows
    var sheet1 = workbook.createSheet('sheet1', 1, content.length);
    
    // Fill some data
    // sheet1.set(column_index, row_index, content)
    var i = 0; 
    content.forEach(element => {
        var mappath = element.split("/");
        sheet1.set(1, ++i, mappath[5]);
    });
    
    // Save it
    workbook.save(function(ok){
        if (!ok) 
            workbook.cancel();
        else
            console.log('congratulations, your workbook created');
    });
}