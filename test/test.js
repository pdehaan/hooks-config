require("should");

var exec = require("child_process").exec;
var fs = require("fs");

var test_folder = process.cwd()+"/test/test_folder";
var baseHooks = {
    "pre-commit": {
        "test-valid": "0.0.0"
    },
    "config": {
        "test-valid": {
            "foo": "bar"
        }
    }
}

newConfig = function(module){
    var config = require("../index.js");
    config.hookModule = module || "test-valid";
    config.cwd = test_folder;
    return config;
}

cleanup = function(callback){
    exec("rm -rf "+test_folder, function(err, stdout, stderr){
        if(err || stderr){
            callback(err || new Error(stderr));
        }
        else{
            callback();
        }
    });
}

beforeEach(function(done){
    cleanup(function(err){
        if(err){
            done(err);
        }
        else{
            exec("mkdir "+test_folder, function(err, stdout, stderr){
                if(err || stderr){
                    done(err || new Error(stderr));
                }
                else{
                    var content = JSON.stringify(baseHooks);
                    fs.writeFile(test_folder+"/hooks.json", content, done);
                }
            });
        }
    });
});

describe("as a hook-module I want to", function() {

    it("have hookModule to equal to my current module", function() {
        var config = require("../index.js");
        config.hookModule.should.equal(process.env.npm_package_name);
    });

    describe("be able to", function() {
        it("use this module", function() {
            var config = newConfig();
            config.should.not.be.undefined;
        });

        it("see the full hooks.json file", function(done) {
            var config = newConfig();
            config.readFile(function(err, file) {
                JSON.stringify(baseHooks).should.equal(JSON.stringify(file));
                done(err);
            });
        });
    });

    describe("view my config", function() {
        it("and should get a blank object back if none has been created yet", function(done) {
            var config = newConfig("unconfigured");
            config.view(function(err, data){
                JSON.stringify(data).should.equal("{}");
                done(err);
            });
            
        });

        //fail
        it("and should get a full filled object if one has been created", function(done) {
            var config = newConfig();
            config.view(function(err, data){
                var value = JSON.stringify(data);
                var expect = JSON.stringify(baseHooks.config[config.hookModule]);
                value.should.equal(expect);
                done(err);
            });
        });
    });

    describe("save a config", function() {
        //fail
        it("creating new entity if none has been created before", function(done) {
            var config = newConfig("unconfigured");
            var obj = {
                "foo": "bar"
            }
            config.save(obj, function(err){
                if(err){
                    done(err);
                }
                else{
                    config.readFile(function(err, file) {
                        JSON.stringify(file.config.unconfigured).should.equal(JSON.stringify(obj));
                        done(err);
                    });
                }
            });
        });

        it("overwriting exhisting config", function(done) {
            var config = newConfig();
            var obj = {
                "foo": "bar"
            }
            config.save(obj, function(err) {
                if (err) {
                    done(err);
                }
                else{
                    config.readFile(function(err, file) {
                        if(err){
                            done(err);
                        }
                        else{
                            JSON.stringify(file.config["test-valid"]).should.equal(JSON.stringify(obj));
                            done();
                        }
                    });
                }
            });
        });
    });
});

after(function(done){
    cleanup(done);
})