var fs = require('fs');

function writeToFile(str) {
    var date = new Date();
    fs.writeFile('./log/' + date.getTime() + '.txt', str, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

module.exports = {
    writeToFile
}