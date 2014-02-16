var Util    = require("./util.js");

function Commit (repo, hash, author, mail, date, subject) {
    this.repo = repo;
    this.hash = hash;
    this.subject = subject;

    this.author = author;
    this.mail = mail;
    this.date = new Date(date);
};

Commit.prototype.getDiff = function getDiff (callback) {
	//TODO
};

module.exports = Commit;