var fs = require("fs");
var colors = require("colors");

var hooksJsonPath = process.cwd() + "/hooks.json";

var saveJson = function(json, callback) {
    var content = JSON.stringify(json, null, 2) + '\n';
    fs.writeFile(hooksJsonPath, content, callback);
}

var publicApi = {
    hookModule: process.env.npm_package_name,
    view: function() {

    },
    save: function(json, callback) {
        module.exports.readFile(function(err, data) {
            if (err) {
                callback(err);
            } else {
                data.config = data.config || {};
                data.config[publicApi.hookModule] = json;
                saveJson(data, callback);
            }
        });
        return saveJson(json, callback);
    },
    readFile: function(callback) {
        fs.readFile(hooksJsonPath, {
            encoding: "utf8"
        }, function(err, data) {
            if (err) {
                callback(err);
            } else {
                var error = err;
                try {
                    var file = JSON.parse(data);
                } catch (err) {
                    error = err;
                }
                callback(error, file);
            }
        });
    }
}

module.exports = publicApi;