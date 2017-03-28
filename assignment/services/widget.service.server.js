module.exports = function(app, WidgetModel) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/assignment/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    //app.put("/api/page/:pageId/widget", reorderWidget); // for jquery sorting
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        // console.log("widget service hit");
        // console.log("widget service: widget: " + req.body);
        // console.log(req.body);
        WidgetModel.createWidget(req.params['pageId'], req.body)
            .then(function(widget) {
                // console.log("widget service: widget created");
                res.json(widget);
                return;
            }, function(widget) {
                res.sendStatus(420);
            });
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

    function findAllWidgetsForPage(req, res) {
        WidgetModel.findAllWidgetsForPage(req.params['pageId'])
            .then(function(widgets) {
                res.json(widgets);
                return;
            }, function (widgets) {
                res.sendStatus(400);
            });
    }

    /*function reorderWidget(req, res) {
        // change the order of the widgets
    }*/

    function findWidgetById(req, res) {
        WidgetModel.findWidgetById(req.params['widgetId'])
            .then(function(widget) {
                res.json(widget);
            }, function(widget) {
                res.sendStatus(400);
            });
    }

    function updateWidget(req, res) {
        WidgetModel.updateWidget(req.params['widgetId'], req.body)
            .then(function(widget) {
                res.json(widget);
                return;
            }, function(widget) {
                res.sendStatus(400);
            });
    }

    function deleteWidget(req, res) {
        WidgetModel.deleteWidget(req.params['widgetId'])
            .then(function(widgetId) {
                res.json(widgetId);
            }, function(widgetId) {
                res.sendStatus(400);
            });
    }
};