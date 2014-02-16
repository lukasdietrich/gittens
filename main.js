var Util    = require("./util.js");
var Repo    = require("./repo.js");

module.exports.clone = function clone (path, uri, callback) {
    var repo = false;
    callback = callback || function () {};

    Util.execute("git", ["clone", uri], path, function (out) {
        if(Util.startsWith(out, "Cloning into")) {
            var r = out.match(/'(.*)'/g);
            if(r.length > 0) {
                repo = new Repo(path + "/" + r.replace(/'/g, ""));
            }
        }
    }, function () {
        repo ? callback(undefined, repo) : callback("Failed to clone repository.");
    });
};

module.exports.init = function init (path, callback) {
    var repo = false;
    callback = callback || function () {};

    Util.execute("git", ["init"], path, function (out) {
        if(Util.startsWith(out.toString(), "Initialized empty Git repository")) {
            repo = new Repo(path);
        }
    }, function () {
        repo ? callback(undefined, repo) : callback("Failed to initialize repository.");
    });
};

module.exports.open = function open (path, callback) {
    var repo = new Repo(path);
    callback = callback || function () {};

    repo.isRepository(function (is) {
        is ? callback(undefined, repo) : callback("The supplied path was not a repository.");
    });
};
