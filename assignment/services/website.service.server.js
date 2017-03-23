module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var WebsiteModel = require('../model/website/website.model.server');

    /*
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem"},
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem"},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem"},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem"},
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem"}
    ]; */

    function createWebsite(req, res) {
        var promise = WebsiteModel.createWebsiteForUser(req.params['userId'], req.body);
        promise
            .success(function(website) {
                res.json(website);
                return;
            })
            .error(function(website) {
                res.sendStatus(500);
            });
        /*
        // doesn't allow duplicate names
        var newWebsite = req.body;
        newWebsite.developerId = req.params['userId'];
        if (!newWebsite.description) {
            newWebsite.description = "auto-generated description";
        }
        if (!newWebsite.name) {
            newWebsite.name = "auto-generated name";
        }
        for (var w in websites) {
            if (websites[w].developerId == newWebsite.developerId && websites[w].name == newWebsite.name) {
                res.sendStatus(400).send({});
                return;
            }
        }
        websites.push(newWebsite);
        res.json(newWebsite);
        */
    }

    function findAllWebsitesForUser(req, res) {
        var promise = WebsiteModel.findAllWebsitesForUser(req.params['userId']);
        promise
            .success(function(websites) {
                res.json(websites);
                return;
            })
            .error(function(websites) {
                res.sendStatus(404).send({});
            });

        /*
        // returns an empty json object if no website is found
        var userId = req.params['userId'];
        var myWebsites = [];
        for (w in websites) {
            if (websites[w].developerId == userId) {
                myWebsites.push(websites[w]);
            }
        }
        if (myWebsites.length > 0) {
            res.json(myWebsites);
            return;
        } else {
            res.sendStatus(404).send({});
        }
        */
    }

    function findWebsiteById(req, res) {
        var promise = WebsiteModel.findWebsiteById(req.params['websiteId']);
        promise
            .success(function(website) {
                res.json(website);
                return;
            })
            .error(function(website) {
                res.sendStatus(404).send({});
            });

        /*
        // returns an empty json object if no website is found
        var websiteId = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404).send({});
        */
    }

    function updateWebsite(req, res) {
        var promise = WebsiteModel.updateWebsite(req.params['websiteId'], req.body);
        promise
            .success(function(website) {
                res.json(website);
                return;
            })
            .error(function(website) {
                res.sendStatus(404).send({});
            });
        /*
        // only updates name and description
        // doesn't allow duplicate name
        // returns an empty json object if no website is found
        var websiteId = req.params['websiteId'];
        var updatedWebsite = req.body;
        for (var w in websites) {
            if (websites[w].name == updatedWebsite.name && websites[w]._id != websiteId) {
                // name taken, so do nothing
                res.sendStatus(400).send({});
                return;
            }
        }
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].name = updatedWebsite.name;
                websites[w].description = updatedWebsite.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
        */
    }

    function deleteWebsite(req, res) {
        var promise = WebsiteModel.deleteWebsite(req.params['websiteId']);
        promise
            .success(function(websiteId) {
                res.sendStatus(200);
                return;
            })
            .error(function(websiteId) {
                res.sendStatues(404).send({});
            });
        /*
        var websiteId = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
        */
    }
};