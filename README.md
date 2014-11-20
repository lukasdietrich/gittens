gittens
=======

Gittens is a node.js library that can be used for communicating with git.
It communicates with the installed gitprogram.

How to use
==========

First install gittens with using ```npm install gittens```
   
```js

var Git = require("gittens");
// You can now use methods on Git to get a repo object

Git.clone("path/where/git/should/be/clone", "uri.of.git.to/clone", function (err, repo) {
    if (err) {
        throw err;
    }

    // You can now use repo
});

Git.init("path/to/git/to/init", function (err, repo) {
    if (err) {
        throw err;
    }

    // You can now use repo
});

Git.open("path/to/git/to/open", function (err, repo) {
    if (err) {
        throw err;
    }

    // You can now use repo
});

// Using repo
repo.add("*", function (err) {
    if (err) {
        throw err;
    }
   
    // successfully added file
});


repo.commit("Commit message", function (err) {
    if (err) {
        throw err;
    }
   
    // successfully commited
});

repo.listCommits(maxNumberOfCommits, function (err, commitList) {
    if (err) {
        throw err;
    }

    // We now have an array of Commit objects
});

OR

repo.listCommits(function (err, commitList) {
    if (err) {
        throw err;
    }

    // We now have an array of Commit objects
});

// Using commits
console.log(commit.hash + " " + commit.subject);
commit.getDiff(function (err, diff) {
    if(err) {
        throw err;
    }

    for(var i = 0; i < diff.parts.length; i++) {
        console.log(diff.parts[i].occurence); //{old: "exmpl", new: "example"}
        console.log(diff.parts[i].lines);
    }
});

/*
   #############################################
   ### Everything under here is not done yet ###
   #############################################
*/

// Will try to push but does NOT give an error back if it fails!
repo.push("origin", "branchname", function (err) {
    if (err) {
        throw err;
    }
});
```

License
=======

```
The MIT License (MIT)

Copyright (c) 2014 Lukas Dietrich

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
