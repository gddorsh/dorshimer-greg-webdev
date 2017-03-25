module.exports = function(mongoose, UserModel) {

    var q = require('q');
    var WebsiteSchema = require('./website.schema.server.js')(mongoose);
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    return api;

    function createWebsiteForUser(userId, website) {
        //console.log("website model: createWebsiteForUser hit");
        //console.log("website: " + website);
        //console.log("userId: " + userId);
        var deferred = q.defer();
        // console.log("website.user: " + website._user);
        WebsiteModel
            .create(website, function(err, newWebsite) {
                if (err) {
                    deferred.reject(err);
                } else {
                    //console.log("newWebsite: " + newWebsite);
                    //console.log("console sending call to usermodel");
                    UserModel.findUserById(userId)
                        .then(function(user) {
                            //console.log("found user through UserModel");
                            //console.log("user: " + user);
                            user.websites.push(newWebsite._id);
                            UserModel.updateUser(userId, user)
                                .then(function(user2) {
                                    //console.log("updated user");
                                    //console.log("updated user's websites: " + user.websites);
                                    //console.log("websiteId: " + newWebsite._id);
                                    deferred.resolve(newWebsite);
                                }, function(user2) {
                                    //console.log("did not update user");
                                    deferred.reject(new Error("User not found"));
                                    //console.log("deferred.reject");
                                });
                        }, function(user) {
                            deferred.reject(user);
                        });
                }
            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        WebsiteModel
            .find({ _user : userId }, function(err, websites) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(websites);
                }
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel
            .findOne({ _id : websiteId }, function(err, website) {
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