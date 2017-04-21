module.exports = function(app, UserModel) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        UserModel.createUser(req.body)
            .then(function (user) {
                //console.log("back-end service (createUser): " + user);
                res.json(user);
                return;
            }, function(err) {
                res.sendStatus(404);
            });
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
        UserModel.findUserByUsername(req.query['username'])
            .then(function(user) {
                res.json(user);
                return;
            }, function(user) {
                res.sendStatus(404).send({});
            });
    }

    function findUserByCredentials(req, res) {
        UserModel.findUserByCredentials(req.query['username'], req.query['password'])
            .then(function(user) {
                res.json(user);
                return;
            }, function(user) {
                res.sendStatus(404).send({});
            });
    }

    function findUserById(req, res) {
        UserModel.findUserById(req.params['userId'])
            .then(function(user) {
                res.json(user);
                return;
            }, function(user) {
                res.sendStatus(404).send({});
            });
    }

    function updateUser(req, res) {
        // console.log("server service, updateUser: " + req.body);
        UserModel.updateUser(req.body._id, req.body)
            .then(function(user) {
                res.json(user);
                return;
            }, function(user) {
                res.sendStatus(404).send({});
            });
    }

    function deleteUser(req, res) {
        UserModel.deleteUser(req.params['userId'])
            .then(function(userId) {
                res.json(userId);
                return;
            }, function(user) {
                res.sendStatus(404).send({});
            });
    }

};