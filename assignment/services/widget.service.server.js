module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/assignment/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    //app.put("/api/page/:pageId/widget", reorderWidget); // for jquery sorting
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

    function uploadImage(req, res) {

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        // console.log(pageId);

        var width = req.body.width;


        var myFile;
        var originalname;
        var filename;
        var path;
        var destination;
        var size;
        var mimetype;

        if (req.file) {
            myFile = req.file;

            originalname = myFile.originalname; // file name on user's computer
            filename = myFile.filename; // new file name in upload folder
            path = myFile.path; // full path of uploaded file
            destination = myFile.destination; // folder where file is saved to
            size = myFile.size; // bytes
            mimetype = myFile.mimetype; // file type

            // console.log(originalname);
            // console.log(filename);
            // console.log(path);
            // console.log(destination);
            // console.log(size);
            // console.log(mimetype);
            // console.log(widgetId);
            // console.log(width);
        }

        // var widgetId = (new Date()).getTime();
        // console.log(widgetId);

        for (wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                if (!width) { // in case they delete what was in the width field
                    widgets[wg].width = "100%";
                } else {
                    widgets[wg].width = width;
                }
                // console.log(path);
                if (path) {
                    // console.log("into 'if path'");
                    widgets[wg].url = "/assignment/uploads/" + filename;
                    // console.log(widgets[wg].url);
                } else {
                    //console.log("into 'else'");
                    widgets[wg].url = req.body.url;
                }

                //console.log(widgets[wg]);
            }
        }

        // var widgetObject = {};
        // widgetObject._id = widgetId;
        // widgetObject.widgetType = "IMAGE";
        // widgetObject.pageId = pageId;
        // widgetObject.width = "" + width;
        // widgetObject.url = "" + path;
        // widgets.push(widgetObject);

        res/*.sendStatus(200)*/.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
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

    /*function reorderWidget(req, res) {
        // TODO
        // change the order of the widgets
    }*/

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
                    if (wgType == 'IMAGE') {

                    }
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