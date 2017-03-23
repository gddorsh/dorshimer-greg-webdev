module.exports = function() {

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;

    var mongoose = require('mongoose');
    var q = require('q');
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model('PageModel', PageSchema);
    var WebsiteModel = require('../website/website.model.server');

    function createPage(websiteId, page) {
        var deferred = q.defer();
        PageModel
            .create(page, function(err, newPage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var promise = WebsiteModel.findWebsiteById(websiteId);
                    promise
                        .success(function(website) {
                            website.pages.push(newPage._id);
                            var promise2 = WebsiteModel.updateWebsite(websiteId, website);
                            promise2
                                .success(function(website2) {
                                    deferred.resolve(newPage);
                                })
                                .error(function(website2) {
                                    deferred.reject(new Error("Website not found"));
                                });
                        })
                        .error(function(website) {
                            deferred.reject(website);
                        });
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var promise = WebsiteModel.findWebsiteById(websiteId);
        promise
            .success(function(website) {
                return website.pages;
            })
            .error(function(website) {
                return new Error("User not found");
            });
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        PageModel
            .find({ _id : pageId }, function(err, page) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        PageModel
            .update({ _id : pageId }, { $set: { name: page.name,
                                                title: page.title,
                                                description: page.description,
                                                widgets: page.widgets }},
                function(err, page) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(page);
                    }
                });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        PageModel
            .remove({ _id: pageId }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(pageId);
                }
            });
        return deferred.promise;
    }
};