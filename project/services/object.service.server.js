module.exports = function(app, rest, APIkey) {

    app.get("/projectapi/item/:itemId", findItemById);
    app.get("/projectapi/search/item/:queryString", findItemsForSearch);

    function findItemById(req, res) {
        var ndbno = req.params['itemId'];
        rest.get("https://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=b&format=json&api_key=" + APIkey,
            function (data, response) {
                // console.log(data);
                // console.log(response);
                res.json(data);
            });
    }

    function findItemsForSearch(req, res) {
        var queryString = req.params['queryString'];
        rest.get("https://api.nal.usda.gov/ndb/search/?format=json&q=" + queryString +"&sort=r&max=25&offset=0&api_key=" + APIkey,
            function (data, response) {
                // console.log(data);
                // console.log(response);
                res.json(data);
            });
    }
};