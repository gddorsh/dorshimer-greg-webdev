module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem"},
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem"},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem"},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem"},
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem"}
    ];

    // doesn't allow duplicate names
    function createWebsite(req, res) {
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
    }

    // returns an empty json object if no website is found
    function findAllWebsitesForUser(req, res) {
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
    }

    // returns an empty json object if no website is found
    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    // only updates name and description
    // doesn't allow duplicate name
    // returns an empty json object if no website is found
    function updateWebsite(req, res) {
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
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
    }
};