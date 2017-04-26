module.exports = function(app, UserModelP, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authenticated;

    app.post("/projectapi/user",                                  createUser);
    app.post("/projectapi/login", passport.authenticate('local'), login);
    app.post("/projectapi/logout",                                logout);
    app.get("/projectapi/loggedIn",                               loggedIn);
    app.get("/projectapi/user/:userId",                           findUserById);
    app.get("/projectapi/user",                                   findUserByCredentials);
    app.get("/projectapi/search/user/:queryString",         auth, findUsersForSearch);
    app.put("/projectapi/user/:userId",                     auth, updateUser);
    app.delete("/projectapi/user/:userId",                  auth, deleteUser);

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

    function serializeUser(user, done) {
        console.log("in serialize User");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("in deserialize User");
        UserModelP.findUserById(user._id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.json('0');
        }
    }

    function localStrategy(username, password, done) {
        UserModelP.findUserByCredentials(username, password)
            .then(function (user) {
                if (!user) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            }, function  (err) {
                return done(null, err);
            });
    }

    function authenticated(req, res, done) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            done();
        }
    }

    function createUser(req, res) {
        var user = req.body;
        if (!user.type) {
            user.type = 'USER';
        }
        UserModelP.createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (!err) {
                            res.json(user);
                        } else {
                            res.sendStatus(400)
                        }
                    })
                }
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

    function deleteUser(req, res) {
        UserModelP.deleteUser(req.params['userId'])
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500);
            });
    }
};