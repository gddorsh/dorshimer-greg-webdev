module.exports = function(mongoose) {

    var q = require('q');
    var UserSchemaP = require('./user.schema.server.js')(mongoose);
    var UserModelP = mongoose.model('UserModelP', UserSchemaP);

    var api = {
        createUser: createUser, // user
        findUserById: findUserById, // userId
        findUserByCredentials: findUserByCredentials, // username, password
        findUsersForSearch: findUsersForSearch, // queryString
        updateUser: updateUser, // userId, user
        deleteUser: deleteUser // userId
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModelP
            .create(user, function (err, newUser) {
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
        UserModelP
            .findOne({ _id: userId }, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModelP
            .findOne({ username: username, password: password }, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUsersForSearch(queryString) {
        var deferred = q.defer();
        UserModelP
            .find({ username: queryString }, function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModelP
            .update({ _id: userId }, { $set: { password: user.password,
                                               email: user.email,
                                               items: user.items }},
                function (err, user) {
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
        UserModelP
            .remove({ _id: userId }, function (err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userId);
                }
            });
        return deferred.promise;
    }
};