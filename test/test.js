require("should");
hooksConfig = require("../index.js");

describe("as a hook-module I want to", function() {


    describe("be able to", function() {
        it("use this module", function() {
            var hookConfig = hooksConfig("any-module");
            hookConfig.should.not.be.undefined;
        });

        it("see the full hooks.json file", function() {
            var file = hooksConfig.readFile(function(err, file){
                file.should.equal(require("./hooks.json"));
                done(err);
            });
        });
    });

    describe("view my config", function() {
        it("and should get a blank object back if none has been created yet", function() {
            var newConfig = hooksConfig("unconfigured");
            var config = newConfig.view();
            config.should.equal({});
        });

        it("and should get a full filled object if one has been created", function() {
            var oldConfig = hooksConfig("configured");
            var config = oldConfig.view();
            config.should.equal({
                "user-data": "first-name last-name"
            });
        });
    });

    describe("save a config", function() {
        it("creating new entity if none has been created before", function() {
            var newConfig = hooksConfig("unconfigured");
            var obj = {
                "foo": "bar"
            }
            newConfig.save(obj);
            var file = hooksConfig.readFile(function(err, file){
                file.config.unconfigured.should.equal(obj);
                done(err);
            });
        });

        it("overwriting exhisting config", function(done) {
            var oldConfig = hooksConfig("configured");
            var obj = {
                "foo": "bar"
            }
            oldConfig.save(obj, function(err){
                if(err){
                    done(err);
                }
                hooksConfig.readFile(function(err, file){
                    file.config.unconfigured.should.equal(obj);
                    done(err);
                });
            });
        });
    });

});