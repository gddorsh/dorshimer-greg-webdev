module.exports = function(app, UserModelP) {

    app.post("/projectapi/user", createUser);
    app.get("/projectapi/user/:userId", findUserById);
    app.get("/projectapi/user", findUserByCredentials);
    app.get("/projectapi/search/:queryString", findUsersForSearch);
    app.put("/projectapi/search/:userId", updateUser);
    app.put("/projectapi/useritem/:userId", addFavoriteForUser);
    app.delete("/projectapi/useritem/:userId", deleteFavoriteForUser);
    app.delete("/projectapi/user/:userId", deleteUser);

    /* from front-end service:
    var api = {
        "createUser": createUser, // user object
        "findUserById": findUserById, // userId
        "findUserByCredentials": findUserByCredentials, // username and pass
        "findUsersForSearch": findUsersForSearch, // query string
        "updateUser": updateUser,// userId and user
        "addFavoriteForUser": addFavoriteForUser, // userId and itemId
        "deleteFavoriteForUser": deleteFavoriteForUser, // userId and itemId
        "deleteUser": deleteUser // just id
    };*/

    function createUser(req, res) {
        UserModelP.createUser(req.body)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function findUserById(req, res) {
        UserModelP.findUserById(req.params['userId'])
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function findUserByCredentials(req, res) {
        UserModelP.findUserByCredentials(req.query['username'], req.query['password'])
            .then(function(user) {
                res.json(user);
            }, function(user) {
                res.sendStatus(500);
            });
    }

    function findUsersForSearch(req, res) {
        UserModelP.findUsersForSearch(req.params['queryString'])
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function updateUser(req, res) {
        UserModelP.updateUser(req.params['userId'], req.body)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function addFavoriteForUser(req, res) {
        UserModelP.addFavoriteForUser(req.params['userId'], req.body)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function deleteFavoriteForUser(req, res) {
        UserModelP.deleteFavoriteForUser(req.params['userId'], req.body)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }

    function deleteUser(req, res) {
        UserModelP.deleteUser(req.params['userId'])
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }
};