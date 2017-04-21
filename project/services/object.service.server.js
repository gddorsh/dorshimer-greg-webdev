module.exports = function(app, UserModelP) {

    app.get("/projectapi/item/:itemId", findItemById);
    app.get("/projectapi/search/:queryString", findItemsForSearch);

    function findItemById(req, res) {

        // TODO call DB


    }

    function findItemsForSearch(req, res) {
        var queryString = req.params['queryString'];
        // TODO call DB
        res.json(queryString);
    }
};