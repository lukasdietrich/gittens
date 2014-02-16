var Util    = require("./util.js");
var Repo    = require("./repo.js");

module.exports.clone = function clone (path, uri, callback) {
    var repo = false;

    Util.execute("git", ["clone", uri], path, function (out) {
        if(Util.startsWith(out, "Cloning into")) {
            var r = out.match(/'(.*)'/g);
            if(r.length > 0) {
                repo = new Repo(path + "/" + r.replace(/'/g, ""));
            }
        }
    }, function () {
        if(repo === false) {
            callback("Failed to clone !", undefined);
        } else {
            callback(undefined, repo);
        }
    });
};

module.exports.init = function init (path, callback) {
    var repo = false;

    Util.execute("git", ["init"], path, function (out) {
        if(Util.startsWith(out.toString(), "Initialized empty Git repository")) {
            repo = new Repo(path);
        }
    }, function () {
        if(repo === false) {
            callback("Failed to Initialize !", undefined);
        } else {
            callback(undefined, repo);
        }
    });
};

module.exports.open = function open (path, callback) {
    var repo = new Repo(path);

    repo.isRepository(function (is) {
        if(is) {
            callback(undefined, repo);
        } else {
            callback("Not a repository !", undefined);
        }
    });
};
