module.exports = function(app, WebsiteModel) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        //console.log("website service: createWebsite hit");
        //console.log("website: " + req.body);
        WebsiteModel.createWebsiteForUser(req.params['userId'], req.body)
            .then(function(website) {
                res.json(website);
                return;
            }, function(website) {
                res.sendStatus(500);
            });
    }

    function findAllWebsitesForUser(req, res) {
        WebsiteModel.findAllWebsitesForUser(req.params['userId'])
            .then(function(websites) {
                res.json(websites);
                return;
            }, function(websites) {
                res.sendStatus(404).send({});
            });
    }

    function findWebsiteById(req, res) {
        WebsiteModel.findWebsiteById(req.params['websiteId'])
            .then(function(website) {
                // console.log("website fetched: " + website);
                res.json(website);
                return;
            }, function(website) {
                res.sendStatus(404).send({});
            });
    }

    function updateWebsite(req, res) {
        WebsiteModel.updateWebsite(req.params['websiteId'], req.body)
            .then(function(website) {
                res.json(website);
                return;
            }, function(website) {
                res.sendStatus(404).send({});
            });
    }

    function deleteWebsite(req, res) {
        WebsiteModel.deleteWebsite(req.params['websiteId'])
            .then(function(websiteId) {
                res.sendStatus(200);
                return;
            }, function(websiteId) {
                res.sendStatues(404).send({});
            });
    }
};