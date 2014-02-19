var Util    = require("./util.js");
var Repo    = require("./repo.js");

module.exports.clone = function clone (path, uri, callback) {
    var repo, error;
    callback = callback || function () {};

    Util.execute("git", ["clone", uri], path, function (out) {
        if(Util.startsWith(out, "Cloning into")) {
            var r = out.match(/'(.*)'/g);
            if(r.length > 0) {
                repo = new Repo(path + "/" + r.replace(/'/g, ""));
            } else {
                error = "Failed to clone repository.";
            }
        }
    }, function () {
        callback(error, repo);
    });
};

module.exports.init = function init (path, callback) {
    var repo, error;
    callback = callback || function () {};

    Util.execute("git", ["init"], path, function (out) {
        if(Util.startsWith(out.toString(), "Initialized empty Git repository")) {
            repo = new Repo(path);
        } else {
            error = "Failed to initialize repository.";
        }
    }, function () {
        callback(error, repo);
    });
};

module.exports.open = function open (path, callback) {
    var repo = new Repo(path), error;
    callback = callback || function () {};

    repo.isRepository(function (is) {
        if (!is) {
            var error = "The supplied path was not a repository.";
        }
       callback(error, repo);
    });
};
