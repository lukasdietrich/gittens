var spawn   = require("child_process").spawn;
var fs      = require("fs");

function Git () {

    var startsWith = function (s1, s2) {
        return s1.lastIndexOf(s2, 0) === 0;
    };

    this.mkdir = function (path, callback) {
        fs.stat(path, function (err, stats) {
            if(err) fs.mkdir(path, callback);
            else callback();
        });
    };

    this.execute = function (cmd, params, path, sysout, callback) {
        this.mkdir(path, function () {
            var proc = spawn(cmd, params, { cwd : path });
            var buff = "";

            proc.stdout.on("data", function (d) {
                buff += d.toString();
                var i;

                while((i = buff.indexOf("\n")) > -1) {
                    sysout(buff.substring(0, i));
                    buff = buff.substring(i+1);
                };
            });

            proc.on("close", function () {
                if(buff.length > 0) {
                    sysout(buff);
                }

                callback();
            });
        });

    }

    this.init = function (path, callback) {
        var success = false;

        this.execute("git", ["init"], path, function (out) {
            if(startsWith(out.toString(), "Initialized empty Git repository")) {
                success = true;
            }
        }, function () {
            callback(success);
        });
    };

    this.clone = function (path, gituri, callback) {
        var success = true;

        this.execute("git", ["clone", gituri], path, function (out) {
            if(startsWith(out.toString(), "fatal")) {
                success = false;
            }
        }, function () {
            callback(success);
        });
    };

    this.add = function (path, filepattern, callback) {
        var success = true;

        this.execute("git", ["add", filepattern], path, function (out) {
            if(startsWith(out.toString(), "fatal")) {
                success = false;
            }
        }, function () {
            callback(success);
        });
    };

    this.commit = function (path, message, callback) {
        var success = true;

        this.execute("git", ["commit", "-m", "\"" + message + "\""], path, function (out) {
            if(startsWith(out.toString(), "nothing")) {
                success = false;
            }
        }, function () {
            callback(success);
        });
    };

    this.push = function (path, branch, callback) {
        var success = true;

        this.execute("git", ["push", "origin", branch], path, function (out) {

        }, function () {
            callback(success);
        });
    };

    this.log = function (path, limit, callback) {
        var success = false;
        var params = ["log", "-p"];

        if(typeof limit === "number")
            params.push("-" + limit);
        else
            callback = limit;

        this.execute("git", params, path, function (out) {
            console.log(out);
        }, function () {
            callback(success);
        });

    };

};

module.exports = Git;
