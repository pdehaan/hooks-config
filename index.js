var fs = require("fs");
var colors = require("colors");

var hooksJsonPath = process.cwd() + "/hooks.json";

var saveJson = function(json, callback) {
    var content = JSON.stringify(json, null, 2) + '\n';
    fs.writeFile(hooksJsonPath, content, callback);
}

module.exports = function(hookModule) {

    var publicApi = {
    	view: function(){

    	},
    	save: function(json, callback){
    		module.exports.readFile(function(err, data){
    			if(err){
    				callback(err);
    			}
    			else{
    				data.config = data.config || {};
    				data.config[hookModule] = json;
    				saveJson(data, callback);
    			}
    		});
    		return saveJson(json, callback);
    	}
    }

    return publicApi;
}

module.exports.readFile = function(callback) {
	fs.readFile("hooks.json", function(err, data) {
        try {
            var file = JSON.parse(data);
            callback(null, file);
        } catch (err) {
            callback(err);
        }
    });
}