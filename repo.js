var Util    = require("./util.js");
var Commit  = require("./commit.js");

function Repo (local) {
    this.local = local;
};

Repo.prototype.isRepository = function isRepository (callback) {
	var b = false;

	Util.execute("git", ["rev-parse", "--is-inside-work-tree"], this.local, function (out) {
		if(out === "true")
			b = true;
	}, function () {
		callback(b);
	});
};

Repo.prototype.add = function add (filepattern, callback) {
	var err = false;

	Util.execute("git", ["add", filepattern], this.local, function (out) {
		if(Util.startsWith(out, "fatal")) {
			err = out;
		}
	}, function () {
		callback(err);
	});
};

Repo.prototype.commit = function commit (message, callback) {
	var err = false;
	
	message = message.split("\\").join("\\\\") //Escape all \ by adding a \ in front of every \
	message = message.split("\"").join("\\\\") //Escape all " by adding a \ in front of every "

	Util.execute("git", ["commit", "-m", "\"" + message + "\""], this.local, function (out) {
		if(Util.startsWith(out, "nothing")) {
			err = out;
		}
	}, function () {
		callback(err);
	});
};

Repo.prototype.push = function push (remote, branch, callback) {
	var err = false;

	Util.execute("git", ["push", remote, branch], this.local, function (out) {
		/**
			TODO
		  */
	}, function () {
		callback(err);
	});
};

Repo.prototype.listCommits = function listCommits (limit, callback) {
	var commits = [];
	var params = ["log", "--oneline", "--pretty=format:%H;%an;%ae;%ad;%s"];
	var err = false;

	if(typeof limit === "number")
		params.push("-" + limit);
	else
		callback = limit;

	Util.execute("git", params, this.local, function (out) {
		out = out.split(";");
		commits.push(new Commit(this, out.shift(), out.shift(), out.shift(), out.shift(), out.join(";") ));
	}.bind(this), function () {
		callback(err, commits);
	});
};

module.exports = Repo;
