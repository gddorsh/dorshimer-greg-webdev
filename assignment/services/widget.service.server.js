module.exports = function(app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO" },
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum" },
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.imgur.com/gRDmTYkr.jpg" },
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem Ipsum</p>" },
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum" },
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum 2</p>" }
    ];

    function createWidget(req, res) {
        var newWidget = req.body;
        newWidget.pageId = req.params['pageId'];
        // newWidget._id = (new Date()).getTime();
        widgets.push(newWidget);
        res.json(newWidget);
    }

    // returns an empty json object if no widget is found
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pageId'];
        var myWidgets = [];
        for (wg in widgets) {
            if (widgets[wg].pageId == pageId) {
                myWidgets.push(widgets[wg]);
            }
        }
        if (myWidgets.length > 0) {
            res.json(myWidgets);
            return;
        } else {
            res.sendStatus(404).send({});
        }
    }

    // returns an empty json object if no widget is found
    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                res.json(widgets[wg]);
                return;
            }
        }
        res.sendStatus(404);
    }

    // returns an empty json object if no widget is found
    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var updatedWidget = req.body;
        var wgType = updatedWidget.widgetType;
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                if (wgType == 'HEADER' || wgType == 'HTML') {
                    //console.log("header or html widget");
                    //console.log(widgets[wg]);
                    widgets[wg].text = updatedWidget.text;
                    widgets[wg].size = updatedWidget.size;
                    //console.log(widgets[wg]);
                    res.sendStatus(200);
                    return;
                }
                if (wgType == 'IMAGE' || wgType == 'YOUTUBE') {
                    //console.log("IMAGE or YOUTUBE widget");
                    widgets[wg].url = updatedWidget.url;
                    widgets[wg].width = updatedWidget.width;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404).send({});
    }

    // returns an empty json object if no widget is found
    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                widgets.splice(wg, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send({});
    }
};