module.exports = function(mongoose, PageModel) {

    var q = require('q');
    var WidgetSchema = require('./widget.schema.server.js')(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
        //reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget) {
        // console.log("widgetModel hit");
        // console.log("widgetmodel: pageId: " + pageId);
        // console.log("widgetModel: widget: " + widget);
        var deferred = q.defer();
        WidgetModel
            .create(widget, function(err, newWidget) {
                if (err) {
                    // console.log("widget failed to create");
                    // console.log(err);
                    deferred.reject(err);
                } else {
                    // console.log("widget created");
                    PageModel.findPageById(pageId)
                        .then(function(page) {
                            // console.log("page found");
                            //var page = response[0];
                            // console.log("page: " + page);
                            // console.log("newWidget._id: " + newWidget._id);
                            // console.log("page.widgets: " + page.widgets);
                            // console.log(page._id);
                            var myPage = page;
                            myPage.widgets.push(newWidget._id);
                            // console.log("page.widgets: " + myPage.widgets);
                            PageModel.updatePage(pageId, myPage)
                                .then(function(page2) {
                                    // console.log("page updated");
                                    deferred.resolve(newWidget);
                                }, function(page2) {
                                    // console.log("page not updated");
                                    deferred.reject(new Error("Website not found"));
                                });
                        }, function(page) {
                            // console.log("page not found");
                            deferred.reject(page);
                        });
                }
            });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        WidgetModel
            .find({ _page : pageId }, function(err, widgets) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widgets);
                }
            });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .findOne({ _id : widgetId }, function(err, widget) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        WidgetModel
            .update({ _id : widgetId }, { $set: { name: widget.name,
                                                  text: widget.title,
                                                  description: widget.description,
                                                  url: widget.url,
                                                  width: widget.width,
                                                  height: widget.height,
                                                  rows: widget.rows,
                                                  size: widget.size,
                                                  class: widget.class,
                                                  icon: widget.icon,
                                                  deletable: widget.deletable,
                                                  formatted: widget.formatted }},
                function(err, widget) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .remove({ _id: widgetId }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widgetId);
                }
            });
        return deferred.promise;
    }

    /*
    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();
        var promise = PageModel.findPageById(pageId);
        promise
            .success(function(page) {
                var myWidget = page.widgets[start];
                page.widgets.splice(start, 1);
                page.widgets.splice(end, 0, myWidget);
                var promise2 = PageModel.updatePage
            })
            .error(function(page) {
                return deferred.reject(new Error("Page not found"));
            });
        return deferred.promise;
    }*/
};