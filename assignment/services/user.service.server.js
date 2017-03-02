module.exports = function(app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    // doesn't allow duplicate name
    function createUser(req, res) {
        var newUser = req.body;
        for (var u in users) {
            if (users[u].username == newUser.username) {
                res.sendStatus(400).send({});
                return;
            }
        }
        //newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        // console.log(users);
        res.json(newUser); // return the newUser
        // console.log("sent response");
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    // returns an empty json object if no user is found
    function findUserByUsername(req, res) {
        var username = req.query['username'];
        for (var u in users) {
            if (users[u]._id == username) {
                res.json(users[u]);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    // returns an empty json object if no user is found
    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        for (var u in users) {
            var user = users[u];
            if (user.username == username && user.password == password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    // returns an empty json object if no user is found
    function findUserById(req, res) {
        //console.log('made it into findUserByUserId');
        var userId = req.params['userId'];
        // console.log(userId);
        for (var u in users) {
            //console.log("into loop");
            //console.log(users[u]._id);
            //console.log(userId.toString());
            if (users[u]._id == userId.toString()) {
                // console.log('found your user by UserId');
                res.json(users[u]);
                return;
            }
        }
        //console.log("out of loop");
        res.sendStatus(404).send({});
    }

    // only updates first and last name
    // returns an empty json object if no user is found
    function updateUser(req, res) {
        var updatedUser = req.body;
        for (var u in users) {
            var user = users[u] ;
            if (user.username == updatedUser.username && user.password == updatedUser.password) {
                users[u].firstName = updatedUser.firstName;
                users[u].lastName = updatedUser.lastName;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    // returns an empty json object if no user is found
    function deleteUser(req, res) {
        var userId = req.params['userId'];
        for (var u in users) {
            if (users[u]._id == userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

};