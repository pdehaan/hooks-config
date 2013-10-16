require("should");

describe("as a hook-module I want to", function() {

    it("have hookModule to equal to my current module", function() {
        var config = require("../index.js");
        config.hookModule.should.equal(process.env.npm_package_name);
    });

    describe("be able to", function() {
        it("use this module", function() {
            var config = require("../index.js");
            config.should.not.be.undefined;
        });

        it("see the full hooks.json file", function(done) {
            var config = require("../index.js");
            config.readFile(function(err, file) {
                var json = require("../hooks.json");
                var jsonKeys = Object.keys(json);
                file[jsonKeys[0]].should.equal(json[jsonKeys[0]]);
                done(err);
            });
        });
    });

    describe("view my config", function() {
        it("and should get a blank object back if none has been created yet", function() {
            var config = require("../index.js");
            var config = config.view();
            config.should.equal({});
        });

        it("and should get a full filled object if one has been created", function() {
            var config = require("../index.js");
            var config = config.view();
            config.should.equal({
                "user-data": "first-name last-name"
            });
        });
    });

    describe("save a config", function() {
        it("creating new entity if none has been created before", function() {
            var config = require("../index.js");
            var obj = {
                "foo": "bar"
            }
            config.save(obj);
            var file = config.readFile(function(err, file) {
                file.config.unconfigured.should.equal(obj);
                done(err);
            });
        });

        it("overwriting exhisting config", function(done) {
            var config = require("../index.js");
            var obj = {
                "foo": "bar"
            }
            config.save(obj, function(err) {
                if (err) {
                    done(err);
                }
                config.readFile(function(err, file) {
                    file.config.unconfigured.should.equal(obj);
                    done(err);
                });
            });
        });
    });

});