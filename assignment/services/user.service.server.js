module.exports = function(app, UserModel) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    //var UserModel = require('../model/user/user.model.server')();

    /*
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]; */

    function createUser(req, res) {
        var promise = UserModel.createUser(req.body);
        promise
            .success(function(user) {
                res.json(user);
                return;
            })
            .error(function(user) {
                res.sendStatus(500);
        });

        // doesn't allow duplicate name
        /*
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
        */
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

    function findUserByUsername(req, res) {
        var promise = UserModel.findUserByUsername(res.query['username']);
        promise
            .success(function(user) {
                res.json(user);
                return;
            })
            .error(function(user) {
                res.sendStatus(404).send({});
            });

        /*
        // returns an empty json object if no user is found
        var username = req.query['username'];
        for (var u in users) {
            if (users[u]._id == username) {
                res.json(users[u]);
                return;
            }
        }
        res.sendStatus(404).send({});
        */
    }

    function findUserByCredentials(req, res) {
        var promise = UserModel.findUserByCredentials(req.query['username'], req.query['password']);
        promise
            .success(function(user) {
                res.json(user);
                return;
            })
            .error(function(user) {
                res.sendStatus(404).send({});
            });
        /*
         // returns an empty json object if no user is found
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
        */
    }

    function findUserById(req, res) {
        var promise = UserModel.findUserById(req.params['userId']);
        promise
            .success(function(user) {
                res.json(user);
                return;
            })
            .error(function(user) {
                res.sendStatus(404).send({});
            });
        /*
        // returns an empty json object if no user is found
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
        */
    }

    function updateUser(req, res) {
        var promise = UserModel.updateUser(req.body.userId, req.body);
        promise
            .success(function(user) {
                res.sendStatus(200);
                return;
            })
            .error(function(user) {
                res.sendStatus(404).send({});
            });
        /*
        // only updates first and last name
        // returns an empty json object if no user is found
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
        */
    }

    function deleteUser(req, res) {
        var promise = UserModel.deleteUser(req.params['userId']);
        promise
            .success(function(userId) {
                res.sendStatus(200);
                return;
            })
            .error(function(user) {
                res.sendStatus(404).send({});
            });
        /*
        // returns an empty json object if no user is found
        var userId = req.params['userId'];
        for (var u in users) {
            if (users[u]._id == userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
        */
    }

};