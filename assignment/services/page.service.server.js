module.exports = function(app, PageModel) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        PageModel.createPage(req.params['websiteId'], req.body)
            .then(function(page) {
                res.json(page);
                return;
            }, function(page) {
                res.sendStatus(400).send({});
            });
    }

    function findAllPagesForWebsite(req, res) {
        PageModel.findAllPagesForWebsite(req.params['websiteId'])
            .then(function(pages) {
                res.json(pages);
                return;
            }, function(pages) {
                res.sendStatus(400).send({});
            });
    }

    function findPageById(req, res) {
        PageModel.findPageById(req.params['pageId'])
            .then(function(page) {
                res.json(page);
                return;
            }, function(page) {
                res.sendStatus(400).send({});
            });
    }

    function updatePage(req, res) {
        PageModel.updatePage(req.params['pageId'], req.body)
            .then(function(page) {
                res.json(page);
                return;
            }, function(page) {
                res.sendStatus(400).send({});
            });
    }

    function deletePage(req, res) {
        PageModel.deletePage(req.params['pageId'])
            .then(function(pageId) {
                res.json(pageId);
                return;
            }, function(page) {
                res.sendStatus(404).send({});
            });
    }
};