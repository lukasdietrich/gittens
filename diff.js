var Util    = require("./util.js");

function DiffPart (occurence, lines) {

    this.occurence = occurence;
    this.lines = lines;

};

function Diff (diffs) {

    this.parts = [];

    for (var i = diffs.length - 1; i >= 0; i--) {

        var d = diffs[i].shift();
            d = d.substring(3);
        
        var occ = d.substring(0, d.indexOf("@@") - 1);
            d = d.substring(occ.length + 4);

            occ = occ.split(" ");

            diffs[i].splice(0, 0, d);

        this.parts.push(new DiffPart({ 
                "old" : occ[0].substring(1), 
                "new" : occ[1].substring(1) 
            }, diffs[i]));
    };


};

module.exports = Diff;