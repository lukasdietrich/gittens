var spawn   = require("child_process").spawn;
var fs      = require("fs");
  
module.exports.startsWith = function (s1, s2) {
    return s1.lastIndexOf(s2, 0) === 0;
};

module.exports.mkdir = function (path, callback) {
    fs.stat(path, function (err, stats) {
        if(err) fs.mkdir(path, callback);
        else callback();
    });
};

module.exports.execute = function (cmd, params, path, sysout, callback) {
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

        proc.stderr.on("data", function (d) {
            console.log(d.toString());
        });

        proc.on("close", function () {
            if(buff.length > 0) {
                sysout(buff);
            }

            callback();
        });
    });

};
