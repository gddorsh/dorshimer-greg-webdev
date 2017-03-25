module.exports = function(mongoose, WebsiteModel) {

    var q = require('q');
    var PageSchema = require('./page.schema.server.js')(mongoose);
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;

    function createPage(websiteId, page) {
        var deferred = q.defer();
        page.widgets = [ 1 ];
        PageModel
            .create(page, function(err, newPage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    WebsiteModel.findWebsiteById(websiteId)
                        .then(function(website) {
                            website.pages.push(newPage._id);
                            WebsiteModel.updateWebsite(websiteId, website)
                                .then(function(website2) {
                                    deferred.resolve(newPage);
                                }, function(website2) {
                                    deferred.reject(new Error("Website not found"));
                                });
                        }, function(website) {
                            deferred.reject(website);
                        });
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        PageModel
            .find({ _website: websiteId }, function(err, pages) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(pages);
                }
            });
        return deferred.promise;
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