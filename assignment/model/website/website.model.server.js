module.exports = function() {

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    return api;

    var mongoose = require('mongoose');
    var q = require('q');
    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
    var UserModel = require('../user/user.model.server');

    function createWebsiteForUser(userId, website) {
        // TODO
        var deferred = q.defer();
        WebsiteModel
            .create(website, function(err, newWebsite) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var promise = UserModel.findUserById(userId);
                    promise
                        .success(function(user) {
                            user.websites.push(newWebsite._id);
                            var promise2 = UserModel.updateUser(userId, user);
                            promise2
                                .success(function(user2) {
                                    deferred.resolve(newWebsite);
                                })
                                .error(function(user2) {
                                    deferred.reject(new Error("User not found"));
                                });
                        })
                        .error(function(user) {
                            deferred.reject(user);
                        });
                }
            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var promise = UserModel.findUserById(userId);
        promise
            .success(function(user) {
                return user.websites;
            })
            .error(function(user) {
                return new Error("User not found");
            });
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel
            .find({ _id : websiteId }, function(err, website) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        WebsiteModel
            .update({ _id : websiteId }, { $set: { name: website.name,
                                                   description: website.description,
                                                   pages: website.pages }},
                function(err, website) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(website);
                    }
                });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        WebsiteModel
            .remove({ _id: websiteId }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(websiteId);
                }
            });
        return deferred.promise;
    }
};