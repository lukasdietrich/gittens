var Util    = require("./util.js");

module.exports = function Repo (local) {
    this.local = local;

    this.isRepository = function isRepository (callback) {
        var b = false;

        Util.execute("git", ["rev-parse", "--is-inside-work-tree"], this.local, function (out) {
            if(out === "true")
                b = true;
        }, function () {
            callback(b);
        });
    };

    this.add = function add (filepattern, callback) {
        var err = false;

        Util.execute("git", ["add", filepattern], this.local, function (out) {
            if(Util.startsWith(out, "fatal")) {
                err = out;
            }
        }, function () {
            err ? callback(err) : callback();
        });
    };

    this.commit = function commit (message, callback) {
        var err = false;

        Util.execute("git", ["commit", "-m", "\"" + message + "\""], this.local, function (out) {
            if(Util.startsWith(out, "nothing")) {
                err = out;
            }
        }, function () {
            err ? callback(err) : callback();
        });
    };

    this.push = function push (remote, branch, callback) {
        var err = false;

        Util.execute("git", ["push", remote, branch], this.local, function (out) {
            /**
                TODO
              */
        }, function () {
            err ? callback(err) : callback();
        });
    };

    this.listCommits = function listCommits (limit, callback) {
        var commits = [];
        var params = ["log", "--oneline"];
        var err = false;

        if(typeof limit === "number")
            params.push("-" + limit);
        else
            callback = limit;

        Util.execute("git", params, this.local, function (out) {
            out = out.split(" ");
            commits.push({ hash: out.shift(), text: out.join(" ") });
        }, function () {
            err ? callback(err) : callback(undefined, commits);
        });

    };
};
