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
        var success = true;

        Util.execute("git", ["add", filepattern], this.local, function (out) {
            if(Util.startsWith(out.toString(), "fatal")) {
                success = false;
            }
        }, function () {
            callback(success);
        });
    };

    this.commit = function commit (message, callback) {
        var success = true;

        Util.execute("git", ["commit", "-m", "\"" + message + "\""], this.local, function (out) {
            if(Util.startsWith(out.toString(), "nothing")) {
                success = false;
            }
        }, function () {
            callback(success);
        });
    };

    this.push = function (branch, callback) {
        var success = true;

        Util.execute("git", ["push", "origin", branch], this.local, function (out) {

        }, function () {
            callback(success);
        });
    };

    this.log = function (limit, callback) {
        var success = false;
        var params = ["log", "-p"];

        if(typeof limit === "number")
            params.push("-" + limit);
        else
            callback = limit;

        Util.execute("git", params, this.local, function (out) {
            console.log(out);
        }, function () {
            callback(success);
        });

    };
};
