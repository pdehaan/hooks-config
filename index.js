var fs = require("fs");
var colors = require("colors");

var saveJson = function(json, callback) {
    var hooksJsonPath = publicApi.cwd + "/hooks.json";
    var content = JSON.stringify(json, null, 2) + '\n';
    fs.writeFile(hooksJsonPath, content, callback);
}

var publicApi = {
    hookModule: process.env.npm_package_name,
    cwd: process.cwd(),
    view: function(callback) {
        publicApi.readFile(function(err, json) {
            if (err) {
                callback(err);
            } else {
                json.config = json.config || {};
                callback(null, json.config[publicApi.hookModule] || {});
            }
        });
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
    },
    readFile: function(callback) {
        var hooksJsonPath = publicApi.cwd + "/hooks.json";
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