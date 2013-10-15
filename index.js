var fs = require("fs");
var colors = require("colors");

var hooksJsonPath = process.cwd() + "/hooks.json";

var saveJson = function(json) {
    //turn json into something we can write to a readable file.
    var content = JSON.stringify(json, null, 2) + '\n';
    try {
        fs.writeFileSync(hooksJsonPath, content);
        return true;
    } catch (err) {
        if (err && err.code == "EACCES") {
            console.log("FILE PERMISSION ERROR".red + " The current user does not have access to write to " + hooksJsonPath);
        } else if (err) {
            console.log("ERROR: ".red + "saveing " + hooksJsonPath);
        }
        return false;
    }
}

module.exports = function(hookModule) {

    return {};

}

module.exports.readFile = function() {

}