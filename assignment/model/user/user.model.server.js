module.exports = function(mongoose) {

    var q = require('q');
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    function createUser(user) {
        var deferred = q.defer();
        //console.log(" createUser: " + user);
        UserModel
            .create(user, function(err, newUser) {
                if (err) {
                    // console.log("rejected");
                    // console.log(err);
                    deferred.reject(err);
                } else {
                    // console.log("new User: " + newUser);
                    // console.log(newUser._id);
                    deferred.resolve(newUser);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel
            .findOne({ _id: userId }, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .findOne({ username: username }, function(err, user) {
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
        UserModel
            .findOne({ username: username, password: password }, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        //console.log("userModel, user: " + user);
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


    return api;
};