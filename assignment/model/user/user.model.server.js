module.exports = function() {

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    var mongoose = require('mongoose');
    var q = require('q');

    function createUser(user) {
        var deferred = q.defer();
        console.log(user);
        UserModel
            .create(user, function(err, newUser) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(newUser);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel
            .find(function(err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (u in users) {
                        if (users[u]._id == userId) {
                            deferred.resolve(users[u]);
                        }
                    }
                    deferred.reject(new Error("User not found"));
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .find(function(err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (u in users) {
                        if (users[u].username == username) {
                            deferred.resolve(users[u]);
                        }
                    }
                    deferred.reject(new Error("User not found"));
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel
            .find(function(err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    for (u in users) {
                        if ((users[u].username == username) &&
                            (users[u].password == password)) {
                            deferred.resolve(users[u]);
                        }
                    }
                    deferred.reject(new Error("User not found"));
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel
            .update({ _id: userId }, { $set: { password: user.password,
                                               firstName: user.firstName,
                                               lastName: user.lastName,
                                               phone: user.phone,
                                               websites: user.websites }},
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel
            .remove({ _id: userId }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userId);
                }
            });
        return deffered.promise;
    }
};