module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    // returns an empty json object if name is taken for the given website
    function createPage(req, res) {
        var newPage = req.body;
        newPage.websiteId = req.params['websiteId'];
        // newPage._id = (new Date()).getTime();
        if (!newPage.name) {
            newPage.name = "auto-generated name";
        }
        if (!newPage.description) {
            newPage.description = "auto-generated description";
        }
        for (var p in pages) {
            if (pages[p]._websiteId == newPage.websiteId && pages[p].name == newPage.name) {
                res.sendStatus(400).send({});
                return;
            }
        }
        pages.push(newPage);
        res.json(newPage);
    }

    // returns an empty json object if no page is found
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var myPages = [];
        for (p in pages) {
            if (pages[p].websiteId == websiteId) {
                myPages.push(pages[p]);
            }
            // console.log(myPages);
        }
        // console.log(myPages);
        // console.log(myPages.length);
        if (myPages.length > 0) {
            res.json(myPages);
            return;
        } else {
            res.sendStatus(404).send({});
        }
    }

    // returns an empty json object if no page is found
    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    // returns an empty json object if no page is found
    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var updatedPage = req.body;
        for (var p in pages) {
            if (pages[p].name == updatedPage.name && pages[p]._id != pageId) {
                // name taken, so do nothing
                res.sendStatus(400).send({});
                return;
            }
        }
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = updatedPage.name;
                pages[p].description = updatedPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    // returns an empty json object if no page is found
    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
    }
};